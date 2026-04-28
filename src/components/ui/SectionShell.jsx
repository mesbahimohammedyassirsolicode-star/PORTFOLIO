export default function SectionShell({ id, className = "", children, amount = 0.2 }) {
  void amount;
  const sectionClassName = `section ${className}`.trim();

  return (
    <section id={id} className={sectionClassName}>
      {children}
    </section>
  );
}
