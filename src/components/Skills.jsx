import { motion } from "framer-motion";
import { skillGroups } from "../data/portfolioData";
import SectionTitle from "./SectionTitle";

export default function Skills() {
  const sectionVariants = {
    hidden: { opacity: 0, y: 26 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
        ease: "easeOut",
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 26 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
  };

  return (
    <motion.section
      id="skills"
      className="section"
      variants={sectionVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      <SectionTitle
        eyebrow="Skills"
        title="A balanced toolkit across frontend, backend, and AI."
        subtitle="I combine technical depth with product thinking to deliver complete solutions."
      />
      <motion.div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4" variants={sectionVariants}>
        {skillGroups.map((group, index) => (
          <motion.article
            key={group.title}
            className="glass p-5"
            variants={cardVariants}
            transition={{ duration: 0.45, delay: index * 0.04 }}
            whileHover={{
              y: -8,
              boxShadow: "0 22px 46px rgba(15, 23, 42, 0.55)",
              transition: { duration: 0.2 },
            }}
          >
            <div className="mb-2 text-2xl">{group.icon}</div>
            <h3 className="mb-3 text-lg font-semibold text-white">{group.title}</h3>
            <ul className="grid gap-2 text-sm text-slate-300">
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </motion.article>
        ))}
      </motion.div>
    </motion.section>
  );
}