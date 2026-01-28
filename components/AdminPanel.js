export default function AdminPanel({
  isAdmin,
  players,
  onKick,
  onTransferAdmin,
  onStartGame,
  canStartGame
}) {
  if (!isAdmin) return null;

  return (
    <div style={styles.panel}>
      <h3>Panel de administrador</h3>

      <ul style={styles.list}>
        {players.map((player) => (
          <li key={player.id} style={styles.player}>
            <span>
              {player.name}
              {player.isAdmin && " (admin)"}
            </span>

            {!player.isAdmin && (
              <div style={styles.actions}>
                <button
                  onClick={() => onKick(player.id)}
                  style={styles.kick}
                >
                  Expulsar
                </button>

                <button
                  onClick={() => onTransferAdmin(player.id)}
                  style={styles.transfer}
                >
                  Hacer admin
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>

      <button
        onClick={onStartGame}
        disabled={!canStartGame}
        style={{
          ...styles.start,
          opacity: canStartGame ? 1 : 0.5,
        }}
      >
        Iniciar juego
      </button>

      {!canStartGame && (
        <p style={styles.warning}>
          Se necesitan al menos 2 jugadores
        </p>
      )}
    </div>
  );
}

const styles = {
  panel: {
    border: "1px solid #ccc",
    padding: 16,
    maxWidth: 400,
    marginTop: 20,
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  player: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  actions: {
    display: "flex",
    gap: 8,
  },
  kick: {
    background: "#ff4d4d",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
  transfer: {
    background: "#4d79ff",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
  start: {
    marginTop: 16,
    width: "100%",
    padding: 10,
    background: "#2ecc71",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
  warning: {
    marginTop: 8,
    fontSize: 12,
    color: "#888",
  },
  
};
