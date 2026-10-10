import { memo } from "react";

function BentoGrid({ t }) {
  return (
    <section id="about" className="space-y-8">
      <div>
        <p className="text-xs font-bold tracking-widest text-[var(--accent-txt)] uppercase font-sans">
          {t("bento_tag")}
        </p>
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-[var(--text-primary)] mt-1">
          {t("bento_title")}
        </h2>
      </div>

      {/* 3-Column Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Block A: Dual Discipline (2 cols) */}
        <div className="md:col-span-2 card-spotlight rounded-2xl p-6 sm:p-8">
          <div className="spotlight-glow" />
          <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[var(--surface-subtle)] text-[var(--accent-txt)] border border-[var(--border-subtle)]">
            {t("bento_card1_tag")}
          </span>
          <h3 className="font-display font-bold text-xl text-[var(--text-primary)] mt-3">
            {t("bento_card1_title")}
          </h3>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-2 leading-relaxed">
            {t("bento_card1_text")}
          </p>
        </div>

        {/* Block B: Startup MYM (1 col) */}
        <div className="card-spotlight rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
          <div className="spotlight-glow" />
          <div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[var(--accent-subtle)] text-[var(--accent-txt)] border border-[var(--border-subtle)]">
              {t("bento_mym_tag")}
            </span>
            <h3 className="font-display font-bold text-xl text-[var(--text-primary)] mt-3">
              {t("bento_mym_title")}
            </h3>
            <p className="text-xs text-[var(--text-secondary)] mt-2 leading-relaxed">
              {t("bento_mym_desc")}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs text-[var(--accent-txt)] font-semibold">
            <span>{t("bento_mym_status")}</span>
            <span className="text-[var(--text-muted)]">Tangier</span>
          </div>
        </div>

        {/* Block C: Journey Timeline (2 cols) */}
        <div className="md:col-span-2 card-spotlight rounded-2xl p-6 sm:p-8">
          <div className="spotlight-glow" />
          <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[var(--surface-subtle)] text-[var(--neutral-indigo-txt)] border border-[var(--border-subtle)]">
            {t("bento_timeline_tag")}
          </span>
          <h3 className="font-display font-bold text-xl text-[var(--text-primary)] mt-3">
            {t("bento_timeline_title")}
          </h3>

          <div className="mt-5 space-y-4 border-l-2 border-[var(--border-subtle)] pl-4 text-xs">
            {/* Step 1 */}
            <div className="relative">
              <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[var(--btn-primary-bg)]" />
              <p className="font-semibold text-[var(--text-primary)]">{t("tl_step1_title")}</p>
              <p className="text-[var(--text-muted)] mt-0.5">{t("tl_step1_desc")}</p>
            </div>
            {/* Step 2 */}
            <div className="relative">
              <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[var(--neutral-indigo-border)]" />
              <p className="font-semibold text-[var(--text-primary)]">{t("tl_step2_title")}</p>
              <p className="text-[var(--text-muted)] mt-0.5">{t("tl_step2_desc")}</p>
            </div>
            {/* Step 3 */}
            <div className="relative">
              <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-rose-500" />
              <p className="font-semibold text-[var(--text-primary)]">{t("tl_step3_title")}</p>
              <p className="text-[var(--text-muted)] mt-0.5">{t("tl_step3_desc")}</p>
            </div>
            {/* Step 4 */}
            <div className="relative">
              <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <p
                className="font-semibold"
                style={{ color: "var(--status-available-txt)" }}
              >
                {t("tl_step4_title")}
              </p>
              <p className="text-[var(--text-muted)] mt-0.5">{t("tl_step4_desc")}</p>
            </div>
          </div>
        </div>

        {/* Block D: Engineering Mindset (1 col) */}
        <div className="card-spotlight rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
          <div className="spotlight-glow" />
          <div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[var(--surface-subtle)] text-[var(--text-secondary)] border border-[var(--border-subtle)]">
              {t("bento_mindset_tag")}
            </span>
            <h3 className="font-display font-bold text-xl text-[var(--text-primary)] mt-3">
              {t("bento_mindset_title")}
            </h3>
            <ul className="mt-3 space-y-2 text-xs text-[var(--text-secondary)]">
              <li className="flex items-center gap-1.5">
                <svg
                  className="w-3.5 h-3.5 text-emerald-500 shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{t("ms_1")}</span>
              </li>
              <li className="flex items-center gap-1.5">
                <svg
                  className="w-3.5 h-3.5 text-emerald-500 shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{t("ms_2")}</span>
              </li>
              <li className="flex items-center gap-1.5">
                <svg
                  className="w-3.5 h-3.5 text-emerald-500 shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{t("ms_3")}</span>
              </li>
            </ul>
          </div>
          <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] text-xs text-[var(--text-muted)]">
            {t("lighthouse_target")}
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(BentoGrid);
