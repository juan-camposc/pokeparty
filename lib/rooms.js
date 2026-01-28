// Almacén en memoria de todas las salas
const rooms = {};

/**
 * Crear una sala nueva
 * Devuelve el código de la sala
 */
export function createRoom(adminId = null) {
  const code = Math.random().toString(36).substring(2, 8).toUpperCase();

  rooms[code] = {
    players: [],       // { id, name, isAdmin }
    admin: adminId,    // id del admin
    votes: {},         // votos de minijuegos { playerId: gameId }
    gameState: null,   // objeto con minijuego actual
    started: false,    // true si el juego ha empezado
  };

  return code;
}

/**
 * Obtener una sala por código
 */
export function getRoom(code) {
  return rooms[code];
}

/**
 * Unirse a una sala
 */
export function joinRoom(code, player) {
  const room = rooms[code];
  if (!room) return null;

  // Evitar duplicados
  if (!room.players.find(p => p.id === player.id)) {
    room.players.push(player);
  }

  // Si no hay admin, el primer jugador es admin
  if (!room.admin) {
    room.admin = player.id;
    player.isAdmin = true;
  } else {
    player.isAdmin = player.id === room.admin;
  }

  return room;
}

/**
 * Expulsar jugador
 */
export function kickPlayer(code, playerId) {
  const room = rooms[code];
  if (!room) return null;

  room.players = room.players.filter(p => p.id !== playerId);

  // Si era admin, transferir admin al primero que quede
  if (room.admin === playerId && room.players.length > 0) {
    room.admin = room.players[0].id;
    room.players[0].isAdmin = true;
  }

  return room;
}

/**
 * Transferir admin
 */
export function transferAdmin(code, newAdminId) {
  const room = rooms[code];
  if (!room) return null;

  room.players.forEach(p => p.isAdmin = p.id === newAdminId);
  room.admin = newAdminId;

  return room;
}

/**
 * Iniciar juego
 */
export function startGame(code) {
  const room = rooms[code];
  if (!room) return null;

  if (room.players.length < 2) return false;

  room.started = true;
  room.votes = {};
  room.gameState = null;

  return room;
}

/**
 * Votar un minijuego
 */
export function voteMiniGame(code, playerId, gameId) {
  const room = rooms[code];
  if (!room) return null;

  room.votes[playerId] = gameId;
  return room;
}

/**
 * Obtener minijuego ganador por votos
 */
export function getWinningMiniGame(code) {
  const room = rooms[code];
  if (!room) return null;

  const counts = {};
  Object.values(room.votes).forEach(gameId => {
    counts[gameId] = (counts[gameId] || 0) + 1;
  });

  let winner = null;
  let maxVotes = 0;

  for (const [gameId, voteCount] of Object.entries(counts)) {
    if (voteCount > maxVotes) {
      maxVotes = voteCount;
      winner = gameId;
    }
  }

  return winner;
}

