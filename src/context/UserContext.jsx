import React, { createContext, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";

export const UserContext = createContext("");

export const useUser = () => {
  const [user, setUser] = useState("");
  const addUser = (user) => {
    setUser(user);
  };

  const userLogin = ( email, password) => {
    //e.preventDefault();
    console.log("sono dentro");
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("login effettuato");
        addUser(user);
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };
  return { user, addUser, userLogin };
};

export const UserProvider = ({ children }) => {
  const value = useUser();

  return (
    <UserContext.Provider 
// @ts-ignore
    value={value}>
      {" "}
      <>{children} </>{" "}
    </UserContext.Provider>
  );
};
