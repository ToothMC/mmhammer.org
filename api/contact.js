import { Resend } from 'resend';

const FROM = process.env.CONTACT_FROM_EMAIL || 'M+M Hammer <onboarding@resend.dev>';
const TO = process.env.CONTACT_TO_EMAIL || 'info@mmhammer.org';

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, topic, message, consent, website } = req.body || {};

  if (website) return res.status(200).json({ ok: true });

  if (!name || !email || !topic || !message || !consent) {
    return res.status(400).json({ error: 'Bitte alle Pflichtfelder ausfüllen.' });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Ungültige E-Mail-Adresse.' });
  }
  if (String(message).length > 5000) {
    return res.status(400).json({ error: 'Nachricht zu lang.' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('Missing RESEND_API_KEY env var');
    return res.status(500).json({ error: 'Mailversand nicht konfiguriert.' });
  }

  const resend = new Resend(apiKey);
  const subject = `[mmhammer.org] ${topic} – ${name}`;
  const text = `Neue Anfrage über mmhammer.org

Name:    ${name}
E-Mail:  ${email}
Telefon: ${phone || '-'}
Thema:   ${topic}

Nachricht:
${message}
`;
  const html = `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#2b2b2b;max-width:600px;">
    <h2 style="color:#064f5a;margin:0 0 16px;">Neue Anfrage über mmhammer.org</h2>
    <table style="border-collapse:collapse;width:100%;font-size:15px;">
      <tr><td style="padding:6px 12px 6px 0;color:#666;">Name</td><td style="padding:6px 0;"><strong>${esc(name)}</strong></td></tr>
      <tr><td style="padding:6px 12px 6px 0;color:#666;">E-Mail</td><td style="padding:6px 0;"><a href="mailto:${esc(email)}">${esc(email)}</a></td></tr>
      <tr><td style="padding:6px 12px 6px 0;color:#666;">Telefon</td><td style="padding:6px 0;">${esc(phone) || '-'}</td></tr>
      <tr><td style="padding:6px 12px 6px 0;color:#666;">Thema</td><td style="padding:6px 0;"><strong>${esc(topic)}</strong></td></tr>
    </table>
    <h3 style="color:#064f5a;margin:24px 0 8px;">Nachricht</h3>
    <div style="background:#f5f1ea;border-radius:8px;padding:16px;white-space:pre-wrap;line-height:1.6;">${esc(message)}</div>
  </div>`;

  try {
    const { data, error } = await resend.emails.send({
      from: FROM,
      to: [TO],
      replyTo: email,
      subject,
      text,
      html,
    });
    if (error) {
      console.error('Resend error:', error);
      return res.status(502).json({ error: 'E-Mail konnte nicht zugestellt werden.' });
    }
    return res.status(200).json({ ok: true, id: data?.id });
  } catch (err) {
    console.error('Send failed:', err);
    return res.status(500).json({ error: 'Interner Fehler beim Versenden.' });
  }
}
