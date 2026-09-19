import Typewriter from "./Typewriter";

export default function Hero() {
  return (
    <header className="hero" id="home">
      <div className="wrap hero-flex">
        <div>
          <div className="hero-eyebrow">
            {"// "}
            <Typewriter
              words={[
                "MERN STACK DEVELOPER",
                "FULL-STACK ENGINEER",
                "BACKEND ARCHITECT",
                "UI/UX FOCUSED CODER",
                "CODE. BUILD. SHIP."

              ]}
            />
          </div>
          <h1>
            I build things that <em>live on the web.</em>
          </h1>
          <p>
            Full-stack developer who turns ideas into real, working products —
            clean code, thoughtful design.
          </p>
          <div className="hero-cta">
            <a href="#projects" className="btn btn-primary">
              View Projects
            </a>
            <a href="#contact" className="btn btn-ghost">
              Get in Touch
            </a>
            <a href="/Waleed_Akhtar_Resume.pdf" download className="btn btn-outline">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 3v12m0 0-4-4m4 4 4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
              </svg>
              Download Resume
            </a>
          </div>
        </div>

        <div className="hero-photo-outer">
          <svg className="hero-ring" viewBox="0 0 300 300">
            <circle className="ring-dots" cx="150" cy="150" r="142" />
            <circle className="ring-arc" cx="150" cy="150" r="142" />
          </svg>
          <div className="hero-photo-wrap">
            <img src="/images/profile.jpg" alt="Waleed" className="hero-photo" />
            <span className="hero-photo-scan"></span>
          </div>
        </div>
      </div>
    </header>
  );
}