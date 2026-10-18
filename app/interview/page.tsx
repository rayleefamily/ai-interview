"use client";

import Link from "next/link";
import { useState } from "react";
import { getApiKey } from "@/lib/apiKey";

type Feedback = { score: number; comment: string; suggestions: string[] };
type Turn = {
  question: string;
  answer?: string;
  feedback?: Feedback | null;
};

export default function Home() {
  const [jobDescription, setJobDescription] = useState("");
  const [turns, setTurns] = useState<Turn[]>([]);
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const started = turns.length > 0;

  async function call(history: Turn[]) {
    setLoading(true);
    setError("");
    try {
      const messages = history.flatMap((t) => [
        { role: "assistant", content: t.question },
        ...(t.answer ? [{ role: "user", content: t.answer }] : []),
      ]);
      const res = await fetch("/api/interview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-openai-api-key": getApiKey(),
        },
        body: JSON.stringify({ jobDescription, messages }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "發生錯誤");
      return data as { feedback: Feedback | null; question: string };
    } catch (e) {
      setError(e instanceof Error ? e.message : "發生錯誤");
      return null;
    } finally {
      setLoading(false);
    }
  }

  async function start() {
    if (!jobDescription.trim()) return;
    const data = await call([]);
    if (data) setTurns([{ question: data.question }]);
  }

  async function submit() {
    if (!answer.trim()) return;
    const answered = turns.map((t, i) =>
      i === turns.length - 1 ? { ...t, answer } : t,
    );
    setTurns(answered);
    setAnswer("");
    const data = await call(answered);
    if (data) {
      setTurns([
        ...answered.slice(0, -1),
        { ...answered[answered.length - 1], feedback: data.feedback },
        { question: data.question },
      ]);
    }
  }

  function reset() {
    setTurns([]);
    setAnswer("");
    setError("");
  }

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-4 py-10">
      <h1 className="font-serif text-4xl font-bold">AI 面試模擬器</h1>

      {!started ? (
        <section className="flex flex-col gap-3">
          <label htmlFor="jd" className="font-medium">
            職缺描述
          </label>
          <textarea
            id="jd"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            rows={10}
            maxLength={5000}
            placeholder="貼上職缺的描述、需求與技能要求…"
            className="rounded-lg border border-line bg-card p-3"
          />
          <button
            onClick={start}
            disabled={loading || !jobDescription.trim()}
            className="self-start rounded-lg bg-accent px-5 py-2 text-white disabled:opacity-50"
          >
            {loading ? "準備中…" : "開始面試"}
          </button>
        </section>
      ) : (
        <section className="flex flex-col gap-6">
          {turns.map((t, i) => (
            <div key={i} className="flex flex-col gap-3">
              <div className="rounded-lg bg-card p-4 border border-line">
                <p className="mb-1 text-sm text-muted">
                  面試官 · 第 {i + 1} 題
                </p>
                <p className="whitespace-pre-wrap">{t.question}</p>
              </div>
              {t.answer && (
                <div className="self-end rounded-lg bg-accent p-4 text-white">
                  <p className="whitespace-pre-wrap">{t.answer}</p>
                </div>
              )}
              {t.feedback && (
                <div className="rounded-lg border border-accent p-4">
                  <p className="font-medium">評分:{t.feedback.score} / 10</p>
                  <p className="mt-1 whitespace-pre-wrap">{t.feedback.comment}</p>
                  {t.feedback.suggestions.length > 0 && (
                    <ul className="mt-2 list-disc pl-5">
                      {t.feedback.suggestions.map((s, j) => (
                        <li key={j}>{s}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          ))}

          {loading && <p className="text-muted">面試官思考中…</p>}

          {!loading && !turns[turns.length - 1].answer && (
            <div className="flex flex-col gap-3">
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                rows={5}
                placeholder="輸入你的回答…"
                className="rounded-lg border border-line bg-card p-3"
              />
              <button
                onClick={submit}
                disabled={!answer.trim()}
                className="self-start rounded-lg bg-accent px-5 py-2 text-white disabled:opacity-50"
              >
                送出回答
              </button>
            </div>
          )}

          <button onClick={reset} className="self-start text-sm text-muted underline">
            結束並重新開始
          </button>
        </section>
      )}

      {error && (
        <p className="text-red-600">
          {error}{" "}
          <Link href="/settings" className="underline">
            前往設定
          </Link>
        </p>
      )}
    </main>
  );
}
