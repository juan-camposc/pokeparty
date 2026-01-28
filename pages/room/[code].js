import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import AdminPanel from "../../components/AdminPanel";
import PlayerList from "../../components/PlayerList";
import MiniGameVote from "../../components/MiniGameVote";
import Timer from "../../components/Timer";
import Button from "../../components/Button";

import NumberPokemon from "../../games/NumberPokemon";
import ShadowPokemon from "../../games/ShadowPokemon";
import GuessName from "../../games/GuessName";
import GuessNumber from "../../games/GuessNumber";
import TypeBattle from "../../games/TypeBattle";

export default function RoomPage() {
  const router = useRouter();
  const { code } = router.query;

  const [playerId] = useState(() => Math.random().toString(36).substring(2, 9));
  const [playerName, setPlayerName] = useState("");
  const [room, setRoom] = useState(null);
  const [votedGame, setVotedGame] = useState(null);
  const [currentGame, setCurrentGame] = useState(null);
  const [timerKey, setTimerKey] = useState(0);

  // Unirse a la sala
  const joinRoom = async () => {
    if (!playerName) return alert("Ingresa tu nombre");
    const res = await fetch("/api/room/join", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, playerId, playerName }),
    });
    const data = await res.json();
    if (res.ok) setRoom(data.room);
    else alert(data.error);
  };

  // Iniciar juego (solo admin)
  const startGame = async () => {
    const res = await fetch("/api/room/start", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, playerId }),
    });
    const data = await res.json();
    if (res.ok) setRoom(data.room);
    else alert(data.error);
  };

  // Cuando vota minijuego
  const handleVote = (gameId) => {
    setVotedGame(gameId);
    // TODO: enviar voto a backend / sockets
  };

  // Cuando termina votación
  const handleVoteEnd = () => {
    // Aquí elegimos el juego más votado (simulado)
    const winnerGame = votedGame || "NumberPokemon";
    setCurrentGame(winnerGame);
    setVotedGame(null);
    setTimerKey(prev => prev + 1); // reiniciar timer
  };

  // Obtener componente de minijuego activo
  const renderGame = () => {
    switch (currentGame) {
      case "NumberPokemon":
        return <NumberPokemon onSelect={(n) => console.log("Número elegido:", n)} />;
      case "ShadowPokemon":
        return <ShadowPokemon pokemon={{ name: "pikachu", image: "/pikachu.png", types: ["electric"] }} onCorrect={() => console.log("Acertó")} />;
      case "GuessName":
        return <GuessName pokemon={{ name: "pikachu", image: "/pikachu.png", types: ["electric"] }} onCorrect={() => console.log("Acertó")} />;
      case "GuessNumber":
        return <GuessNumber pokemon={{ name: "pikachu", number: 25, image: "/pikachu.png", types: ["electric"] }} onCorrect={() => console.log("Acertó")} />;
      case "TypeBattle":
        return <TypeBattle players={room.players} onSelect={(playerId, type) => console.log(playerId, type)} />;
      default:
        return <p>Esperando al inicio del juego...</p>;
    }
  };

  // Input nombre inicial
  if (!playerName) {
    return (
      <Layout>
        <div style={{ textAlign: "center" }}>
          <h2>Ingresa tu nombre</h2>
          <input value={playerName} onChange={e => setPlayerName(e.target.value)} placeholder="Tu nombre" style={{ padding: 8, fontSize: 14 }} />
          <Button onClick={joinRoom}>Entrar a la sala</Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={`Sala ${code}`}>
      <div style={{ display: "flex", gap: 24 }}>
        {/* Panel lateral */}
        <div style={{ flex: 1 }}>
          {room?.admin === playerId && <AdminPanel players={room.players} startGame={startGame} />}
          <PlayerList players={room?.players} />
          {room?.started && (
            <Timer key={timerKey} duration={30} onEnd={handleVoteEnd} />
          )}
        </div>

        {/* Zona de juego */}
        <div style={{ flex: 2 }}>
          {!currentGame && room?.started ? (
            <MiniGameVote onVote={handleVote} />
          ) : (
            renderGame()
          )}
        </div>
      </div>
    </Layout>
  );
}

