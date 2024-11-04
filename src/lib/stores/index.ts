import { useWritable } from "./use-shared-store";

export const useLoading = () => useWritable("loading", false);
