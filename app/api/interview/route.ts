import OpenAI from "openai";

type Message = { role: "assistant" | "user"; content: string };

const MODEL = process.env.OPENAI_MODEL ?? "gpt-4o-mini";

const SYSTEM_PROMPT = `你是一位專業、友善但嚴謹的面試官。使用者會提供一份職缺描述,你要根據它進行模擬面試。
規則:
- 一次只問一個問題,混合技術、情境與行為面試題,難度循序漸進。
- 若對話中最後一則是使用者的回答,請先針對該回答評分(1-10 的整數),給出簡短評語與具體改進建議,再提出下一題。
- 若尚無使用者回答(面試剛開始),不要給評分,直接提出第一題。
- 使用繁體中文。
只回傳 JSON,格式如下:
{"feedback": {"score": number, "comment": string, "suggestions": string[]} | null, "question": string}`;

export async function POST(request: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return Response.json({ error: "伺服器未設定 OPENAI_API_KEY" }, { status: 500 });
  }

  let body: { jobDescription?: unknown; messages?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "請求格式錯誤" }, { status: 400 });
  }

  const jobDescription =
    typeof body.jobDescription === "string" ? body.jobDescription.trim() : "";
  if (!jobDescription) {
    return Response.json({ error: "請提供職缺描述" }, { status: 400 });
  }
  if (jobDescription.length > 5000) {
    return Response.json({ error: "職缺描述過長(上限 5000 字)" }, { status: 400 });
  }

  const messages: Message[] = Array.isArray(body.messages)
    ? (body.messages as Message[]).filter(
        (m) =>
          m &&
          (m.role === "assistant" || m.role === "user") &&
          typeof m.content === "string",
      )
    : [];

  const client = new OpenAI();
  try {
    const completion = await client.chat.completions.create({
      model: MODEL,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: `職缺描述:\n${jobDescription}` },
        ...messages,
      ],
    });
    const content = completion.choices[0]?.message?.content ?? "{}";
    const parsed = JSON.parse(content);
    return Response.json({
      feedback: parsed.feedback ?? null,
      question: String(parsed.question ?? ""),
    });
  } catch (err) {
    console.error("[/api/interview]", err);
    return Response.json({ error: "呼叫 OpenAI 失敗,請稍後再試" }, { status: 502 });
  }
}
