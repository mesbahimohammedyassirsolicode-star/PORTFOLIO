import { useEffect } from "react";

const interactiveSelector = "input, textarea, select, button, [contenteditable='true']";

export default function useSmoothWheelScroll({ enabled }) {
  useEffect(() => {
    if (!enabled || typeof window === "undefined") {
      return undefined;
    }

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!finePointer.matches) {
      return undefined;
    }

    let currentY = window.scrollY;
    let targetY = currentY;
    let frameId = 0;

    const getMaxScroll = () =>
      Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

    const stop = () => {
      cancelAnimationFrame(frameId);
      frameId = 0;
      currentY = window.scrollY;
      targetY = currentY;
    };

    const animate = () => {
      currentY += (targetY - currentY) * 0.18;

      if (Math.abs(targetY - currentY) < 0.5) {
        window.scrollTo(0, targetY);
        frameId = 0;
        return;
      }

      window.scrollTo(0, currentY);
      frameId = requestAnimationFrame(animate);
    };

    const onWheel = (event) => {
      if (event.ctrlKey || event.metaKey || event.defaultPrevented) {
        return;
      }

      const target = event.target;
      if (target instanceof Element && target.closest(interactiveSelector)) {
        return;
      }

      event.preventDefault();
      const multiplier = event.deltaMode === WheelEvent.DOM_DELTA_LINE ? 18 : 1;
      targetY = Math.min(Math.max(targetY + event.deltaY * multiplier, 0), getMaxScroll());

      if (!frameId) {
        currentY = window.scrollY;
        frameId = requestAnimationFrame(animate);
      }
    };

    const onScroll = () => {
      if (!frameId) {
        currentY = window.scrollY;
        targetY = currentY;
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", stop);

    return () => {
      stop();
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", stop);
    };
  }, [enabled]);
}
