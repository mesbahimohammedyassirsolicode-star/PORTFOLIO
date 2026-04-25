import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";

export default function Contact() {
  const sectionVariants = {
    hidden: { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        staggerChildren: 0.12,
        ease: "easeOut",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
  };

  return (
    <motion.section
      id="contact"
      className="section"
      variants={sectionVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
    >
      <SectionTitle
        eyebrow="Contact"
        title="Let’s build something impactful together."
        subtitle="Open to internships, freelance work, and collaborative projects."
      />
      <motion.div
        className="grid grid-cols-1 gap-4 lg:grid-cols-[1.2fr_0.8fr]"
        variants={sectionVariants}
      >
        <motion.form className="glass grid gap-3 p-5 sm:p-6" variants={itemVariants}>
          <label className="grid gap-2 text-sm text-slate-300">
            Name
            <input
              type="text"
              placeholder="Your name"
              className="w-full rounded-lg border border-white/20 bg-slate-900/75 px-3.5 py-2.5 text-slate-100 outline-none transition focus:border-violet-400/80 focus:ring-2 focus:ring-violet-500/40"
            />
          </label>
          <label className="grid gap-2 text-sm text-slate-300">
            Email
            <input
              type="email"
              placeholder="your@email.com"
              className="w-full rounded-lg border border-white/20 bg-slate-900/75 px-3.5 py-2.5 text-slate-100 outline-none transition focus:border-violet-400/80 focus:ring-2 focus:ring-violet-500/40"
            />
          </label>
          <label className="grid gap-2 text-sm text-slate-300">
            Message
            <textarea
              rows="5"
              placeholder="Tell me about your project..."
              className="w-full rounded-lg border border-white/20 bg-slate-900/75 px-3.5 py-2.5 text-slate-100 outline-none transition focus:border-violet-400/80 focus:ring-2 focus:ring-violet-500/40"
            />
          </label>
          <button type="button" className="btn-primary mt-1 w-fit">
            Send Message
          </button>
        </motion.form>
        <motion.aside className="glass p-6" variants={itemVariants}>
          <h3 className="mt-0 mb-4 text-xl font-semibold text-white">Contact Details</h3>
          <p className="my-1 text-slate-300">Email: mohammed.yassir.dev@gmail.com</p>
          <p className="my-1 text-slate-300">Location: Morocco</p>
          <a
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-block text-blue-300 transition hover:text-blue-200"
          >
            GitHub Profile
          </a>
        </motion.aside>
      </motion.div>
    </motion.section>
  );
}