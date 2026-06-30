/**
 * Yields to the main thread so the browser can process input/paint
 * before continuing heavy work. Fixes INP on long task chains.
 *
 * scheduler.yield() places the continuation at the FRONT of the task
 * queue (higher-priority than setTimeout), making it the preferred
 * method. Falls back to setTimeout(0) for Safari.
 */
export async function yieldToMain(): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const s = typeof window !== 'undefined' && (window as any).scheduler;
  if (s && typeof s.yield === 'function') return s.yield();
  return new Promise<void>((resolve) => setTimeout(resolve, 0));
}
