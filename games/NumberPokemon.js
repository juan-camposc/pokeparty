import { useState } from "react";
import Button from "../components/Button";

export default function NumberPokemon({
  maxNumber = 1010,
  onSelect,
  disabled = false
}) {
  const [number, setNumber] = useState("");
  const [locked, setLocked] = useState(false);

  const confirmSelection = () => {
    if (locked || !number) return;
    setLocked(true);
    onSelect && onSelect(Number(number));
  };

  return (
    <div style={styles.container}>
      <h3>Elige el número de un Pokémon</h3>

      <p style={styles.info}>
        Elige un número de la Pokédex.
        Nadie verá tu elección hasta que termine el tiempo.
      </p>

      <input
        type="number"
        min={1}
        max={maxNumber}
        value={number}
        disabled={disabled || locked}
        onChange={(e) => setNumber(e.target.value)}
        style={styles.input}
        placeholder={`1 - ${maxNumber}`}
      />

      <Button
        onClick={confirmSelection}
        disabled={disabled || locked || !number}
      >
        Confirmar
      </Button>

      {locked && (
        <p style={styles.locked}>
          Número guardado ✔️
        </p>
      )}
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    maxWidth: 400,
    margin: "0 auto",
  },
  info: {
    fontSize: 13,
    color: "#555",
    marginBottom: 12,
  },
  input: {
    width: "100%",
    padding: 8,
    fontSize: 14,
    marginBottom: 12,
  },
  locked: {
    marginTop: 12,
    color: "#2ecc71",
    fontWeight: "bold",
  },
};

