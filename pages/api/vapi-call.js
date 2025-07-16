// File: /api/vapi-call.js

export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests are allowed' });
  }

  const VAPI_API_KEY = 'f6e063e2-0c8c-48f7-9c90-10f427680db0'; // ✅ Use .env in production
  const VAPI_URL = 'https://api.vapi.ai/call';

  try {
    const response = await fetch(VAPI_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${VAPI_API_KEY}`, // ✅ MUST include Bearer
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error('❌ Proxy Error:', error.message);
    res.status(500).json({ error: 'Proxy Error', message: error.message });
  }
}
