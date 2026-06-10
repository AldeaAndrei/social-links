const API_URL = import.meta.env.VITE_ANALYTICS_URL?.replace(/\/$/, "");
const API_TOKEN = import.meta.env.VITE_VISIT_API_TOKEN;

const DAY_ID_KEY = "social-links-anon-day-id";
const DAY_ID_EXP_KEY = "social-links-anon-day-id-exp";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

type AnalyticsEvent = {
  event_type: "page_view" | "button_click";
  page: string;
  button_id?: string;
  client_day_id?: string;
};

function safeGetItem(storage: Storage, key: string): string | null {
  try {
    return storage.getItem(key);
  } catch {
    return null;
  }
}

function safeSetItem(storage: Storage, key: string, value: string): void {
  try {
    storage.setItem(key, value);
  } catch {
    /* storage unavailable (private mode, quota) — ignore */
  }
}

// Returns a valid v4 UUID for daily dedupe, or undefined if it cannot be
// produced. Never returns a malformed value: the backend rejects events whose
// client_day_id is not a valid UUID, which would drop the whole event.
function getClientDayId(): string | undefined {
  try {
    const now = Date.now();
    const exp = Number(safeGetItem(localStorage, DAY_ID_EXP_KEY) || 0);
    const existing = safeGetItem(localStorage, DAY_ID_KEY);
    if (existing && UUID_RE.test(existing) && exp > now) return existing;

    if (typeof crypto?.randomUUID !== "function") return undefined;
    const id = crypto.randomUUID();

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
    safeSetItem(localStorage, DAY_ID_KEY, id);
    safeSetItem(localStorage, DAY_ID_EXP_KEY, String(endOfDay.getTime()));
    return id;
  } catch {
    return undefined;
  }
}

function sendEvent(event: AnalyticsEvent): void {
  if (!API_URL) return;
  try {
    fetch(`${API_URL}/api/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Visit-Token": API_TOKEN ?? "",
      },
      body: JSON.stringify(event),
      keepalive: true,
    }).catch(() => {});
  } catch {
    /* never surface analytics errors to the user */
  }
}

export function trackPageView(): void {
  try {
    const page = window.location.pathname;
    const clientDayId = getClientDayId();
    const dedupeKey = `pv:${clientDayId ?? "anon"}:${page}`;
    if (safeGetItem(sessionStorage, dedupeKey)) return;
    // Set the dedupe key before sending so StrictMode's double-invoke (and any
    // rapid re-render) does not emit a second page_view.
    safeSetItem(sessionStorage, dedupeKey, "1");

    sendEvent({
      event_type: "page_view",
      page,
      ...(clientDayId ? { client_day_id: clientDayId } : {}),
    });
  } catch {
    /* analytics must never break the page */
  }
}

export function trackLinkClick(buttonId: string): void {
  try {
    if (!buttonId) return;
    const clientDayId = getClientDayId();
    sendEvent({
      event_type: "button_click",
      page: window.location.pathname,
      button_id: buttonId,
      ...(clientDayId ? { client_day_id: clientDayId } : {}),
    });
  } catch {
    /* analytics must never break the page */
  }
}
