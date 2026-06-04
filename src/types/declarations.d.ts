import type { User } from "./user";

export interface NoonchiAuthPayload {
  provider: "google" | "apple";
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface NoonchiAuthError {
  provider: "google" | "apple";
  code: "cancelled" | "network" | "server" | "unknown";
  message: string;
}

declare global {
  function gtag(...args: unknown[]): void;

  interface Window {
    isNoonchiApp?: boolean;
    NoonchiNative?: {
      loginGoogle: () => void;
      loginApple: () => void;
    };
    onNoonchiAuth?: (payload: NoonchiAuthPayload) => void;
    onNoonchiAuthError?: (payload: NoonchiAuthError) => void;
  }
}
