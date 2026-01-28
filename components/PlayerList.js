export default function PlayerList({ players }) {
  if (!players || players.length === 0) {
    return <p>No hay jugadores en la sala</p>;
  }

  return (
    <div style={styles.container}>
      <h3>Jugadores</h3>

      <ul style={styles.list}>
        {players.map((player) => (
          <li key={player.id} style={styles.player}>
            <span style={styles.name}>
              {player.name}
              {player.isAdmin && " 👑"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    border: "1px solid #ccc",
    padding: 12,
    minWidth: 200,
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  player: {
    padding: "6px 0",
    borderBottom: "1px solid #eee",
  },
  name: {
    fontSize: 14,
  },
};

