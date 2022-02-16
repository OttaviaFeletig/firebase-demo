import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const ProtectedRoute = ({ children }) => {
  const { user, setUser } = useContext(AuthContext);
  const isAuthenticated = user !== null ? true : false;
  return (
    <Route>{() => (isAuthenticated ? children : <Redirect to="/" />)}</Route>
  );
};

export default ProtectedRoute;
