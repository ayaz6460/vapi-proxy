// pages/api/vapi-call.js
export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  res.status(200).json({ ok: true, message: "Proxy is working!" });
}
