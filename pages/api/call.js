// /pages/api/vapi-call.js
import axios from 'axios';

export default async function handler(req, res) {
  // 1. We only accept POST requests from your Google Script
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end('Method Not Allowed');
  }

  // 2. Check for the Vapi API Key in environment variables
  const vapiKey = process.env.VAPI_API_KEY;
  if (!vapiKey) {
    console.error('VAPI_API_KEY is not set in environment variables.');
    return res.status(500).json({ error: 'Server configuration error.' });
  }

  try {
    // 3. The body of the request is the payload from your Google Script
    const payloadFromGoogleScript = req.body;

    // Log the incoming payload for debugging
    console.log('Received payload from Google Script:', JSON.stringify(payloadFromGoogleScript, null, 2));

    // 4. Forward the exact payload to Vapi's API, adding your secret key
    const vapiApiUrl = 'https://api.vapi.ai/call/phone';
    const vapiResponse = await axios.post(vapiApiUrl, payloadFromGoogleScript, {
      headers: {
        'Authorization': `Bearer ${vapiKey}`,
        'Content-Type': 'application/json',
      },
    });

    // 5. Send Vapi's successful response back to your Google Script
    console.log('Successfully forwarded to Vapi. Response:', vapiResponse.data);
    res.status(200).json(vapiResponse.data);

  } catch (error) {
    // 6. If anything goes wrong, log the detailed error and send a failure response
    console.error('Error forwarding request to Vapi:');
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Data:', error.response.data);
      console.error('Status:', error.response.status);
      console.error('Headers:', error.response.headers);
      // Forward Vapi's error back to the Google Script
      return res.status(error.response.status).json(error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Request:', error.request);
      return res.status(500).json({ error: 'No response received from Vapi.' });
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error Message:', error.message);
      return res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
  }
}
