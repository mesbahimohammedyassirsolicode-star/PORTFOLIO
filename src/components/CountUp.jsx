import { useEffect, useState } from "react";

/**
 * Counts from 0 to `to` once `run` becomes true. Callers render the final
 * value directly (skipping this component) under reduced motion.
 */
export default function CountUp({ to, run = true, duration = 1.1 }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!run) return undefined;
    let raf;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min(1, (now - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(to * eased));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [run, to, duration]);

  return <>{value}</>;
}
