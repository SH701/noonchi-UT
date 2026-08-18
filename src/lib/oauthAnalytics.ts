// One-shot bridge for web OAuth analytics.
//
// Web OAuth redirects away from the app, so we can't know at button-click time
// whether the account is new. We stash the chosen method in sessionStorage
// (which survives the OAuth redirect round-trip in the same tab) and consume it
// once after the redirect, when the session — and its `isNewUser` flag — exists.
// Consuming removes the key, so the sign_up/login event fires exactly once.

const OAUTH_METHOD_KEY = "noonchi:pending_oauth_method";

export type OAuthMethod = "google" | "apple";

export function markPendingOAuth(method: OAuthMethod): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(OAUTH_METHOD_KEY, method);
  } catch {
    // sessionStorage unavailable (private mode / disabled) — event is skipped.
  }
}

export function consumePendingOAuth(): OAuthMethod | null {
  if (typeof window === "undefined") return null;
  try {
    const method = sessionStorage.getItem(OAUTH_METHOD_KEY);
    if (method === "google" || method === "apple") {
      sessionStorage.removeItem(OAUTH_METHOD_KEY);
      return method;
    }
    return null;
  } catch {
    return null;
  }
}
