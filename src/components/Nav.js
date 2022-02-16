import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../context/authContext";
const Nav = () => {
  const { user, setUser, logout } = useContext(AuthContext);
  const history = useHistory();

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        {user && (
          <React.Fragment>
            <li>
              <Link to="/characters">Characters</Link>
            </li>
            <li>
              <Link to="/chat">Chat</Link>
            </li>
          </React.Fragment>
        )}
        {user ? (
          <li>
            <button onClick={logout}>Logout</button>
          </li>
        ) : (
          <React.Fragment>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </React.Fragment>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
