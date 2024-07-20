import "./ability.css";
import { useLoaderData, LoaderFunctionArgs } from "react-router-dom";

export default function Ability() {
  const ability = useLoaderData() as any;
  console.log("loaded pokemon data:", ability); // Log the loaded data

  if (!ability) {
    return <div>Loading...</div>;
  }

  return (
    <div className="ability-details-p">
      <h1>{ability.name}</h1>
      <p>
        {
          ability.effect_entries.find(
            (entry: any) => entry.language.name === "en"
          )?.effect
        }
      </p>
      <p>Generation: {ability.generation.name}</p>
    </div>
  );
}

//loader function

export const abilityLoader = async ({ params }: LoaderFunctionArgs) => {
  const { id } = params as { id: string };

  console.log("Fetching data for ability ID:", id); // Log the parameter used for fetching

  const res = await fetch(`https://pokeapi.co/api/v2/ability/${id}`);

  //check for errors
  if (!res.ok) {
    console.error(
      `Failed to fetch data for ability ID ${id}: ${res.statusText}`
    );
    throw Error("Could not find that ability");
  }

  const data = await res.json();
  console.log("Fetched Ability data:", data); // Log the fetched data
  return data;
};
