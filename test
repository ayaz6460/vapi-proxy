import Vapi from 'vapi';

const vapi = new Vapi({ apiKey: process.env.VAPI_API_KEY });

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  try {
    // destructure and use req.body as required
    // call vapi.calls.create(...) with your payload
    res.status(200).json({ success: true, details: 'Call initiated!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
