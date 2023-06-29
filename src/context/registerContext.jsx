import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import React, { createContext, useState } from "react";

export const RegisterContext = createContext("");

export const useRegister = () => {
  const sendRegister = async (e, email, password) => {
    e.preventDefault();
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        //navigate("/login");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ..
      });
  };

  return { sendRegister };
};

export const RegisterProvider = ({ children }) => {
  const value = useRegister();

  return (
    <RegisterContext.Provider
      // @ts-ignore
      value={value}
    >
      {" "}
      <>{children} </>{" "}
    </RegisterContext.Provider>
  );
};
