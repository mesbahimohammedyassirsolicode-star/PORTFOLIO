import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Mail, BriefcaseBusiness, GitBranch, Send } from "lucide-react";
import emailjs from "@emailjs/browser";
import SectionTitle from "./SectionTitle";
import Button from "./ui/Button";
import GlassCard from "./ui/GlassCard";
import SectionShell from "./ui/SectionShell";

export default function Contact() {
  const emailJsPublicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  const emailJsServiceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const emailJsTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const MIN_NAME_LENGTH = 2;
  const MAX_NAME_LENGTH = 100;
  const MAX_SUBJECT_LENGTH = 150;
  const MAX_MESSAGE_LENGTH = 2000;
  const SUBMIT_COOLDOWN_MS = 30_000;
  const EMAIL_REGEX =
    /^(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*)@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;

  const formRef = useRef(null);
  const lastSubmitAtRef = useRef(0);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    website: "",
  });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Escape input characters that are commonly abused in injection payloads.
  const sanitizeInput = (value) =>
    value
      .split("")
      .filter((character) => {
        const charCode = character.charCodeAt(0);
        return charCode >= 32 && charCode !== 127;
      })
      .join("")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");

  const sanitizeFormPayload = (payload) => ({
    name: sanitizeInput(payload.name.trim()),
    email: sanitizeInput(payload.email.trim().toLowerCase()),
    subject: sanitizeInput(payload.subject.trim()),
    message: sanitizeInput(payload.message.trim()),
    website: payload.website.trim(),
  });

  const validateFormPayload = (payload) => {
    if (payload.website) {
      return "Submission blocked.";
    }
    if (payload.name.length < MIN_NAME_LENGTH || payload.name.length > MAX_NAME_LENGTH) {
      return `Name must be ${MIN_NAME_LENGTH}-${MAX_NAME_LENGTH} characters.`;
    }
    if (!EMAIL_REGEX.test(payload.email)) {
      return "Please enter a valid email address.";
    }
    if (!payload.message || payload.message.length > MAX_MESSAGE_LENGTH) {
      return `Message is required and must be at most ${MAX_MESSAGE_LENGTH} characters.`;
    }
    if (payload.subject.length > MAX_SUBJECT_LENGTH) {
      return `Subject must be at most ${MAX_SUBJECT_LENGTH} characters.`;
    }
    return "";
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: sanitizeInput(value) }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) {
      return;
    }

    const now = Date.now();
    if (now - lastSubmitAtRef.current < SUBMIT_COOLDOWN_MS) {
      setStatus({
        type: "error",
        message: "Please wait a few seconds before sending another message.",
      });
      return;
    }

    const sanitizedPayload = sanitizeFormPayload(formState);
    const validationError = validateFormPayload(sanitizedPayload);
    if (validationError) {
      setStatus({ type: "error", message: validationError });
      return;
    }

    if (!emailJsPublicKey || !emailJsServiceId || !emailJsTemplateId) {
      setStatus({
        type: "error",
        message: "Contact form is unavailable right now. Please try again later.",
      });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      const formElement = formRef.current;
      if (!(formElement instanceof HTMLFormElement)) {
        throw new Error("Form reference unavailable");
      }
      await emailjs.send(emailJsServiceId, emailJsTemplateId, sanitizedPayload, {
        publicKey: emailJsPublicKey,
      });

      setStatus({
        type: "success",
        message: "Message sent successfully ✅",
      });
      lastSubmitAtRef.current = now;
      setFormState({ name: "", email: "", subject: "", message: "", website: "" });
    } catch {
      setStatus({
        type: "error",
        message: "Could not send your message. Please try again in a moment.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SectionShell id="contact" amount={0.25}>
      <SectionTitle
        eyebrow="Contact"
        title="Let’s work together"
        subtitle="Open to internships and collaborative projects. If you have an idea, let's turn it into a polished product."
      />
      <motion.div
        className="grid grid-cols-1 gap-5 lg:grid-cols-[1.1fr_0.9fr]"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ staggerChildren: 0.1 }}
      >
        <GlassCard className="p-5 sm:p-7" variants={itemVariants}>
          <form ref={formRef} className="space-y-4" onSubmit={handleSubmit}>
            <div className="hidden" aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input
                id="website"
                name="website"
                type="text"
                value={formState.website}
                onChange={handleInputChange}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-200">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formState.name}
                onChange={handleInputChange}
                required
                className="field-input"
                placeholder="Your full name"
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-200">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formState.email}
                onChange={handleInputChange}
                required
                className="field-input"
                placeholder="client@example.com"
              />
            </div>

            <div>
              <label htmlFor="subject" className="mb-2 block text-sm font-medium text-slate-200">
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                value={formState.subject}
                onChange={handleInputChange}
                required
                className="field-input"
                placeholder="Project inquiry"
              />
            </div>

            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-medium text-slate-200">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formState.message}
                onChange={handleInputChange}
                required
                className="field-input"
                placeholder="Tell me about your project and goals..."
              />
            </div>

            {status.message ? (
              <p
                className={
                  status.type === "success"
                    ? "text-sm text-emerald-300"
                    : "text-sm text-rose-300"
                }
              >
                {status.message}
              </p>
            ) : null}

            <Button type="submit" className="w-full gap-2 sm:w-fit" disabled={isSubmitting}>
              <Send size={16} />
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </GlassCard>
        <GlassCard className="p-5 sm:p-6" variants={itemVariants}>
          <h3 className="mt-0 mb-4 text-lg font-semibold text-white sm:text-xl">Contact Details</h3>
          <a
            href="mailto:mesbahi.mohammedyassir.solicode@gmail.com"
            className="my-2 flex flex-wrap items-center gap-2 break-all text-sm text-slate-300 transition hover:text-white sm:text-base"
          >
            <Mail size={16} />
            mesbahi.mohammedyassir.solicode@gmail.com
          </a>
          <a
            href="https://github.com/mesbahimohammedyassirsolicode-star"
            target="_blank"
            rel="noreferrer"
            className="my-2 flex items-center gap-2 text-sm text-slate-300 transition hover:text-white sm:text-base"
          >
            <GitBranch size={16} />
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/mohammed-yassir-mesbahi-600691329/"
            target="_blank"
            rel="noreferrer"
            className="my-2 flex items-center gap-2 text-sm text-slate-300 transition hover:text-white sm:text-base"
          >
            <BriefcaseBusiness size={16} />
            LinkedIn
          </a>
        </GlassCard>
      </motion.div>
    </SectionShell>
  );
}