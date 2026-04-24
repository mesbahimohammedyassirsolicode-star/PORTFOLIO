import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";

export default function Contact() {
  return (
    <section id="contact" className="section">
      <SectionTitle
        eyebrow="Contact"
        title="Let’s build something impactful together."
        subtitle="Open to internships, freelance work, and collaborative projects."
      />
      <motion.div
        className="contact-grid"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.55 }}
      >
        <form className="contact-form glass">
          <label>
            Name
            <input type="text" placeholder="Your name" />
          </label>
          <label>
            Email
            <input type="email" placeholder="your@email.com" />
          </label>
          <label>
            Message
            <textarea rows="5" placeholder="Tell me about your project..." />
          </label>
          <button type="button" className="btn btn-primary">
            Send Message
          </button>
        </form>
        <aside className="contact-info glass">
          <h3>Contact Details</h3>
          <p>Email: mohammed.yassir.dev@gmail.com</p>
          <p>Location: Morocco</p>
          <a href="https://github.com/" target="_blank" rel="noreferrer">
            GitHub Profile
          </a>
        </aside>
      </motion.div>
    </section>
  );
}