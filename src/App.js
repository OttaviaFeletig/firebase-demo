import "./App.css";
import React from "react";
import Characters from "./components/Characters";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./views/Home";
import About from "./views/About";
import Nav from "./components/Nav";
import Details from "./views/Details";
import { CharactersContextProvider } from "./context/charactersContext";
import { AuthContextProvider } from "./context/authContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./views/Login";
import Register from "./views/Register";
import Chat from "./views/Chat";

function App() {
  return (
    <div className="App">
      <h1>Hello React</h1>
      <AuthContextProvider>
        <Router>
          <Nav />
          <CharactersContextProvider>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <ProtectedRoute path="/about">
                <About />
              </ProtectedRoute>
              <ProtectedRoute exact path="/characters">
                <Characters />
              </ProtectedRoute>
              <Route path="/characters/:name">
                <Details />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/register">
                <Register />
              </Route>
              <ProtectedRoute exact path="/chat">
                <Chat />
              </ProtectedRoute>
            </Switch>
          </CharactersContextProvider>
        </Router>
      </AuthContextProvider>
    </div>
  );
}

export default App;
