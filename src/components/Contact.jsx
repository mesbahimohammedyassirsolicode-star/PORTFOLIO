import { memo, useState, useRef } from "react";

const EMAILJS = { serviceId: '', templateId: '', publicKey: '' };

const ICON_OK = (
  <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.7-9.3a1 1 0 00-1.4-1.4L9 10.6 7.7 9.3a1 1 0 00-1.4 1.4l2 2a1 1 0 001.4 0l4-4z" clipRule="evenodd"/>
  </svg>
);
const ICON_BAD = (
  <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-4a1 1 0 00-1 1v3a1 1 0 002 0V7a1 1 0 00-1-1zm0 7a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd"/>
  </svg>
);

function Contact({ t }) {
  const [fields, setFields] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState(null); // { kind: 'ok'|'bad', msg }
  const [, setSending] = useState(false);
  const [copyLabel, setCopyLabel] = useState(null);
  const honeypotRef = useRef(null);

  const EMAIL = 'mesbahi.mohammedyassir.solicode@gmail.com';

  const validate = () => {
    const e = {};
    if (fields.name.trim().length < 2) e.name = true;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(fields.email.trim())) e.email = true;
    if (!fields.subject.trim()) e.subject = true;
    if (fields.message.trim().length < 10) e.message = true;
    return e;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (honeypotRef.current?.value) return; // honeypot

    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;

    const last = Number(sessionStorage.getItem('lastSend') || 0);
    if (Date.now() - last < 60000) {
      setAlert({ kind: 'bad', msg: t('wait') });
      return;
    }

    if (!EMAILJS.serviceId || !EMAILJS.templateId || !EMAILJS.publicKey) {
      setAlert({ kind: 'bad', msg: t('fail') });
      return;
    }

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
      if (!res.ok) throw new Error('send failed');
      sessionStorage.setItem('lastSend', String(Date.now()));
      setFields({ name: '', email: '', subject: '', message: '' });
      setErrors({});
      setAlert({ kind: 'ok', msg: t('ok') });
    } catch {
      setAlert({ kind: 'bad', msg: t('fail') });
    } finally {
      setSending(false);
    }
  };

  const handleCopy = () => {
    const done = () => {
      setCopyLabel(t('copied'));
      setTimeout(() => setCopyLabel(null), 2200);
    };
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(EMAIL).then(done).catch(done);
    } else {
      const ta = document.createElement('textarea');
      ta.value = EMAIL;
      ta.style.cssText = 'position:fixed;opacity:0';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); } catch { /* noop */ }
      document.body.removeChild(ta);
      done();
    }
  };

  return (
    <section id="contact" data-spy="">
      <div className="wrap">
        <div className="reveal">
          <p className="eyebrow">{t('contact_eyebrow')}</p>
          <h2>{t('contact_title')}</h2>
        </div>

        <div className="contact-grid">
          {/* Left: info card */}
          <aside className="card reveal">
            <h3>Mohammed Yassir Mesbahi</h3>
            <p className="avail">{t('avail')}</p>

            <div className="mail">
              <small>{t('mail_lbl')}</small>
              <div className="mail-row">
                <code id="email-text">{EMAIL}</code>
                <button className="mini" type="button" onClick={handleCopy}>
                  {copyLabel || t('copy')}
                </button>
              </div>
              <span className="sr-only" role="status" aria-live="polite">
                {copyLabel || ''}
              </span>
            </div>

            <div className="social">
              <a href="https://github.com/mesbahimohammedyassirsolicode-star" target="_blank" rel="noopener noreferrer">
                GitHub ↗
              </a>
            </div>

            <p className="contact-note">{t('reply')}</p>
          </aside>

          {/* Right: form card */}
          <div className="card reveal">
            <form
              id="contact-form"
              className="contact-form"
              noValidate
              onSubmit={handleSubmit}
            >
              {/* Honeypot */}
              <div className="hp" aria-hidden="true">
                <label>
                  Website
                  <input ref={honeypotRef} type="text" name="website" tabIndex="-1" autoComplete="off" />
                </label>
              </div>

              <div className="two">
                <div className="field">
                  <label htmlFor="name">{t('f_name')}</label>
                  <input
                    id="name" name="name" type="text" autoComplete="name" required
                    aria-invalid={errors.name ? 'true' : 'false'}
                    aria-describedby="name-err"
                    placeholder={t('ph_name')}
                    value={fields.name}
                    onChange={(e) => setFields((f) => ({ ...f, name: e.target.value }))}
                    onInput={() => setErrors((err) => ({ ...err, name: false }))}
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
                    value={fields.email}
                    onChange={(e) => setFields((f) => ({ ...f, email: e.target.value }))}
                    onInput={() => setErrors((err) => ({ ...err, email: false }))}
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
                  value={fields.subject}
                  onChange={(e) => setFields((f) => ({ ...f, subject: e.target.value }))}
                  onInput={() => setErrors((err) => ({ ...err, subject: false }))}
                />
                <datalist id="subjects">
                  <option value="Internship offer"/>
                  <option value="Collaboration"/>
                  <option value="Other"/>
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
                  value={fields.message}
                  onChange={(e) => setFields((f) => ({ ...f, message: e.target.value }))}
                  onInput={() => setErrors((err) => ({ ...err, message: false }))}
                />
                <p className="field-err" id="message-err">{t('err_message')}</p>
              </div>

              {alert && (
                <div className={`form-alert show ${alert.kind}`} role="status" aria-live="polite">
                  {alert.kind === 'ok' ? ICON_OK : ICON_BAD}
                  <span>{alert.msg}</span>
                </div>
              )}

              <button className="btn btn-primary" id="submit-btn" type="submit" disabled>
                <span id="submit-label">{t('send')}</span>
              </button>
              <p className="form-note">{t('form_unconfigured')}</p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(Contact);
