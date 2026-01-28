import { createRoom, joinRoom } from "../../../lib/rooms";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const { playerId, playerName } = req.body;

  if (!playerId || !playerName) {
    return res.status(400).json({ error: "Faltan datos del jugador" });
  }

  const code = createRoom(playerId);

  joinRoom(code, { id: playerId, name: playerName });

  return res.status(200).json({ code });
}

