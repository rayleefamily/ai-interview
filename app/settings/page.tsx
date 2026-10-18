"use client";

import { useState, useSyncExternalStore } from "react";
import { clearApiKey, getApiKey, setApiKey, subscribe } from "@/lib/apiKey";

export default function SettingsPage() {
  const stored = useSyncExternalStore(subscribe, getApiKey, () => "");
  const [draft, setDraft] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [show, setShow] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const value = draft ?? stored;
  const saved = !!stored;

  async function save() {
    const key = value.trim();
    if (!key) return;
    setVerifying(true);
    setMessage("");
    try {
      const res = await fetch("/api/validate-key", {
        method: "POST",
        headers: { "x-openai-api-key": key },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "驗證失敗");
      setApiKey(key);
      setDraft(null);
      setIsError(false);
      setMessage("驗證成功,已儲存到此瀏覽器");
    } catch (e) {
      setIsError(true);
      setMessage(e instanceof Error ? e.message : "驗證失敗");
    } finally {
      setVerifying(false);
    }
  }

  function remove() {
    clearApiKey();
    setDraft(null);
    setIsError(false);
    setMessage("已清除");
  }

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-4 py-10">
      <h1 className="font-serif text-4xl font-bold">設定</h1>

      <section className="flex flex-col gap-3">
        <label htmlFor="key" className="font-medium">
          OpenAI API Key
        </label>
        <div className="flex gap-2">
          <input
            id="key"
            type={show ? "text" : "password"}
            autoComplete="off"
            value={value}
            onChange={(e) => {
              setDraft(e.target.value);
              setMessage("");
            }}
            placeholder="sk-..."
            className="flex-1 rounded-lg border border-line bg-card p-3"
          />
          <button
            type="button"
            onClick={() => setShow((v) => !v)}
            className="rounded-lg border border-line px-4 text-sm"
          >
            {show ? "隱藏" : "顯示"}
          </button>
        </div>
        <p className="text-sm text-muted">
          金鑰只會存在你瀏覽器的 localStorage,每次呼叫時才隨請求送到我們的伺服器轉發給 OpenAI,伺服器不會儲存。
        </p>
        <div className="flex items-center gap-3">
          <button
            onClick={save}
            disabled={!value.trim() || verifying}
            className="rounded-lg bg-accent px-5 py-2 text-white disabled:opacity-50"
          >
            {verifying ? "驗證中…" : "驗證並儲存"}
          </button>
          {saved && (
            <button onClick={remove} className="text-sm text-muted underline">
              清除金鑰
            </button>
          )}
          {message && (
            <span className={`text-sm ${isError ? "text-red-600" : "text-muted"}`}>{message}</span>
          )}
        </div>
      </section>
    </main>
  );
}
