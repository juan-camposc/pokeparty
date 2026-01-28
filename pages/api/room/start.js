import { startGame, getRoom } from "../../../lib/rooms";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const { code, playerId } = req.body;

  if (!code || !playerId) {
    return res.status(400).json({ error: "Faltan datos" });
  }

  const room = getRoom(code);

  if (!room) return res.status(404).json({ error: "Sala no encontrada" });

  if (room.admin !== playerId) {
    return res.status(403).json({ error: "Solo el admin puede iniciar la partida" });
  }

  const startedRoom = startGame(code);

  if (!startedRoom) {
    return res.status(400).json({ error: "Se necesitan al menos 2 jugadores" });
  }

  return res.status(200).json({ room: startedRoom });
}

