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

    // Cards can mount after this effect runs (Projects re-renders new DOM nodes
    // on filter change), so track .card-spotlight nodes as they appear and bind
    // each exactly once. Without this, re-mounted cards keep a .spotlight-glow
    // that never follows the pointer.
    const bound = new WeakSet();
    const cleanupFns = [];
    let rafId = null;

    const bindCard = (card) => {
      const glow = card.querySelector(".spotlight-glow");
      if (!glow || bound.has(card)) return;
      bound.add(card);

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
      });
    };

    const bindAll = (root) => {
      root.querySelectorAll(".card-spotlight").forEach(bindCard);
    };

    bindAll(document);

    const mo = new MutationObserver((records) => {
      records.forEach((record) => {
        record.addedNodes.forEach((node) => {
          if (node.nodeType !== Node.ELEMENT_NODE) return;
          if (node.matches?.(".card-spotlight")) bindCard(node);
          bindAll(node);
        });
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      mo.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
      cleanupFns.forEach((fn) => fn());
    };
  }, []);
}
