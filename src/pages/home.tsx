import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { pokemonListLoader } from "../loaders/pokemonListLoader.tsx";
import { usePagination } from "../contexts/PaginationContext.tsx";

export default function Home() {
  const [pokemonName, setPokemonName] = useState("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pokemonList, setPokemonList] = useState<any[]>([]);
  const { offset, limit, setOffset } = usePagination();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false); //Loading state
  const [error, setError] = useState<string | null>(null); //Error state

  //Set current page
  useEffect(() => {
    const savedCurrentPage = localStorage.getItem("currentPage");
    if (savedCurrentPage) {
      //check if true
      const parsedCurrentPage = Number(savedCurrentPage);
      if (!isNaN(parsedCurrentPage) && parsedCurrentPage !== currentPage) {
        setCurrentPage(parsedCurrentPage);
      } //Check if any changes were made(caused problems before adding this)
    }
  }, []);

  //Update current page
  useEffect(() => {
    localStorage.setItem("currentPage", currentPage.toString());
    localStorage.setItem("offset", offset.toString());
  }, [currentPage, offset]);

  //Fetching data based on offset and limit
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); //Loading state
      setError(null);

      try {
        const data = await pokemonListLoader(offset, limit); // Pass the parameters
        setPokemonList(data);
      } catch (err) {
        setError("Failed to fetch Pokémon list");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [offset, limit]);

  const handleSearch = (pokemonName: string) => {
    if (pokemonName) {
      navigate(`/pokemon/${pokemonName.toLowerCase()}`);
    }
  };

  const handleNext = () => {
    setOffset(offset + limit);
    setCurrentPage(currentPage + 1);
    console.log("next");
  };
  const handlePrevious = () => {
    setOffset(offset - limit);
    setCurrentPage(currentPage - 1);
  };

  const getIMG = (url: string) => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
      url.split("/").slice(-2, -1)[0]
    }.png`;
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
      <button className="search-btn" onClick={() => handleSearch(pokemonName)}>
        Search
      </button>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <div className="pokemon-gallery">
          <div className="gallery-wrapper">
            {pokemonList.map((pokemon, index) => {
              return (
                <div
                  key={index}
                  className="pokemon-box-g"
                  onClick={() => handleSearch(pokemon.name)}
                >
                  <img
                    src={getIMG(pokemon.url)}
                    alt=""
                    className="pokemon-image-g"
                  />
                  <p className="pokemon-name-g">{pokemon.name}</p>
                </div>
              );
            })}
          </div>
          <div className="gallery-contols">
            <div className="page-info"> {currentPage}</div>
            <div className="btn-wrapper">
              {currentPage !== 1 ? (
                <p className="page-btn" onClick={handlePrevious}>
                  Previous
                </p>
              ) : null}
              <p className="page-btn" onClick={handleNext}>
                Next
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
