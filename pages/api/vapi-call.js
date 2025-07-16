export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests allowed' });
  }

  const VAPI_API_KEY = process.env.VAPI_API_KEY;
  const VAPI_ENDPOINT = 'https://api.vapi.ai/calls';

  if (!VAPI_API_KEY) {
    return res.status(500).json({ error: 'Missing API Key in env' });
  }

  try {
    const response = await fetch(VAPI_ENDPOINT, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${VAPI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    console.error('[Proxy Error]', err.message);
    res.status(500).json({ error: 'Proxy Error', details: err.message });
  }
}
