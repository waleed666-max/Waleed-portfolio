import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error

  useEffect(() => {
    try {
      const q = query(collection(db, "projects"), orderBy("order", "asc"));
      const unsub = onSnapshot(
        q,
        (snapshot) => {
          setProjects(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
          setStatus("ready");
        },
        (err) => {
          console.error(err);
          setStatus("error");
        }
      );
      return () => unsub();
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }, []);

  return (
    <section className="section" id="projects">
      <div className="wrap">
        <div className="section-head">
          <span className="section-num">02</span>
          <h2>Projects</h2>
        </div>

        {status === "loading" && <p className="state-msg">Loading projects…</p>}
        {status === "error" && (
          <p className="state-msg">Couldn't load projects right now.</p>
        )}
        {status === "ready" && projects.length === 0 && (
          <p className="state-msg">No projects added yet — check back soon.</p>
        )}

        {status === "ready" && projects.length > 0 && (
          <div className="projects-grid">
            {projects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
