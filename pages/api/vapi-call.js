import Vapi from 'vapi';

const vapi = new Vapi({
  apiKey: process.env.VAPI_API_KEY, // Even better: set your API key as an env var!
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const {
      assistantId,
      phoneNumberId,
      customer,
      metadata
    } = req.body;

    // match your Apps Script payload structure
    const call = await vapi.calls.create({
      assistant: { assistantId },
      phoneNumberId,
      customer,
      metadata // pass your metadata if needed
    });

    res.status(200).json(call);
  } catch (error) {
    // Log full error for debugging
    console.error('Vapi SDK error:', error);
    res.status(500).json({ error: error.message || 'Unknown error', details: error });
  }
}
