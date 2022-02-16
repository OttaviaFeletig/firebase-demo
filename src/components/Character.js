import React from "react";
import { Link } from "react-router-dom";
const Character = ({ character }) => {
  return (
    <div>
      <img src={character.image} alt={character.name} />
      <Link to={`/characters/${character.name}`}>
        <p>{character.name}</p>
      </Link>
    </div>
  );
};
export default Character;
