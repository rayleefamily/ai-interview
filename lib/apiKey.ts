const STORAGE_KEY = "openai-api-key";

const listeners = new Set<() => void>();

export function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function notify() {
  listeners.forEach((l) => l());
}

export function getApiKey(): string {
  try {
    return localStorage.getItem(STORAGE_KEY) ?? "";
  } catch {
    return "";
  }
}

export function setApiKey(key: string) {
  localStorage.setItem(STORAGE_KEY, key);
  notify();
}

export function clearApiKey() {
  localStorage.removeItem(STORAGE_KEY);
  notify();
}
