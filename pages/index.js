import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import Button from "../components/Button";

export default function Home() {
  const router = useRouter();
  const [playerName, setPlayerName] = useState("");
  const [joinCode, setJoinCode] = useState("");

  // Crear sala
  const handleCreate = async () => {
    if (!playerName) return alert("Ingresa tu nombre");

    const playerId = Math.random().toString(36).substring(2, 9);

    const res = await fetch("/api/room/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ playerId, playerName }),
    });

    const data = await res.json();
    if (res.ok) {
      router.push(`/room/${data.code}`);
    } else {
      alert(data.error);
    }
  };

  // Unirse a sala
  const handleJoin = async () => {
    if (!playerName || !joinCode) return alert("Ingresa tu nombre y código");

    const playerId = Math.random().toString(36).substring(2, 9);

    const res = await fetch("/api/room/join", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: joinCode.toUpperCase(), playerId, playerName }),
    });

    const data = await res.json();
    if (res.ok) {
      router.push(`/room/${joinCode.toUpperCase()}`);
    } else {
      alert(data.error);
    }
  };

  return (
    <Layout title="POKEPARTY">
      <div style={styles.container}>
        <h1>POKEPARTY</h1>

        <input
          style={styles.input}
          placeholder="Tu nombre"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
        />

        <div style={styles.section}>
          <h2>Crear sala</h2>
          <Button onClick={handleCreate}>Crear sala nueva</Button>
        </div>

        <div style={styles.section}>
          <h2>Unirse a sala</h2>
          <input
            style={styles.input}
            placeholder="Código de sala"
            value={joinCode}
            onChange={(e) => setJoinCode(e.target.value)}
          />
          <Button onClick={handleJoin}>Unirse</Button>
        </div>
      </div>
    </Layout>
  );
}

const styles = {
  container: {
    maxWidth: 500,
    margin: "0 auto",
    textAlign: "center",
    padding: "40px 20px",
  },
  input: {
    width: "100%",
    padding: 8,
    marginBottom: 12,
    fontSize: 14,
  },
  section: {
    marginTop: 24,
    marginBottom: 24,
  },
};
