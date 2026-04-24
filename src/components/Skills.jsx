import { motion } from "framer-motion";
import { skillGroups } from "../data/portfolioData";
import SectionTitle from "./SectionTitle";

export default function Skills() {
  return (
    <section id="skills" className="section">
      <SectionTitle
        eyebrow="Skills"
        title="A balanced toolkit across frontend, backend, and AI."
        subtitle="I combine technical depth with product thinking to deliver complete solutions."
      />
      <div className="skills-grid">
        {skillGroups.map((group, index) => (
          <motion.article
            key={group.title}
            className="skill-card glass"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
          >
            <div className="skill-icon">{group.icon}</div>
            <h3>{group.title}</h3>
            <ul>
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>
    </section>
  );
}