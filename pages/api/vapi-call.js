import Vapi from 'vapi';

const vapi = new Vapi({
  apiKey: process.env.VAPI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // Safely parse JSON body (in Next.js API routes this is usually done for you)
    const {
      assistantId,
      phoneNumberId,
      customer,
      metadata
    } = req.body;

    console.log('Incoming payload:', req.body);

    // Create call using Vapi SDK
    const call = await vapi.calls.create({
      assistant: { assistantId },
      phoneNumberId,
      customer,
      metadata
    });

    console.log('Call successfully created:', call);

    return res.status(200).json(call);
  } catch (error) {
    // Log entire error object for debugging
    console.error('Error from Vapi SDK:', error);
    return res.status(500).json({
      error: error.message || 'Unknown error',
      details: error
    });
  }
}

