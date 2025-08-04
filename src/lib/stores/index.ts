import type { Writable } from "svelte/store";
import { useWritable, usePreferences } from "./use-shared-store";

export const useLoading = () => useWritable("loading", false);

type User = {
  email?: string | null;
  displayName?: string | null;
  photoURL?: string | null;
  uid?: string | null;
};

export type SessionState = {
  user: User | null;
  loading?: boolean;
  loggedIn?: boolean;
};

export const useTheme = () =>
  usePreferences("theme", {
    preference: "system",
    current: window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light",
  });

export const useSession = () =>
  usePreferences<SessionState | null>("session", null);

export type SessionType = Writable<SessionState | null>;
