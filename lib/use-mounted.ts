import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * False during server render and hydration, true once running on the client.
 * Lets theme-dependent UI avoid hydration mismatches without setState in an effect.
 */
export function useMounted(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
