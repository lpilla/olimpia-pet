import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendEmailVerification,
} from "firebase/auth";
import { auth, googleProvider } from "../lib/firebase";
import React, { createContext } from "react";

export const RegisterContext = createContext("");

export const useRegister = () => {
  const sendRegister = async (email, password) => {
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

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      console.log("login effettuato");
    } catch (err) {
      console.error(err);
    }
  };
  //da inserire il logout
  const logOut = async () => {
    try {
      await signOut(auth);
      console.log("logout effettuato");
    } catch (err) {
      console.error(err);
    }
  };

  return { sendRegister, logOut, signInWithGoogle };
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
