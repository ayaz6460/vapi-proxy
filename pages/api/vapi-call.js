export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  // Debug log
  console.log("Proxy: Incoming payload", req.body);

  // Make the Vapi call
  const vapiResponse = await fetch("https://api.vapi.ai/calls", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer f6e063e2-0c8c-48f7-9c90-10f427680db0`,
    },
    body: JSON.stringify(req.body),
  });

  console.log("Proxy: Vapi status", vapiResponse.status);

  const data = await vapiResponse.json();
  console.log("Proxy: Vapi response", data);

  if (!vapiResponse.ok) {
    return res.status(vapiResponse.status).json(data);
  }

  return res.status(200).json(data);
}
