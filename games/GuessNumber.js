import { useState } from "react";
import Button from "../components/Button";

export default function GuessNumber({
  pokemon,
  onCorrect,
  disabled = false
}) {
  const [answer, setAnswer] = useState("");
  const [finished, setFinished] = useState(false);

  if (!pokemon) {
    return <p>Cargando Pokémon...</p>;
  }

  const checkAnswer = () => {
    if (finished) return;

    const numberAnswer = parseInt(answer, 10);

    if (numberAnswer === pokemon.number) {
      setFinished(true);
      onCorrect && onCorrect();
    }
  };

  return (
    <div style={styles.container}>
      <h3>Adivina el número del Pokémon</h3>

      <img
        src={pokemon.image}
        alt={pokemon.name}
        style={styles.image}
      />

      <p style={styles.name}>
        {pokemon.name}
      </p>

      <div style={styles.types}>
        {pokemon.types.map((type) => (
          <span key={type} style={styles.type}>
            {type}
          </span>
        ))}
      </div>

      <input
        type="number"
        placeholder="Número Pokédex"
        value={answer}
        disabled={disabled || finished}
        onChange={(e) => setAnswer(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && checkAnswer()}
        style={styles.input}
      />

      <Button
        onClick={checkAnswer}
        disabled={disabled || finished || !answer}
      >
        Confirmar
      </Button>

      {finished && (
        <p style={styles.success}>
          ¡Correcto! 🎉
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
  image: {
    width: 200,
    height: 200,
    objectFit: "contain",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "capitalize",
    marginBottom: 4,
  },
  types: {
    display: "flex",
    justifyContent: "center",
    gap: 8,
    marginBottom: 12,
  },
  type: {
    padding: "4px 8px",
    borderRadius: 4,
    backgroundColor: "#eee",
    fontSize: 12,
    textTransform: "capitalize",
  },
  input: {
    width: "100%",
    padding: 8,
    marginBottom: 12,
    fontSize: 14,
  },
  success: {
    marginTop: 12,
    color: "#2ecc71",
    fontWeight: "bold",
  },
};

