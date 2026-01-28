// Función para obtener datos de un Pokémon por número o nombre
export async function getPokemonData(identifier) {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${identifier}`);
    if (!res.ok) {
      throw new Error("Pokémon no encontrado");
    }

    const data = await res.json();

    // Extraer tipos
    const types = data.types.map(t => t.type.name);

    // Calcular poder total sumando stats
    const power = data.stats.reduce((acc, stat) => acc + stat.base_stat, 0);

    // Retornar solo la info que necesitamos
    return {
      number: data.id,
      name: data.name,
      image: data.sprites.other["official-artwork"].front_default,
      types,
      power,
    };
  } catch (error) {
    console.error("Error fetching Pokémon:", error);
    return null;
  }
}

// Función para obtener un Pokémon aleatorio
export async function getRandomPokemon(maxNumber = 1010) {
  const randomId = Math.floor(Math.random() * maxNumber) + 1;
  return await getPokemonData(randomId);
}

