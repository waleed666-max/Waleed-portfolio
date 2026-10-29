import dns from "node:dns/promises";

const BLOCKED = new Set([
  "mailinator.com", "10minutemail.com", "guerrillamail.com",
  "tempmail.com", "yopmail.com", "trashmail.com", "sharklasers.com",
]);

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed." });
    }

    const { name, email, message } = req.body || {};

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Please fill all fields." });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: "Email is not valid. Please check it." });
    }

    const domain = email.split("@")[1].toLowerCase();

    if (BLOCKED.has(domain)) {
      return res.status(400).json({ error: "Temporary emails are not allowed. Use your real email." });
    }

    try {
      const mx = await dns.resolveMx(domain);
      if (!mx || mx.length === 0) throw new Error("no mx");
    } catch {
      return res.status(400).json({ error: "This email doesn't exist. Please enter your real email." });
    }

    const r = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: process.env.WEB3FORMS_KEY,
        name,
        email,
        message,
      }),
    });
    const data = await r.json();

    if (data.success) {
      return res.status(200).json({ success: true });
    }
    return res.status(500).json({ error: "Could not send message. Please try again later." });
  } catch (err) {
    return res.status(500).json({ error: "Server error. Please try again later." });
  }
}