import { createContext, useState } from "react";

// 1. create context

export const CharactersContext = createContext();

// 2. create provider

export const CharactersContextProvider = (props) => {
  // 3. move state and function
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMyDataAsync = async () => {
    try {
      const response = await fetch(
        "https://rickandmortyapi.com/api/character/"
      );
      const data = await response.json();
      setCharacters(data.results);
      setLoading(false);
    } catch (err) {
      setError(err.name);
      setLoading(false);
    }
  };
  // 4. return the provider with its value and inject children component
  return (
    <CharactersContext.Provider
      value={{ characters, loading, error, fetchMyDataAsync }}
    >
      {props.children}
    </CharactersContext.Provider>
  );
};
