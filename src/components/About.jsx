
const HIGHLIGHTS = [
  {
    title: "Full-Stack Development",
    desc: "Comfortable across the whole stack — from database schema to deployed UI.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="4" width="18" height="14" rx="2" />
        <path d="M3 9h18" />
        <circle cx="6.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
      </svg>
    )
  },
  
  {
    title: "MERN Stack Focus",
    desc: "React, Node.js, Express, and MongoDB — my primary toolkit for building apps.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" />
      </svg>
    )
  },
  {
    title: "Clean, Secure Code",
    desc: "I care about maintainable code, proper auth, and sensible project structure.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 2 4 5v6c0 5 3.4 8.7 8 11 4.6-2.3 8-6 8-11V5l-8-3z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    )
  },
  {
    title: "Always Learning",
    desc: "Constantly building new projects and picking up tools as I grow.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 3v3M12 18v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M3 12h3M18 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    )
  }
];

export default function About() {
  return (
    <section className="section" id="about">
      <div className="wrap">
        <div className="section-head">
          <span className="section-num">01</span>
          <h2>About Me</h2>
        </div>

        <div className="about-split">
          <div className="about-text">
            <span className="status-badge">
              <span className="status-dot" /> Available for opportunities
            </span>

            <p className="about-lead">
              I'm Waleed Akhtar — a <strong>Software Engineer</strong> who builds
              full-stack web applications from the ground up.
            </p>
            <p>
              I work primarily with the <strong>MERN stack</strong> — React
              on the frontend, Node.js and Express on the backend, and
              MongoDB for storage — and care deeply about writing code
              that's clean, secure, and easy to maintain.
            </p>
            <p>
              Outside of MERN, I focused on smooth UX and mobile-first
              design. I'm constantly expanding my skill set, learning new
              technologies, and shipping new projects as I build them.
            </p>
          </div>

          <div className="highlight-grid">
            {HIGHLIGHTS.map((h) => (
              <div className="highlight-card" key={h.title}>
                <div className="highlight-icon">{h.icon}</div>
                <h4>{h.title}</h4>
                <p>{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}