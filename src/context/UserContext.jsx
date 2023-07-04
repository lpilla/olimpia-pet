import React, { createContext, useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithPopup,
  fetchSignInMethodsForEmail,
  sendEmailVerification,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from "firebase/auth";
import { auth, googleProvider } from "../lib/firebase";

export const UserContext = createContext("");

export const useUser = () => {
  const [user, setUser] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const addUser = (user) => {
    setUser(user);
  };

  const isEmailAlreadyRegistered = async (email) => {
    let isAlreadyRegistered = false;
    await fetchSignInMethodsForEmail(auth, email)
      .then((signInMethods) => {
        if (signInMethods.length === 0) {
          console.log("Email non registrato");
        } else {
          console.log("Email is already registered");
          isAlreadyRegistered = true;
        }
      })
      .catch((error) => {
        console.log(error);
      });
    return isAlreadyRegistered;
  };

  const sendRegister = async (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        //navigate("/login");
        sendEmailToVerification(email);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ..
      });
  };

  const sendEmailToVerification = (email) => {
    const currentUser = auth.currentUser;
    sendEmailVerification(currentUser)
      .then(() => {
        console.log("Email di verifica inviata");
        signInWithLink(email);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const signInWithLink = (curretEmail) => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let email = window.localStorage.getItem(curretEmail);
      if (!email) {
        email = window.prompt("Please provide your email for confirmation");
      }
      // The client SDK will parse the code from the link for you.
      signInWithEmailLink(auth, email, window.location.href)
        .then((result) => {
          // Clear email from storage.
          console.log(result);
          window.localStorage.removeItem(curretEmail);
          if (result.user) {
            console.log("login effettuato");
            console.log(result.user);
          }
          return true;
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      console.log("login effettuato");
    } catch (err) {
      console.error(err);
    }
  };

  const [isRedirecting, setIsRedirecting] = useState(false);
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    onAuthStateChanged(auth,(user) => {
      if (user) {
        setUser(user);
        setLoading(false);
        console.log(user);
        console.log(user.emailVerified);
        if (user.emailVerified) {
          setIsRedirecting(true);
        }
        console.log(isRedirecting);
        if (user.emailVerified && !isRedirecting && counter < 1) {
          setCounter(counter + 1);
          //window.location.href = "/register";
          console.log("Dovrei viaggiare da qualche parte perchè sono verificato");
        } 
      } else {
        setUser(null);
        setLoading(false);
      }
    });
  }, []);

  const userLogin = (email, password, callaback) => {
    //e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        // console.log("sono dentro");

        const user = userCredential.user;
        console.log("login effettuato");
        addUser(user);
        console.log(user);
        callaback("login effettuato");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        callaback(errorMessage);
      });
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      console.log("logout effettuato");
    } catch (err) {
      console.error(err);
    }
  };

  return {
    user,
    addUser,
    userLogin,
    logOut,
    signInWithGoogle,
    sendRegister,
    loading,
    isEmailAlreadyRegistered,
    signInWithLink,
    isRedirecting,
  };
};

export const UserProvider = ({ children }) => {
  const value = useUser();

  return (
    <UserContext.Provider value={value}>
      {" "}
      <>{children} </>{" "}
    </UserContext.Provider>
  );
};
