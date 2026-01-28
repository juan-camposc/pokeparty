import { useState } from "react";
import Button from "./Button";

const MINI_GAMES = [
  { id: "number", name: "Número del Pokémon" },
  { id: "shadow", name: "Sombra del Pokémon" },
  { id: "guessName", name: "Adivina el nombre" },
  { id: "guessNumber", name: "Adivina el número" },
  { id: "typeBattle", name: "Batalla de tipos" },
];

export default function MiniGameVote({ onVote }) {
  const [selected, setSelected] = useState(null);

  return (
    <div style={styles.container}>
      <h3>Vota el minijuego</h3>

      <div style={styles.grid}>
        {MINI_GAMES.map((game) => (
          <Button
            key={game.id}
            variant={selected === game.id ? "success" : "secondary"}
            onClick={() => {
              setSelected(game.id);
              onVote(game.id);
            }}
          >
            {game.name}
          </Button>
        ))}
      </div>

      {selected && (
        <p style={styles.selected}>
          Has votado: <strong>{MINI_GAMES.find(g => g.id === selected).name}</strong>
        </p>
      )}
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    maxWidth: 500,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 12,
    marginTop: 16,
  },
  selected: {
    marginTop: 16,
    fontSize: 14,
    color: "#555",
  },
};

