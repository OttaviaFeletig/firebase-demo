import React, { useContext } from "react";
import { AuthContext } from "../context/authContext";
const Home = () => {
  const { user, setUser } = useContext(AuthContext);
  return (
    <div>
      <h2>Home Page</h2>
      {user && <h3>Welcome {user.email}</h3>}
    </div>
  );
};

export default Home;
