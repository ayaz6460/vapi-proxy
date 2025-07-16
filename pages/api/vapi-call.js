// pages/api/vapi-call.js (or app/api/vapi-call/route.js if you're using App Router)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const vapiResponse = await fetch("https://api.vapi.ai/call", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer f6e063e2-0c8c-48f7-9c90-10f427680db0`, // 👈 ensure this line is present
    },
    body: JSON.stringify(req.body),
  });

  const data = await vapiResponse.json();

  if (!vapiResponse.ok) {
    return res.status(vapiResponse.status).json(data);
  }

  res.status(200).json(data);
}
