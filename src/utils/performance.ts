export const isLowEndDevice = () => {
  if (typeof window === "undefined") return false;

  // Check for prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) return true;

  // Check for hardware concurrency (CPU cores)
  const logicalProcessors = navigator.hardwareConcurrency || 4;
  if (logicalProcessors <= 4) return true;

  // Check for device memory (RAM) - only in Chrome/Edge
  // @ts-expect-error - deviceMemory is non-standard but useful for performance inference
  const memory = navigator.deviceMemory || 8;
  if (memory <= 4) return true;

  // Check screen resolution - lower threshold for "low-end" mobile-like experiences
  if (window.innerWidth < 768 && window.devicePixelRatio < 2) return true;

  return false;
};

export const getOptimalPixelRatio = () => {
  if (isLowEndDevice()) {
    return Math.min(window.devicePixelRatio, 1.5);
  }
  return window.devicePixelRatio;
};
