import { memo } from "react";

function SectionDivider() {
  return (
    <div className="section z-10 py-0">
      <div className="mx-auto h-px w-full max-w-5xl bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </div>
  );
}

export default memo(SectionDivider);
