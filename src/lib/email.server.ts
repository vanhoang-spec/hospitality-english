// Mail out of the app, through Resend — the same service, and the same
// verified domain, the Embassy CRM already sends from.
//
// Server-only: RESEND_API_KEY lives on Vercel. EMAIL_FROM may override
// the sender. Without a key nothing is sent and the caller gets false,
// never an exception — a reset request must not fail in a way that tells
// a stranger whether a phone number has an account.

const DEFAULT_FROM = "Embassy Hospitality <info@embassy.edu.vn>";

export async function sendEmail(message: {
  to: string;
  subject: string;
  html: string;
  text: string;
}): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.error("email: RESEND_API_KEY is not set, nothing sent");
    return false;
  }
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.EMAIL_FROM || DEFAULT_FROM,
        to: [message.to],
        subject: message.subject,
        html: message.html,
        text: message.text,
      }),
    });
    if (!res.ok) {
      console.error(`email: Resend refused (${res.status})`, (await res.text()).slice(0, 300));
      return false;
    }
    return true;
  } catch (e) {
    console.error("email: Resend unreachable", e);
    return false;
  }
}

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
