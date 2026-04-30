import { memo } from "react";

function SectionDivider() {
  return (
    <div className="section z-10 py-0">
      <div className="mx-auto h-px w-full max-w-4xl bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
}

export default memo(SectionDivider);
