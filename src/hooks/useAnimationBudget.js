import { createContext, createElement, useContext, useEffect, useMemo, useState } from "react";

const AnimationBudgetContext = createContext({
  prefersReducedMotion: false,
  shouldLimitMotion: false,
});

export function AnimationBudgetProvider({ children }) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isTouchLike, setIsTouchLike] = useState(false);
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

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mediaQuery = window.matchMedia("(hover: none), (pointer: coarse)");
    const updateReducedMotion = () => setPrefersReducedMotion(reducedMotionQuery.matches);
    const updateInputMode = () => setIsTouchLike(mediaQuery.matches);
    updateReducedMotion();
    updateInputMode();
    reducedMotionQuery.addEventListener("change", updateReducedMotion);
    mediaQuery.addEventListener("change", updateInputMode);
    return () => {
      reducedMotionQuery.removeEventListener("change", updateReducedMotion);
      mediaQuery.removeEventListener("change", updateInputMode);
    };
  }, []);

  const value = useMemo(
    () => ({
      prefersReducedMotion,
      shouldLimitMotion: prefersReducedMotion || isTouchLike || isLowPowerDevice,
    }),
    [prefersReducedMotion, isLowPowerDevice, isTouchLike]
  );

  return createElement(AnimationBudgetContext.Provider, { value }, children);
}

export default function useAnimationBudget() {
  return useContext(AnimationBudgetContext);
}

export function useAnimationBudgetContext() {
  return useContext(AnimationBudgetContext);
}
