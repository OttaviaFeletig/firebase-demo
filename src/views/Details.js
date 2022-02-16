import React from "react";
import { useParams } from "react-router-dom";

const Details = () => {
  const { name } = useParams();

  return (
    <div>
      <h2>Details view</h2>
      <p>Hello {name}</p>
    </div>
  );
};

export default Details;
