import { useEffect, useLayoutEffect, useState, useRef } from "react";

const CERTS = [
  {
    title: "Meta Front-End Developer",
    issuer: "Meta (via Coursera)",
    date: "Nov 2025",
    desc: "Meta's industry-recognized 9-course program covering JavaScript,  React, Version Control, HTML/CSS, Figma and UX/UI Design.",
    link: "/Courseracertificate.pdf"
  },
  {
    title: "Web Development — NAVTTC (Prime Minister's IT Training Program)",
    issuer: "NAVTTC",
    date: "Sep – Nov 2025",
    desc: "A government-certified program delivered under the National Vocational & Technical Training Commission (NAVTTC), building strong foundations in web development",
    link: ""
  },
  {
    title: "Chrome DevTools User",
    issuer: "Google Developer Program",
    date: "Jan , 2026",
    desc: "Went under the hood of the web — used Chrome DevTools to inspect, debug, and understand how real websites are built.",
    link: "https://developers.google.com/profile/badges/activity/chrome-devtools/chrome-devtools-user"
  }
];

function getOffset(i, index, total) {
  let diff = i - index;
  if (diff > total / 2) diff -= total;
  if (diff < -total / 2) diff += total;
  return diff;
}

export default function Certifications() {
  const [index, setIndex] = useState(0);
  const [stageHeight, setStageHeight] = useState(null); // NEW
  const total = CERTS.length;
  const timerRef = useRef(null);
  const stageRef = useRef(null);   // NEW
  const slideRefs = useRef([]);    // NEW

  function goTo(next) {
    setIndex(((next % total) + total) % total);
  }
  function next() {
    goTo(index + 1);
  }
  function prev() {
    goTo(index - 1);
  }

  useEffect(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(next, 4500);
    return () => clearInterval(timerRef.current);
    // eslint-disable-next-line
  }, [index]);

  // NEW: mobile pe active card ke actual content ke hisaab se stage height set karo
  // (desktop layout ko touch nahi karta — wahan CSS min-height already sahi hai)
 // NEW: sab cards ka max height nikal ke stage ko fixed height do (mobile only)
useLayoutEffect(() => {
  function measure() {
    if (window.innerWidth > 640) {
      setStageHeight(null);
      return;
    }
    const stageEl = stageRef.current;
    if (!stageEl) return;

    const cs = window.getComputedStyle(stageEl);
    const paddingTop = parseFloat(cs.paddingTop) || 0;
    const paddingBottom = parseFloat(cs.paddingBottom) || 0;

    let maxHeight = 0;
    slideRefs.current.forEach((el) => {
      if (el) maxHeight = Math.max(maxHeight, el.scrollHeight);
    });

    if (maxHeight > 0) {
      setStageHeight(maxHeight + paddingTop + paddingBottom);
    }
  }

  measure();

  // NEW: har card ke size-change ko continuously track karega (font load, text change, resize)
  const ro = new ResizeObserver(measure);
  slideRefs.current.forEach((el) => el && ro.observe(el));

  window.addEventListener("resize", measure);
  return () => {
    ro.disconnect();
    window.removeEventListener("resize", measure);
  };
}, []);

  return (
    <section className="section" id="certifications">
      <div className="wrap">
        <div className="section-head">
          <span className="section-num">04</span>
          <h2>Certifications</h2>
        </div>

        <div className="cert-carousel">
          <div
            className="cert-stage"
            ref={stageRef}
            style={stageHeight ? { minHeight: stageHeight } : undefined}
          >
            {CERTS.map((c, i) => {
              const offset = getOffset(i, index, total);
              const isActive = offset === 0;
              let className = "cert-slide";
              if (offset === 0) className += " is-active";
              else if (offset === -1) className += " is-prev";
              else if (offset === 1) className += " is-next";
              else className += " is-hidden";

              return (
                <div
                  key={c.title}
                  ref={(el) => (slideRefs.current[i] = el)}
                  className={className}
                  onClick={() => !isActive && goTo(i)}
                >
                  <div className="cert-card">
                    <div className="cert-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <circle cx="12" cy="8" r="6" />
                        <path d="m9 13.5-1.5 7L12 18l4.5 2.5-1.5-7" />
                      </svg>
                    </div>
                    <div className="cert-body">
                      <h3 className="cert-title">{c.title}</h3>
                      <p className="cert-issuer">
                        {c.issuer} <span className="cert-date">• {c.date}</span>
                      </p>
                      <p className="cert-desc">{c.desc}</p>

                      {c.link && (
                        <a
                          href={c.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="cert-view-btn"
                          onClick={(e) => e.stopPropagation()}
                        >
                          View Certificate
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M7 17L17 7M7 7h10v10" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <button className="cert-nav cert-nav-left" onClick={prev} aria-label="Previous certificate">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button className="cert-nav cert-nav-right" onClick={next} aria-label="Next certificate">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        <div className="cert-controls">
          <button className="cert-nav cert-nav-mobile" onClick={prev} aria-label="Previous certificate">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <div className="cert-dots">
            {CERTS.map((_, i) => (
              <button
                key={i}
                className={`cert-dot ${i === index ? "active" : ""}`}
                onClick={() => goTo(i)}
                aria-label={`Go to certificate ${i + 1}`}
              />
            ))}
          </div>

          <button className="cert-nav cert-nav-mobile" onClick={next} aria-label="Next certificate">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}