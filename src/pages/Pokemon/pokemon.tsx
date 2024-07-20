import "./pokemon.css";
import { Link, useLoaderData, LoaderFunctionArgs } from "react-router-dom";
export default function Pokemon() {
  const pokemon = useLoaderData() as any;
  console.log("loaded pokemon data:", pokemon); // Log the loaded data

  if (!pokemon) {
    return <div>Loading...</div>;
  }

  return (
    <div className="pokemon-details-p">
      <h1 className="name-p">{pokemon.name}</h1>
      <div className="details-wrap">
        <img
          className="pokemon-img-p"
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
        />
        <p>Height: {pokemon.height}</p>
        <p>Weight: {pokemon.weight}</p>
        <p>Base experience: {pokemon.base_experience}</p>
        <div className="details">
          <h3>Abilities:</h3>
          <ul>
            {pokemon.abilities.map((ability: any, index: number) => (
              <li key={index}>
                <Link
                  to={`/ability/${
                    ability.ability.url.split("/").slice(-2, -1)[0]
                  }`}
                >
                  {ability.ability.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

//loader function

export const pokemonLoader = async ({ params }: LoaderFunctionArgs) => {
  const { name } = params as { name: string };

  console.log("Fetching data for:", name); // Log the parameter used for fetching
  // Loading = true
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);

  //check for errors
  if (!res.ok) {
    console.error(`Failed to fetch data for ${name}: ${res.statusText}`);
    throw Error("Could not find that Pokemon");
  }

  const data = await res.json();
  console.log("Fetched Pokémon data:", data); // Log the fetched data
  // Loading = false
  return data;
};
