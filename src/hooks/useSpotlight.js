import { useEffect } from "react";

/**
 * Hook to attach GPU-safe radial spotlight follower on elements with `.card-spotlight`.
 * Uses requestAnimationFrame and initializes position on pointerenter to prevent (0,0) jump.
 * Respects prefers-reduced-motion.
 */
export default function useSpotlight() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cards = document.querySelectorAll(".card-spotlight");
    const cleanupFns = [];

    cards.forEach((card) => {
      const glow = card.querySelector(".spotlight-glow");
      if (!glow) return;

      let rafId = null;

      const updatePosition = (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        glow.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      };

      const handleEnter = (e) => {
        updatePosition(e);
      };

      const handleMove = (e) => {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => updatePosition(e));
      };

      const handleLeave = () => {
        if (rafId) cancelAnimationFrame(rafId);
      };

      card.addEventListener("pointerenter", handleEnter, { passive: true });
      card.addEventListener("pointermove", handleMove, { passive: true });
      card.addEventListener("pointerleave", handleLeave, { passive: true });

      cleanupFns.push(() => {
        card.removeEventListener("pointerenter", handleEnter);
        card.removeEventListener("pointermove", handleMove);
        card.removeEventListener("pointerleave", handleLeave);
        if (rafId) cancelAnimationFrame(rafId);
      });
    });

    return () => {
      cleanupFns.forEach((fn) => fn());
    };
  }, []);
}
