// api/vapi-call.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests are allowed' });
  }

  const VAPI_API_KEY = 'f6e063e2-0c8c-48f7-9c90-10f427680db0'; // Replace with yours
  const VAPI_ENDPOINT = 'https://api.vapi.ai/calls'; // ✅ Must be exact

  try {
    const vapiResponse = await fetch(VAPI_ENDPOINT, {
      method: 'POST',
    headers: {
  'Authorization': `Bearer ${VAPI_API_KEY}`,
  'Content-Type': 'application/json',
},

      body: JSON.stringify(req.body),
    });

    const data = await vapiResponse.json();
    res.status(vapiResponse.status).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Proxy error', message: error.message });
  }
}
