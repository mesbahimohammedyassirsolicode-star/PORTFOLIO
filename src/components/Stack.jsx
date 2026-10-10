import { memo } from "react";

// Stack section — matches mockup: core tiles grid + chips rows
function Stack({ t }) {
  const core = [
    { name: 'React 19',       key: 'r_ui' },
    { name: 'PHP / Laravel',  key: 'r_backend' },
    { name: 'Kotlin',         key: 'r_android' },
    { name: 'MySQL',          key: 'r_db' },
    { name: 'JavaScript',     key: 'r_logic' },
    { name: 'Tailwind CSS',   key: 'r_style' },
  ];

  const familiar = ['Native PHP', 'REST API design', 'HTML5 semantics & a11y', 'JSON', 'Figma'];
  const workflow = ['Git & GitHub', 'Android Studio', 'Cursor', 'AI agentic workflows', 'n8n', 'Microsoft 365', 'Sage'];

  return (
    <section id="stack" data-spy="">
      <div className="wrap">
        <div className="reveal">
          <p className="eyebrow">{t('stack_eyebrow')}</p>
          <h2>{t('stack_title')}</h2>
        </div>

        {/* Core tiles */}
        <div className="stack-group reveal">
          <h3>{t('g_core')}</h3>
          <ul className="core">
            {core.map(({ name, key }) => (
              <li key={name} className="tile card-spotlight">
                <strong>{name}</strong>
                <span>{t(key)}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Familiar chips */}
        <div className="stack-group reveal">
          <h3>{t('g_familiar')}</h3>
          <ul className="chips">
            {familiar.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>

        {/* Workflow chips */}
        <div className="stack-group reveal">
          <h3>{t('g_workflow')}</h3>
          <ul className="chips quiet">
            {workflow.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default memo(Stack);
