import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [pokemonName, setPokemonName] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (pokemonName) {
      navigate(`/pokemon/${pokemonName.toLowerCase()}`);
    }
  };

  return (
    <div className="home">
      <h2> Search pokemon </h2>
      <input
        type="text"
        className="search-bar"
        placeholder="Name of the pokemon"
        value={pokemonName}
        onChange={e => setPokemonName(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus
        itaque recusandae cum id aspernatur mollitia expedita praesentium. Ipsum
        dolorum eos, commodi autem qui nulla est tenetur dicta optio, saepe
        neque.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus
        itaque recusandae cum id aspernatur mollitia expedita praesentium. Ipsum
        dolorum eos, commodi autem qui nulla est tenetur dicta optio, saepe
        neque.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus
        itaque recusandae cum id aspernatur mollitia expedita praesentium. Ipsum
        dolorum eos, commodi autem qui nulla est tenetur dicta optio, saepe
        neque.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus
        itaque recusandae cum id aspernatur mollitia expedita praesentium. Ipsum
        dolorum eos, commodi autem qui nulla est tenetur dicta optio, saepe
        neque.
      </p>
    </div>
  );
}
