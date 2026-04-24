import { navItems } from "../data/portfolioData";

export default function Navbar({ activeSection }) {
  const handleScroll = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (!element) {
      return;
    }

    const y = element.getBoundingClientRect().top + window.scrollY - 84;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <header className="navbar-wrap">
      <nav className="navbar">
        <button className="brand" onClick={() => handleScroll("home")}>
          M<span>Y</span>M
        </button>
        <div className="nav-links">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-link ${activeSection === item.id ? "is-active" : ""}`}
              onClick={() => handleScroll(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>
    </header>
  );
}
