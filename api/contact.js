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

    const { email } = req.body || {};

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
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

    return res.status(200).json({ valid: true });
  } catch (err) {
    return res.status(500).json({ error: "Server error. Please try again later." });
  }
}