import { useState } from "react";
import Button from "../components/Button";

// Ejemplo simple de ventajas de tipos
// Se puede ampliar con la tabla completa de Pokémon
const TYPE_ADVANTAGES = {
  fire: ["grass", "ice", "bug", "steel"],
  water: ["fire", "ground", "rock"],
  grass: ["water", "ground", "rock"],
  electric: ["water", "flying"],
  ground: ["fire", "electric", "poison", "rock", "steel"],
  rock: ["fire", "ice", "flying", "bug"],
  // añadir más según Pokédex
};

export default function TypeBattle({
  players,
  onSelect,
  disabled = false
}) {
  const [selections, setSelections] = useState({}); // {playerId: type}

  const handleSelect = (playerId, type) => {
    if (disabled || selections[playerId]) return;

    const newSelections = { ...selections, [playerId]: type };
    setSelections(newSelections);
    onSelect && onSelect(playerId, type);
  };

  const allSelected = Object.keys(selections).length === players.length;

  // Función simple para calcular quién gana
  const calculateWinner = () => {
    if (!allSelected) return null;

    const ids = Object.keys(selections);
    let winner = ids[0];

    for (let i = 1; i < ids.length; i++) {
      const current = ids[i];
      const currentType = selections[current];
      const winnerType = selections[winner];

      // Si el tipo actual vence al ganador, cambia
      if (TYPE_ADVANTAGES[currentType]?.includes(winnerType)) {
        winner = current;
      }
      // Si empate o no vence, winner sigue igual
    }

    return winner;
  };

  const winner = calculateWinner();

  return (
    <div style={styles.container}>
      <h3>Batalla de tipos</h3>
      <p>Elige un tipo para tu Pokémon:</p>

      {players.map((player) => (
        <div key={player.id} style={styles.player}>
          <span>{player.name}</span>
          {!selections[player.id] ? (
            <div style={styles.buttons}>
              {Object.keys(TYPE_ADVANTAGES).map((type) => (
                <Button
                  key={type}
                  onClick={() => handleSelect(player.id, type)}
                  disabled={disabled}
                  variant="primary"
                >
                  {type}
                </Button>
              ))}
            </div>
          ) : (
            <span style={styles.selected}>
              Tipo elegido: {selections[player.id]}
            </span>
          )}
        </div>
      ))}

      {allSelected && winner && (
        <p style={styles.winner}>
          Ganador: {players.find(p => p.id === winner).name} 🎉
        </p>
      )}
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    maxWidth: 500,
    margin: "0 auto",
  },
  player: {
    marginBottom: 16,
  },
  buttons: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 8,
    marginTop: 8,
  },
  selected: {
    display: "block",
    marginTop: 8,
    fontWeight: "bold",
  },
  winner: {
    marginTop: 20,
    fontWeight: "bold",
    fontSize: 16,
    color: "#2ecc71",
  },
};

