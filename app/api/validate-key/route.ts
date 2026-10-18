import OpenAI from "openai";

export async function POST(request: Request) {
  const apiKey = request.headers.get("x-openai-api-key")?.trim();
  if (!apiKey) {
    return Response.json({ error: "請輸入 API Key" }, { status: 400 });
  }

  try {
    await new OpenAI({ apiKey }).models.list();
    return Response.json({ valid: true });
  } catch (err) {
    if (err instanceof OpenAI.AuthenticationError) {
      return Response.json({ error: "API Key 無效" }, { status: 401 });
    }
    console.error("[/api/validate-key]", err instanceof Error ? err.message : "unknown error");
    return Response.json({ error: "無法驗證,請稍後再試" }, { status: 502 });
  }
}
