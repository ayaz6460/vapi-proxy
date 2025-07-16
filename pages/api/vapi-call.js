// /api/vapi-call.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests are allowed' });
  }

  const VAPI_API_KEY = 'f6e063e2-0c8c-48f7-9c90-10f427680db0'; // ✅ Your Vapi private API key
  const VAPI_ENDPOINT = 'https://api.vapi.ai/call';

  const { customer, metadata } = req.body;

  const payload = {
    assistantId: '7b18ca6f-1aab-466c-a329-c13fc555b1de',     // ✅ Replace with your assistantId
    phoneNumberId: '4eb29124-3de2-4fd0-b280-324578fb4618',   // ✅ Replace with your phoneNumberId
    customer,
    metadata
  };

  try {
    const vapiResponse = await fetch(VAPI_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${VAPI_API_KEY}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await vapiResponse.json();
    res.status(vapiResponse.status).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Proxy error', message: error.message });
  }
}
