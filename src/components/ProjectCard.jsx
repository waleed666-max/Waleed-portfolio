export default function ProjectCard({ project }) {
  const { title, description, tech = [], link, github, image } = project;

  return (
    <article className="project-card">
      {image ? (
        <img className="project-thumb" src={image} alt={`${title} screenshot`} />
      ) : (
        <div className="project-thumb-fallback">{(title || "?").charAt(0)}</div>
      )}
      <div className="project-body">
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="tech-stack-block">
  <span className="tech-stack-label">Tech Stack</span>
  <div className="tech-tags">
    {tech.map((t) => (
      <span className="tech-tag" key={t}>
        {t}
      </span>
    ))}
  </div>
</div>
        <div className="project-links">
  {link && (
    <a href={link} target="_blank" rel="noopener noreferrer" className="live-demo-link">
      <span className="live-dot" />
      Live Demo →
    </a>
  )}
          {github && (
            <a href={github} target="_blank" rel="noopener noreferrer">
              GitHub →
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
