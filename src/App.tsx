import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

//pages
import Home from "./pages/home.tsx";
import Quiz from "./pages/Quiz/quiz.tsx";
import Pokemon, { pokemonLoader } from "./pages/Pokemon/pokemon.tsx";
import Ability, { abilityLoader } from "./pages/Ability/ability.tsx";

//layouts
import RootLayout from "./layouts/RootLayout.tsx";

// loaders
import { pokemonListLoader } from "./loaders/pokemonListLoader.tsx";

const myRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} loader={pokemonListLoader} />
      <Route path="quiz" element={<Quiz />} />
      <Route
        path="pokemon/:name"
        element={<Pokemon />}
        loader={pokemonLoader}
      />
      <Route path="ability/:id" element={<Ability />} loader={abilityLoader} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={myRouter} />;
}

export default App;
