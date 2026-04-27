import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

export default function useAnimationBudget() {
  const prefersReducedMotion = useReducedMotion();
  const [isTouchLike, setIsTouchLike] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return window.matchMedia("(hover: none), (pointer: coarse)").matches;
  });
  const [isLowPowerDevice] = useState(() => {
    if (typeof navigator === "undefined") {
      return false;
    }

    const hardwareThreads = navigator.hardwareConcurrency ?? 8;
    const memoryInGb = navigator.deviceMemory ?? 8;
    return hardwareThreads <= 4 || memoryInGb <= 4;
  });

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const mediaQuery = window.matchMedia("(hover: none), (pointer: coarse)");
    const updateInputMode = () => setIsTouchLike(mediaQuery.matches);
    mediaQuery.addEventListener("change", updateInputMode);
    return () => mediaQuery.removeEventListener("change", updateInputMode);
  }, []);

  return {
    prefersReducedMotion,
    shouldLimitMotion: prefersReducedMotion || isTouchLike || isLowPowerDevice,
  };
}
