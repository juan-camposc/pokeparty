import { useState } from "react";
import Button from "../components/Button";

export default function ShadowPokemon({
  pokemon,
  onCorrect,
  disabled = false
}) {
  const [answer, setAnswer] = useState("");
  const [finished, setFinished] = useState(false);

  if (!pokemon) {
    return <p>Cargando Pokémon...</p>;
  }

  // Generar imagen en sombra usando CSS
  const shadowStyle = {
    filter: "brightness(0) saturate(100%)",
    width: 200,
    height: 200,
    objectFit: "contain",
    marginBottom: 12,
  };

  const checkAnswer = () => {
    if (finished) return;

    const normalizedAnswer = answer.trim().toLowerCase();
    const normalizedName = pokemon.name.toLowerCase();

    if (normalizedAnswer === normalizedName) {
      setFinished(true);
      onCorrect && onCorrect();
    }
  };

  return (
    <div style={styles.container}>
      <h3>Adivina el Pokémon por su silueta</h3>

      <img
        src={pokemon.image}
        alt="pokemon sombra"
        style={shadowStyle}
      />

      <input
        type="text"
        placeholder="Escribe el nombre..."
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

