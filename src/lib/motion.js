export const EASE = [0.16, 1, 0.3, 1];

export const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8, ease: EASE } },
};

export const stagger = (seconds = 0.08, delayChildren = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: seconds, delayChildren } },
});

export const viewport = { once: true, amount: 0.2 };
