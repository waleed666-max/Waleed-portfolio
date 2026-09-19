import { useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc
} from "firebase/firestore";
import { auth, db } from "../firebase";
import Starfield from "../components/Starfield";

const emptyForm = {
  title: "",
  description: "",
  tech: "",
  link: "",
  github: "",
  image: "",
  order: 0
};

export default function Admin() {
  const [user, setUser] = useState(undefined); // undefined = checking, null = logged out
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, "projects"), orderBy("order", "asc"));
    const unsub = onSnapshot(
      q,
      (snap) => setProjects(snap.docs.map((d) => ({ id: d.id, ...d.data() }))),
      (err) => console.error(err)
    );
    return () => unsub();
  }, [user]);

  async function handleLogin(e) {
    e.preventDefault();
    setLoginError("");
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
    } catch {
      setLoginError("Login failed — check your email and password.");
    }
  }

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
    setFormError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setFormError("");
    const data = {
      title: form.title.trim(),
      description: form.description.trim(),
      tech: form.tech.split(",").map((t) => t.trim()).filter(Boolean),
      link: form.link.trim(),
      github: form.github.trim(),
      image: form.image.trim(),
      order: Number(form.order) || 0
    };
    try {
      if (editingId) {
        await updateDoc(doc(db, "projects", editingId), data);
      } else {
        await addDoc(collection(db, "projects"), data);
      }
      resetForm();
    } catch (err) {
      console.error(err);
      setFormError("Something went wrong saving this project.");
    }
  }

  function startEdit(p) {
    setForm({
      title: p.title || "",
      description: p.description || "",
      tech: (p.tech || []).join(", "),
      link: p.link || "",
      github: p.github || "",
      image: p.image || "",
      order: p.order ?? 0
    });
    setEditingId(p.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleDelete(id) {
    if (!confirm("Delete this project? This can't be undone.")) return;
    try {
      await deleteDoc(doc(db, "projects", id));
    } catch (err) {
      console.error(err);
      alert("Couldn't delete this project.");
    }
  }

  if (user === undefined) {
    return (
      <>
        <Starfield />
        <div className="admin-center">
          <p className="state-msg">Checking login…</p>
        </div>
      </>
    );
  }

  if (!user) {
    return (
      <>
        <Starfield />
        <div className="admin-center">
          <div className="card-panel">
            <h1>Admin Login</h1>
            <p className="sub">Sign in to manage your portfolio projects.</p>
            <form onSubmit={handleLogin}>
              <div className="field">
                <label>Email</label>
                <input
                  type="email"
                  required
                  autoComplete="username"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
              </div>
              <div className="field">
                <label>Password</label>
                <input
                  type="password"
                  required
                  autoComplete="current-password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
              </div>
              <p className="form-error">{loginError}</p>
              <button type="submit" className="btn btn-primary btn-block">
                Login
              </button>
            </form>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Starfield />
      <div className="admin-dashboard">
        <div className="admin-topbar">
          <h1>Project Dashboard</h1>
          <button className="btn btn-ghost btn-small" onClick={() => signOut(auth)}>
            Logout
          </button>
        </div>

        <div className="admin-grid">
          <div className="card-panel" style={{ maxWidth: "none" }}>
            <h1 style={{ fontSize: "1.2rem" }}>
              {editingId ? "Edit Project" : "Add New Project"}
            </h1>
            <p className="sub">Fill this in and it appears on your site instantly.</p>
            <form onSubmit={handleSubmit}>
              <div className="field">
                <label>Project Title</label>
                <input
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </div>
              <div className="field">
                <label>Short Description</label>
                <textarea
                  required
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
              </div>
              <div className="field">
                <label>Tech Stack (comma separated)</label>
                <input
                  placeholder="React, Node.js, MongoDB"
                  value={form.tech}
                  onChange={(e) => setForm({ ...form, tech: e.target.value })}
                />
              </div>
              <div className="field">
                <label>Live Demo Link</label>
                <input
                  placeholder="https://..."
                  value={form.link}
                  onChange={(e) => setForm({ ...form, link: e.target.value })}
                />
              </div>
              <div className="field">
                <label>GitHub Link</label>
                <input
                  placeholder="https://github.com/..."
                  value={form.github}
                  onChange={(e) => setForm({ ...form, github: e.target.value })}
                />
              </div>
              <div className="field">
                <label>Screenshot Image URL</label>
                <input
                  placeholder="/images/yourshot.png"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                />
              </div>
              <div className="field">
                <label>Display Order (0 = first)</label>
                <input
                  type="number"
                  value={form.order}
                  onChange={(e) => setForm({ ...form, order: e.target.value })}
                />
              </div>
              <p className="form-error">{formError}</p>
              <button type="submit" className="btn btn-primary btn-block">
                {editingId ? "Save Changes" : "Add Project"}
              </button>
              {editingId && (
                <button
                  type="button"
                  className="btn btn-ghost btn-block"
                  style={{ marginTop: 10 }}
                  onClick={resetForm}
                >
                  Cancel Edit
                </button>
              )}
            </form>
          </div>

          <div className="admin-list">
            {projects.length === 0 && (
              <p className="state-msg">No projects yet — add your first one.</p>
            )}
            {projects.map((p) => (
              <div className="admin-item" key={p.id}>
                <div>
                  <div className="admin-item-title">{p.title || "Untitled"}</div>
                  <div className="admin-item-desc">{p.description}</div>
                </div>
                <div className="admin-item-actions">
                  <button className="btn btn-ghost btn-small" onClick={() => startEdit(p)}>
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-small"
                    onClick={() => handleDelete(p.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
