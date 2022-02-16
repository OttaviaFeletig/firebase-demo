import { createContext, useState, useEffect } from "react";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [user, setUser] = useState(null);
  console.log(`user`, user);
  const [error, setError] = useState(null);
  const auth = getAuth();
  const register = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(`user`, user);
        setUser(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`errorMessage`, errorMessage);
        // ..
      });
  };
  const login = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(`user`, user);
        setUser(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`errorCode`, errorCode);

        if (errorCode == "auth/invalid-email") {
          setError("Email is wrong");
        } else if (errorCode == "auth/invalid-email") {
          setError("Password is wrong");
        }
      });
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        setUser(null);
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const checkUser = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        setUser(user);
        // ...
      } else {
        // User is signed out
        setUser(null);
        // ...
      }
    });
  };

  useEffect(() => {
    checkUser();
  }, []);
  return (
    <AuthContext.Provider
      value={{ user, setUser, register, login, logout, error }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
