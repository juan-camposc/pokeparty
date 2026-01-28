import { getPokemonData, getRandomPokemon } from "../../lib/pokemon";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { id } = req.query;

    let pokemon;

    if (id) {
      // Buscar Pokémon por id o nombre
      pokemon = await getPokemonData(id);
    } else {
      // Si no se pasa id, devuelve uno aleatorio
      pokemon = await getRandomPokemon();
    }

    if (!pokemon) {
      return res.status(404).json({ error: "Pokémon no encontrado" });
    }

    return res.status(200).json({ pokemon });
  } catch (error) {
    console.error("Error en API Pokémon:", error);
    return res.status(500).json({ error: "Error interno" });
  }
}

