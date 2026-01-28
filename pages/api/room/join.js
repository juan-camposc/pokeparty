import { joinRoom, getRoom } from "../../../lib/rooms";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const { code, playerId, playerName } = req.body;

  if (!code || !playerId || !playerName) {
    return res.status(400).json({ error: "Faltan datos" });
  }

  const room = joinRoom(code, { id: playerId, name: playerName });

  if (!room) return res.status(404).json({ error: "Sala no encontrada" });

  return res.status(200).json({ room });
}

