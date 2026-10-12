import { memo, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { fadeUp, viewport } from "../lib/motion";
import "./contact-section.css";

const EMAIL = 'mesbahi.mohammedyassir.solicode@gmail.com';
const GITHUB = 'https://github.com/mesbahimohammedyassirsolicode-star';
const GITHUB_HANDLE = 'mesbahimohammedyassirsolicode-star';
const SUBJECTS = ['Internship offer', 'Collaboration', 'Freelance project', 'Other'];

// EmailJS credentials are read from Vite env vars, never hardcoded, so no
// secret is ever committed. Leave them unset and the form falls back to a
// mailto: hand-off instead of pretending to deliver a message.
const EMAILJS = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '',
};
const CONFIGURED = Boolean(EMAILJS.serviceId && EMAILJS.templateId && EMAILJS.publicKey);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const RATE_LIMIT_MS = 60000;
const COPY_RESET_MS = 2000;

const EMPTY = { name: '', email: '', subject: '', message: '' };

const validate = (fields) => {
  const errors = {};
  if (fields.name.trim().length < 2) errors.name = true;
  if (!EMAIL_RE.test(fields.email.trim())) errors.email = true;
  if (!fields.subject.trim()) errors.subject = true;
  if (fields.message.trim().length < 10) errors.message = true;
  return errors;
};

const ICON_OK = (
  <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.7-9.3a1 1 0 00-1.4-1.4L9 10.6 7.7 9.3a1 1 0 00-1.4 1.4l2 2a1 1 0 001.4 0l4-4z" clipRule="evenodd" />
  </svg>
);
const ICON_BAD = (
  <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-4a1 1 0 00-1 1v3a1 1 0 002 0V7a1 1 0 00-1-1zm0 7a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
  </svg>
);

function Contact({ t }) {
  const [fields, setFields] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState(null);
  const [sending, setSending] = useState(false);
  const [copyState, setCopyState] = useState('idle'); // idle | ok | fail
  const honeypot = useRef(null);
  // Guards against a second submit slipping through before React re-renders.
  const inFlight = useRef(false);

  const set = (key) => (e) => setFields((f) => ({ ...f, [key]: e.target.value }));
  const clear = (key) => () => setErrors((prev) => ({ ...prev, [key]: false }));

  /**
   * A fully encoded mailto: hand-off. Used both as the primary action when
   * EmailJS is unconfigured and as the fallback if delivery fails.
   */
  const mailtoHref = useMemo(() => {
    const body = [
      '',
      fields.message.trim(),
      '',
      `— ${fields.name.trim() || t('f_name')}`,
      fields.email.trim() ? `   ${fields.email.trim()}` : '',
    ].filter(Boolean).join('\n');

    const params = new URLSearchParams();
    params.set('subject', fields.subject.trim() || t('ph_subject'));
    params.set('body', body);
    return `mailto:${EMAIL}?${params.toString()}`;
  }, [fields, t]);

  const runValidation = () => {
    const found = validate(fields);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      document.getElementById(first)?.focus();
      return false;
    }
    return true;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (inFlight.current) return;
    if (honeypot.current?.value) return; // silently drop bot submissions

    if (!runValidation()) return;

    const last = Number(sessionStorage.getItem('lastSend') || 0);
    if (Date.now() - last < RATE_LIMIT_MS) {
      setAlert({ kind: 'bad', msg: t('wait') });
      return;
    }

    inFlight.current = true;
    setSending(true);
    setAlert(null);
    try {
      const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: EMAILJS.serviceId,
          template_id: EMAILJS.templateId,
          user_id: EMAILJS.publicKey,
          template_params: {
            from_name: fields.name.trim(),
            reply_to: fields.email.trim(),
            subject: fields.subject.trim(),
            message: fields.message.trim(),
          },
        }),
      });
      // Only a confirmed 2xx counts as delivered.
      if (!res.ok) throw new Error(`EmailJS responded ${res.status}`);
      sessionStorage.setItem('lastSend', String(Date.now()));
      setFields(EMPTY);
      setErrors({});
      setAlert({ kind: 'ok', msg: t('ok') });
    } catch {
      setAlert({ kind: 'bad', msg: t('fail') });
    } finally {
      inFlight.current = false;
      setSending(false);
    }
  };

  /**
   * Unconfigured path: validate, then hand off to the visitor's mail client.
   * Nothing is claimed to have been delivered — the user sends it themselves.
   */
  const handleMailto = (ev) => {
    if (!runValidation()) {
      ev.preventDefault();
      return;
    }
    setAlert(null);
  };

  const copy = async () => {
    const legacy = () => {
      const ta = document.createElement('textarea');
      ta.value = EMAIL;
      ta.setAttribute('readonly', '');
      ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0;pointer-events:none';
      document.body.appendChild(ta);
      ta.select();
      let ok;
      try { ok = document.execCommand('copy'); } catch { ok = false; }
      document.body.removeChild(ta);
      if (!ok) throw new Error('Copy command was rejected');
    };

    let ok;
    try {
      if (navigator.clipboard?.writeText && window.isSecureContext) {
        await navigator.clipboard.writeText(EMAIL);
        ok = true;
      } else {
        legacy();
        ok = true;
      }
    } catch {
      try { legacy(); ok = true; } catch { ok = false; }
    }

    setCopyState(ok ? 'ok' : 'fail');
    setTimeout(() => setCopyState('idle'), COPY_RESET_MS);
  };

  const copyLabel = copyState === 'ok' ? t('copy_ok') : copyState === 'fail' ? t('copy_fail') : t('copy_email');

  return (
    <section className="contact-section" id="contact">
      <div className="wrap">
        <div className="section-head">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport}>
            <p className="eyebrow">{t('contact_eyebrow')}</p>
            <h2>{t('contact_title')}</h2>
          </motion.div>
          <motion.div className="section-head__aside" variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport}>
            <p>{t('contact_desc')}</p>
            <span className="availability"><i aria-hidden="true" />{t('avail')}</span>
          </motion.div>
        </div>

        <div className="contact-grid">
          {/* ---------------- Contact channel panel ---------------- */}
          <motion.div className="contact-side" variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport}>
            <div className="terminal">
              <div className="terminal__head">
                <span className="terminal__dots" aria-hidden="true"><i /><i /><i /></span>
                <span>contact.json</span>
              </div>

              <dl className="terminal__body">
                <div className="terminal__row">
                  <dt>{t('mail_lbl')}</dt>
                  <dd><a href={`mailto:${EMAIL}`}>{EMAIL}</a></dd>
                </div>
                <div className="terminal__row">
                  <dt>GitHub</dt>
                  <dd><a href={GITHUB} target="_blank" rel="noopener noreferrer">{GITHUB_HANDLE}</a></dd>
                </div>
                <div className="terminal__row">
                  <dt>{t('location_lbl')}</dt>
                  <dd>{t('about_base_v')}</dd>
                </div>
              </dl>

              <div className="terminal__foot">
                <span className="terminal__note">{t('terminal_note')}</span>
                <button
                  type="button"
                  className={`btn btn--ghost contact-copy${copyState === 'ok' ? ' is-ok' : ''}${copyState === 'fail' ? ' is-fail' : ''}`}
                  onClick={copy}
                >
                  {copyLabel}
                </button>
              </div>
              <span className="sr-only" role="status" aria-live="polite">{copyState === 'idle' ? '' : copyLabel}</span>
            </div>

            <a className="contact-link-card" href={GITHUB} target="_blank" rel="noopener noreferrer">
              <span className="contact-link-card__kicker">GitHub</span>
              <span className="contact-link-card__title">{GITHUB_HANDLE} ↗</span>
            </a>
          </motion.div>

          {/* ---------------- Form ---------------- */}
          <motion.div className="card contact-card" variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport}>
            <form
              id="contact-form"
              className="contact-form"
              noValidate
              onSubmit={handleSubmit}
              aria-busy={sending ? 'true' : 'false'}
            >
              {/* Anti-spam honeypot. Kept in the DOM (bots fill hidden inputs)
                  but clipped from view and removed from the tab order. */}
              <div className="contact-hp" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input
                  id="website"
                  ref={honeypot}
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  data-lpignore="true"
                  data-1p-ignore="true"
                />
              </div>

              <div className="two">
                <div className="field">
                  <label htmlFor="name">{t('f_name')}</label>
                  <input
                    id="name" name="name" type="text" autoComplete="name" required
                    aria-invalid={errors.name ? 'true' : 'false'}
                    aria-describedby="name-err"
                    placeholder={t('ph_name')}
                    value={fields.name} onChange={set('name')} onInput={clear('name')}
                  />
                  <p className="field-err" id="name-err">{t('err_name')}</p>
                </div>
                <div className="field">
                  <label htmlFor="email">{t('f_email')}</label>
                  <input
                    id="email" name="email" type="email" autoComplete="email" required
                    aria-invalid={errors.email ? 'true' : 'false'}
                    aria-describedby="email-err"
                    placeholder={t('ph_email')}
                    value={fields.email} onChange={set('email')} onInput={clear('email')}
                  />
                  <p className="field-err" id="email-err">{t('err_email')}</p>
                </div>
              </div>

              <div className="field">
                <label htmlFor="subject">{t('f_subject')}</label>
                <input
                  id="subject" name="subject" type="text" list="subjects" required
                  aria-invalid={errors.subject ? 'true' : 'false'}
                  aria-describedby="subject-err"
                  placeholder={t('ph_subject')}
                  value={fields.subject} onChange={set('subject')} onInput={clear('subject')}
                />
                <datalist id="subjects">
                  {SUBJECTS.map((s) => <option key={s} value={s} />)}
                </datalist>
                <p className="field-err" id="subject-err">{t('err_subject')}</p>
              </div>

              <div className="field">
                <label htmlFor="message">{t('f_message')}</label>
                <textarea
                  id="message" name="message" rows="5" required
                  aria-invalid={errors.message ? 'true' : 'false'}
                  aria-describedby="message-err"
                  placeholder={t('ph_message')}
                  value={fields.message} onChange={set('message')} onInput={clear('message')}
                />
                <p className="field-err" id="message-err">{t('err_message')}</p>
              </div>

              {alert && (
                <div className={`form-alert show ${alert.kind}`} role="status" aria-live="polite">
                  {alert.kind === 'ok' ? ICON_OK : ICON_BAD}
                  <span>{alert.msg}</span>
                </div>
              )}

              {CONFIGURED ? (
                <>
                  <button className="btn btn--primary" id="submit-btn" type="submit" disabled={sending}>
                    {sending ? t('sending') : t('send')}
                  </button>
                  {!sending && <p className="form-note">{t('form_note')}</p>}
                </>
              ) : (
                <>
                  {/* No credentials: hand off to the visitor's mail client
                      instead of pretending the page can deliver a message. */}
                  <a className="btn btn--primary contact-submit" id="submit-btn" href={mailtoHref} onClick={handleMailto}>
                    {t('open_mail')}
                    <span aria-hidden="true">↗</span>
                  </a>
                  <p className="form-note">{t('mail_note')}</p>
                </>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default memo(Contact);