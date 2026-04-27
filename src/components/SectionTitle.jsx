import { memo } from "react";
import { motion } from "framer-motion";
import useAnimationBudget from "../hooks/useAnimationBudget";

function SectionTitle({ eyebrow, title, subtitle }) {
  const { shouldLimitMotion } = useAnimationBudget();
  const content = (
    <>
      <span className="mb-3 inline-block rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[11px] font-semibold tracking-[0.2em] text-slate-300 uppercase">
        {eyebrow}
      </span>
      <h2 className="heading-balance max-w-[22ch] text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-2.5 max-w-3xl text-sm leading-6 text-slate-400 sm:mt-3 sm:text-base sm:leading-7 md:text-lg">
          {subtitle}
        </p>
      ) : null}
    </>
  );

  if (shouldLimitMotion) {
    return <div className="mb-8 sm:mb-10">{content}</div>;
  }

  return (
    <motion.div
      className="mb-8 sm:mb-10"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.4 }}
    >
      {content}
    </motion.div>
  );
}

export default memo(SectionTitle);
