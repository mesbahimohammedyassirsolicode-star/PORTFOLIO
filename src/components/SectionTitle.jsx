import { memo } from "react";

function SectionTitle({ eyebrow, title, subtitle }) {
  const content = (
    <>
      <span className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-violet-500/15 bg-violet-500/[0.06] px-4 py-1.5 text-[10px] font-bold tracking-[0.22em] text-violet-300 uppercase shadow-[0_0_20px_rgba(139,92,246,0.06)]">
        <span className="h-1.5 w-1.5 rounded-full bg-violet-400/80"></span>
        {eyebrow}
      </span>
      <h2 className="heading-balance max-w-[22ch] text-3xl font-bold tracking-[-0.02em] text-white sm:text-4xl md:text-[3.25rem] md:leading-[1.15]">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-400/90 sm:mt-5 sm:text-base sm:leading-relaxed md:text-lg md:leading-relaxed">
          {subtitle}
        </p>
      ) : null}
    </>
  );

  return <div className="reveal-fade-up mb-10 sm:mb-12">{content}</div>;
}

export default memo(SectionTitle);
