import React, { useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
const Login = () => {
  const { user, setUser, login, error } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLoginClick = () => {
    login(email, password);
  };
  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="email"
        value={email}
        onChange={handleEmailChange}
      />
      <input
        type="text"
        placeholder="password"
        value={password}
        onChange={handlePasswordChange}
      />
      <button onClick={handleLoginClick}>Login</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Login;
