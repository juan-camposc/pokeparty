// Mapa de tipos y contra qué tipos son efectivos
export const TYPE_ADVANTAGES = {
  normal: [],
  fire: ["grass", "ice", "bug", "steel"],
  water: ["fire", "ground", "rock"],
  electric: ["water", "flying"],
  grass: ["water", "ground", "rock"],
  ice: ["grass", "ground", "flying", "dragon"],
  fighting: ["normal", "ice", "rock", "dark", "steel"],
  poison: ["grass", "fairy"],
  ground: ["fire", "electric", "poison", "rock", "steel"],
  flying: ["grass", "fighting", "bug"],
  psychic: ["fighting", "poison"],
  bug: ["grass", "psychic", "dark"],
  rock: ["fire", "ice", "flying", "bug"],
  ghost: ["psychic", "ghost"],
  dragon: ["dragon"],
  dark: ["psychic", "ghost"],
  steel: ["ice", "rock", "fairy"],
  fairy: ["fighting", "dragon", "dark"],
};

// Función para saber si un tipo vence a otro
export function doesTypeWin(attacker, defender) {
  return TYPE_ADVANTAGES[attacker]?.includes(defender) || false;
}

// Función para calcular vencedor entre varios jugadores
// players: [{id, type}]
export function calculateTypeBattleWinner(players) {
  if (players.length === 0) return null;
  if (players.length === 1) return players[0].id;

  let winner = players[0];

  for (let i = 1; i < players.length; i++) {
    const challenger = players[i];

    if (doesTypeWin(challenger.type, winner.type)) {
      winner = challenger;
    }
    // empate o no vence → winner sigue igual
  }

  return winner.id;
}

