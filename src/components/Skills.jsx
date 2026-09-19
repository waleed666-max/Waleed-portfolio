import { useEffect, useRef, useState } from "react";

const SKILL_GROUPS = [
  {
    title: "Frontend",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <polyline points="8 6 2 12 8 18" />
        <polyline points="16 6 22 12 16 18" />
      </svg>
    ),
    bars: [
      { name: "React.js", level: 85 },
      { name: "JavaScript (ES6+)", level: 90 },
      { name: "HTML / CSS", level: 92 },
      { name: "Bootstrap", level: 80 }
    ]
  },
  {
    title: "Backend",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="4" width="18" height="6" rx="1.5" />
        <rect x="3" y="14" width="18" height="6" rx="1.5" />
        <circle cx="7" cy="7" r="0.8" fill="currentColor" stroke="none" />
        <circle cx="7" cy="17" r="0.8" fill="currentColor" stroke="none" />
      </svg>
    ),
    bars: [
      { name: "Node.js", level: 80 },
      { name: "Express.js", level: 78 },
      { name: "REST APIs", level: 82 },
      { name: "JWT Auth", level: 81 }
    ]
  },
  {
    title: "Database",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <ellipse cx="12" cy="5" rx="8" ry="3" />
        <path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
        <path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" />
      </svg>
    ),
    bars: [
      { name: "MongoDB", level: 90 },
      { name: "Mongoose", level: 85 },
      { name: "Firebase / Firestore", level: 75 }
    ]
  },
  {
    title: "Tools & Plateforms",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94z" />
      </svg>
    ),
    bars: [
      { name: "Git & GitHub", level: 85 },
      { name: "VS Code", level: 90 },
       { name: "Chrome DevTools", level: 88 },
       { name: "Claude Coding", level: 88 },
      { name: "Postman", level: 78 },
      { name: "npm", level: 80 }
      
  
    ]
  },
    {
    title: "Technical Expertise",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 2 3 7l9 5 9-5-9-5z" />
        <path d="M3 12l9 5 9-5" />
        <path d="M3 17l9 5 9-5" />
      </svg>
    ),
    bars: [
     { name: "Pixel-Perfect & Responsive", level: 90 },
     { name: "CRUD Operations", level: 85 },
     { name: "Debugging & Troubleshooting", level: 90 },
     { name: "Cross-Browser Compatibility", level: 85 },
     { name: "Version Control Workflows", level: 90 },

    ]
  }

];

export default function Skills() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section" id="skills" ref={sectionRef}>
      <div className="wrap">
        <div className="section-head">
          <span className="section-num">03</span>
          <h2>Skills</h2>
        </div>

        <div className="skills-bars-grid">
          {SKILL_GROUPS.map((group) => (
            <div className="skill-panel" key={group.title}>
              <div className="skill-panel-head">
                <div className="skill-card-icon">{group.icon}</div>
                <h3>{group.title}</h3>
              </div>

              <div className="bar-list">
                {group.bars.map((s) => (
                  <div className="bar-item" key={s.name}>
                    <div className="bar-item-top">
                      <span>{s.name}</span>
                      
                    </div>
                    <div className="bar-track">
                      <div
                        className="bar-fill"
                        style={{ width: visible ? `${s.level}%` : "0%" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}