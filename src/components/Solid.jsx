import { memo } from "react";
import { motion } from "framer-motion";
import Code from "./Code";
import { fadeUp, stagger, viewport } from "../lib/motion";
import "./solid-section.css";

/**
 * Each snippet is valid, self-contained PHP 8 where practical, and actually
 * demonstrates the principle it is filed under.
 *
 * Note on LSP: the example deliberately avoids a base contract that a valid
 * subtype could not honour (e.g. "fly(): bool" forced on every bird), because
 * that teaches the opposite lesson. `Notification` defines behaviour that every
 * subclass can and does provide.
 */
const PRINCIPLES = [
  {
    id: 'srp',
    letter: 'S',
    accent: 'var(--primary)',
    title: 'srp_title',
    desc: 'srp_desc',
    file: 'UserMailer.php',
    code: `final class UserMailer
{
    public function __construct(
        private Mailer $mailer
    ) {}

    public function sendWelcome(User $user): void
    {
        $this->mailer->to($user->email)
            ->send('Welcome aboard');
    }
}

// The User model keeps no knowledge of email.
// One reason for this class to change: how we greet people.`,
  },
  {
    id: 'ocp',
    letter: 'O',
    accent: 'var(--cyan)',
    title: 'ocp_title',
    desc: 'ocp_desc',
    file: 'Checkout.php',
    code: `final class Checkout
{
    public function __construct(
        private PaymentMethod $method
    ) {}

    public function process(float $amount): bool
    {
        return $this->method->pay($amount);
    }
}

// A new provider is a new class.
// Checkout is never reopened to edit it.`,
  },
  {
    id: 'lsp',
    letter: 'L',
    accent: 'var(--primary)',
    title: 'lsp_title',
    desc: 'lsp_desc',
    file: 'Notification.php',
    code: `abstract class Notification
{
    public function __construct(
        protected readonly string $recipient
    ) {}

    abstract public function channel(): string;

    public function deliver(string $body): bool
    {
        return $this->send($body);
    }

    abstract protected function send(string $body): bool;
}

// Any subclass keeps deliver() working, so a caller
// written against Notification needs no changes.`,
  },
  {
    id: 'isp',
    letter: 'I',
    accent: 'var(--cyan)',
    title: 'isp_title',
    desc: 'isp_desc',
    file: 'Workstation.php',
    code: `interface Printer
{
    public function print(): void;
}

interface Scanner
{
    public function scan(): void;
}

final class SimplePrinter implements Printer
{
    public function print(): void {}
}

// A printer is never forced to implement scan().`,
  },
  {
    id: 'dip',
    letter: 'D',
    accent: 'var(--accent-tertiary)',
    title: 'dip_title',
    desc: 'dipp_desc',
    file: 'UserService.php',
    code: `interface UserRepository
{
    public function find(int $id): ?User;
}

final class UserService
{
    public function __construct(
        private UserRepository $repository
    ) {}

    public function profile(int $id): ?User
    {
        return $this->repository->find($id);
    }
}

// The service depends on the abstraction.
// Swap MySQL for a cache without touching it.`,
  },
];

function Solid({ t }) {
  const copyLabels = {
    copy: t('code_copy'),
    copied: t('code_copied'),
    failed: t('code_copy_failed'),
  };

  return (
    <section className="solid-section" id="solid">
      <div className="wrap">
        <div className="section-head">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport}>
            <p className="eyebrow">{t('solid_eyebrow')}</p>
            <h2>{t('solid_title')}</h2>
          </motion.div>
          <motion.div className="section-head__aside" variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport}>
            <p>{t('solid_desc')}</p>
          </motion.div>
        </div>

        <motion.ul
          className="solid-grid"
          variants={stagger(0.06)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          {PRINCIPLES.map((p, i) => (
            <motion.li key={p.id} className="solid-card" variants={fadeUp} style={{ '--solid-accent': p.accent }}>
              <div className="solid-card__head">
                <span className="solid-card__letter" aria-hidden="true">{p.letter}</span>
                <div className="solid-card__heading">
                  <p className="solid-card__idx">
                    {t('solid_principle')} {String(i + 1).padStart(2, '0')}
                  </p>
                  <h3>{t(p.title)}</h3>
                </div>
              </div>

              <p className="solid-card__desc">{t(p.desc)}</p>

              <Code language="php" title={p.file} labels={copyLabels}>{p.code}</Code>
            </motion.li>
          ))}
        </motion.ul>

        <motion.p
          className="solid-foot"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          <span className="solid-foot__dot" aria-hidden="true" />
          {t('solid_tag')}
        </motion.p>
      </div>
    </section>
  );
}

export default memo(Solid);