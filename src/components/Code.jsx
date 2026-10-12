import { useEffect, useRef, useState } from "react";

// Lightweight syntax highlighter for the PHP snippets.
// It tokenises a narrow, predictable grammar — keywords, strings, comments,
// numbers, functions — and returns React nodes. Kept local so the design
// system owns the palette without pulling in a highlighting dependency.
const KEYWORDS = new Set([
  'abstract', 'class', 'interface', 'trait', 'enum', 'public', 'private',
  'protected', 'final', 'implements', 'extends', 'function', 'return', 'new',
  'namespace', 'use', 'readonly', 'static', 'true', 'false', 'null', 'void',
  'int', 'float', 'string', 'bool', 'array', 'object', 'if', 'else',
  'foreach', 'as', 'echo', 'match',
]);

const TOKEN = /(\/\/[^\n]*|#[^\n]*)|("[^"]*"|'[^']*')|\b(\d+(?:\.\d+)?)\b|([A-Za-z_][A-Za-z0-9_]*)(?=\s*\()|([A-Za-z_][A-Za-z0-9_]*)/g;

const COPY_RESET_MS = 2000;

const FALLBACK_LABELS = { copy: 'Copy', copied: 'Copied', failed: 'Copy failed' };

export default function Code({ language = 'php', title, children, labels }) {
  const [state, setState] = useState('idle'); // 'idle' | 'copied' | 'error'
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const source = String(children).replace(/\s+$/, '');
  const L = { ...FALLBACK_LABELS, ...labels };

  const highlight = () =>
    source.split('\n').map((line, lineIndex) => {
      const nodes = [];
      let key = 0;
      let last = 0;
      TOKEN.lastIndex = 0;
      let m;
      while ((m = TOKEN.exec(line)) !== null) {
        if (m.index > last) nodes.push(line.slice(last, m.index));
        if (m[1]) nodes.push(<span key={key++} className="tok-com">{m[1]}</span>);
        else if (m[2]) nodes.push(<span key={key++} className="tok-str">{m[2]}</span>);
        else if (m[3]) nodes.push(<span key={key++} className="tok-num">{m[3]}</span>);
        else if (m[4]) nodes.push(<span key={key++} className="tok-fn">{m[4]}</span>);
        else if (m[5]) {
          nodes.push(
            <span key={key++} className={KEYWORDS.has(m[5]) ? 'tok-key' : undefined}>
              {m[5]}
            </span>
          );
        }
        last = m.index + m[0].length;
      }
      if (last < line.length) nodes.push(line.slice(last));
      return (
        <span key={lineIndex} className="code__line">
          <span className="code__ln" aria-hidden="true">{lineIndex + 1}</span>
          <span className="code__lc">{nodes.length ? nodes : ' '}</span>
        </span>
      );
    });

  /**
   * Legacy path for insecure contexts / denied clipboard permission.
   * execCommand reports whether it actually copied, so a failure here is a
   * real failure and must never be reported as success.
   */
  const legacyCopy = () => {
    const ta = document.createElement('textarea');
    ta.value = source;
    ta.setAttribute('readonly', '');
    ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0;pointer-events:none';
    document.body.appendChild(ta);
    ta.select();
    let ok;
    try { ok = document.execCommand('copy'); } catch { ok = false; }
    document.body.removeChild(ta);
    if (!ok) throw new Error('Copy command was rejected');
  };

  const copy = async () => {
    let ok;
    try {
      if (navigator.clipboard?.writeText && window.isSecureContext) {
        await navigator.clipboard.writeText(source);
        ok = true;
      } else {
        legacyCopy();
        ok = true;
      }
    } catch {
      // The async API can reject (permission denied, insecure context, lost
      // focus). Retry once through the legacy path before reporting failure.
      try { legacyCopy(); ok = true; } catch { ok = false; }
    }

    setState(ok ? 'copied' : 'error');
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setState('idle'), COPY_RESET_MS);
  };

  const label = state === 'copied' ? L.copied : state === 'error' ? L.failed : L.copy;
  const status = state === 'copied' ? L.copied : state === 'error' ? L.failed : '';

  return (
    <figure className="code">
      <figcaption className="code__head">
        <span className="code__dots" aria-hidden="true"><i /><i /><i /></span>
        <span className="code__name">{title || language}</span>
        <button
          type="button"
          className={`code__copy${state === 'copied' ? ' is-copied' : ''}${state === 'error' ? ' is-error' : ''}`}
          onClick={copy}
          aria-label={label}
        >
          <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            {state === 'copied'
              ? <path d="M20 6 9 17l-5-5" />
              : <><rect x="9" y="9" width="12" height="12" rx="2" /><path d="M5 15V5a2 2 0 0 1 2-2h10" /></>}
          </svg>
          {label}
        </button>
      </figcaption>
      <pre tabIndex={0}><code>{highlight()}</code></pre>
      <span className="sr-only" role="status" aria-live="polite">{status}</span>
    </figure>
  );
}