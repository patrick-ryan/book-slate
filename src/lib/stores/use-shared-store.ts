// Credits:
// https://dev.to/jdgamble555/the-correct-way-to-use-stores-in-sveltekit-3h6i
import { getContext, hasContext, setContext } from "svelte";
import { persisted } from "svelte-persisted-store";
import { type Writable, readable, writable } from "svelte/store";

// context for any type of store
export const useSharedStore = <T, A>(
  name: string,
  fn: (value?: A) => T,
  defaultValue?: A,
) => {
  if (hasContext(name)) {
    return getContext<T>(name);
  }
  const _value = fn(defaultValue);
  setContext(name, _value);
  return _value;
};

// writable store context
export const useWritable = <T>(name: string, value: T) =>
  useSharedStore(name, writable, value);

// readable store context
export const useReadable = <T>(name: string, value: T) =>
  useSharedStore(name, readable, value);

// local storage
export const usePreferences = <T>(name: string, value: T) =>
  useSharedStore(
    name,
    (value?: T) => persisted(name, value),
    value,
  ) as Writable<T>;
