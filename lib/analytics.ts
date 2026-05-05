declare global {
  interface Window {
    plausible?: (eventName: string, options?: { props?: Record<string, any> }) => void;
  }
}

export function trackEvent(
  eventName: string,
  props?: Record<string, any>
) {
  if (typeof window === "undefined") return;
  if (typeof window.plausible !== "function") return;

  window.plausible(eventName, props ? { props } : undefined);
}
