export const pokemonListLoader = async (offset: number, limit: number) => {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
  );

  if (!res.ok) {
    console.error(`Failed to fetch Pokémon list: ${res.statusText}`);
    throw Error("Could not fetch Pokémon list");
  }

  const data = await res.json();

  return data.results; // Return the results array
};
