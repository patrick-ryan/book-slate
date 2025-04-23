import { useWritable } from "./use-shared-store";

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

export const useSession = () =>
  useWritable<SessionState | null>("session", null);
