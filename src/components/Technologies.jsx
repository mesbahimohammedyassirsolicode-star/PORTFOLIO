import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { previewSkills } from "../data/portfolioData";
import SectionTitle from "./SectionTitle";
import GlassCard from "./ui/GlassCard";
import SectionShell from "./ui/SectionShell";
import Button from "./ui/Button";
import useAnimationBudget from "../hooks/useAnimationBudget";

const logoMap = {
  HTML: "https://cdn.simpleicons.org/html5/E34F26",
  CSS: "https://cdn.simpleicons.org/css/1572B6",
  JavaScript: "https://cdn.simpleicons.org/javascript/F7DF1E",
  PHP: "https://cdn.simpleicons.org/php/777BB4",
  MySQL: "https://cdn.simpleicons.org/mysql/4479A1",
};

const cardVariants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.42, ease: "easeOut" } },
};

export default function Technologies() {
  const { shouldLimitMotion } = useAnimationBudget();

  return (
    <SectionShell id="technologies" amount={0.25}>
      <SectionTitle
        eyebrow="Technologies"
        title="Technologies"
        subtitle="Core technologies I use to design, build, and maintain modern web applications."
      />

      <motion.div
        className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-3 lg:grid-cols-4"
        initial={shouldLimitMotion ? false : "hidden"}
        whileInView={shouldLimitMotion ? undefined : "show"}
        viewport={shouldLimitMotion ? undefined : { once: true, amount: 0.2 }}
        variants={shouldLimitMotion ? undefined : {
          hidden: {},
          show: { transition: { staggerChildren: 0.09 } },
        }}
      >
        {previewSkills.map((skill) => {
          return (
            <GlassCard
              key={skill}
              className="group relative overflow-hidden p-4 text-center sm:p-5 md:p-6"
              variants={shouldLimitMotion ? undefined : cardVariants}
            >
              <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-violet-400/10 blur-2xl transition group-hover:bg-violet-400/20" />

              <div className="relative">
                <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl border border-white/20 bg-white/10 p-2">
                  <img
                    src={logoMap[skill]}
                    alt={`${skill} logo`}
                    width="28"
                    height="28"
                    className="h-7 w-7 object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                <h3 className="mt-3 text-sm font-semibold text-white sm:text-base">{skill}</h3>
              </div>
            </GlassCard>
          );
        })}
      </motion.div>

      <motion.div
        className="mt-8 flex justify-center"
        initial={shouldLimitMotion ? false : { opacity: 0, y: 14 }}
        whileInView={shouldLimitMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={shouldLimitMotion ? undefined : { once: true, amount: 0.4 }}
        transition={shouldLimitMotion ? undefined : { duration: 0.45 }}
      >
        <Button as="a" href="#skills" variant="secondary" className="gap-2">
          View Skills <ArrowRight size={16} />
        </Button>
      </motion.div>

    </SectionShell>
  );
}
