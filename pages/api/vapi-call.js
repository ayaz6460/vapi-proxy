// For Next.js Pages Router (pages/api/vapi-call.js)
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const vapiResponse = await fetch("https://api.vapi.ai/calls", { // <-- Fixed endpoint!
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer f6e063e2-0c8c-48f7-9c90-10f427680db0`, // keep secret!
    },
    body: JSON.stringify(req.body),
  });

  const data = await vapiResponse.json();

  if (!vapiResponse.ok) {
    // Pass through the error and HTTP status to client
    return res.status(vapiResponse.status).json(data);
  }

  // Success!
  return res.status(200).json(data);
}
