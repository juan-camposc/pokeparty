import Head from "next/head";

export default function Layout({ children, title = "POKEPARTY" }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="POKEPARTY - Juego de minijuegos Pokémon" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div style={styles.container}>
        <header style={styles.header}>
          <h1 style={styles.logo}>POKEPARTY</h1>
        </header>

        <main style={styles.main}>
          {children}
        </main>

        <footer style={styles.footer}>
          <span>© POKEPARTY</span>
        </footer>
      </div>
    </>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#f6f6f6",
  },
  header: {
    padding: "16px 24px",
    borderBottom: "1px solid #ddd",
    backgroundColor: "#ffffff",
    textAlign: "center",
  },
  logo: {
    margin: 0,
    fontSize: 24,
    letterSpacing: 1,
  },
  main: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    padding: 24,
  },
  footer: {
    padding: 12,
    textAlign: "center",
    fontSize: 12,
    color: "#777",
  },
};

