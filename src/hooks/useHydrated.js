import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * false while rendering on the server (pre-rendering) AND during the browser's first render that
 * hydrates that HTML; true afterwards.
 *
 * Use it for anything that depends on browser-only information (localStorage, the URL #hash), so the
 * first browser render matches the pre-rendered HTML exactly. React then re-renders with the real
 * value straight after hydration.
 */
export default function useHydrated() {
  return useSyncExternalStore(
    subscribe,
    () => true, // in the browser, after hydration
    () => false // on the server, and while hydrating
  );
}
