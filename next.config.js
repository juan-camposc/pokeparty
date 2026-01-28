/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "raw.githubusercontent.com", // PokéAPI imágenes oficiales
      "assets.pokemon.com"          // Otra fuente de imágenes de Pokémon
    ],
  },
  env: {
    // Puedes agregar variables de entorno si las necesitas
    // EJ: API_KEY: process.env.API_KEY
  },
};

module.exports = nextConfig;

