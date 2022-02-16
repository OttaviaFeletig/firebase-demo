import React, { useState, useContext } from "react";
import { AuthContext } from "../context/authContext";

const Register = () => {
  const { user, setUser, register } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRegisterClick = () => {
    register(email, password);
  };
  return (
    <div>
      <h2>Register</h2>
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
      <button onClick={handleRegisterClick}>Register</button>
    </div>
  );
};

export default Register;
