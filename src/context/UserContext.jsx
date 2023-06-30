import React, {createContext, useEffect, useState} from "react";
import {
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    createUserWithEmailAndPassword,
    signInWithPopup
} from "firebase/auth";
import {auth, googleProvider} from "../lib/firebase";

export const UserContext = createContext("");

export const useUser = () => {
  const [user, setUser] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const addUser = (user) => {
    setUser(user);
  };

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
  useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                setUser(user)
                setLoading(false)
                // ...
            } else {
                setUser(null);
                setLoading(false)
            }
        });
    },[])

  const userLogin = ( email, password , callaback) => {
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

    return { user, addUser, userLogin ,logOut, signInWithGoogle, sendRegister,loading};
};

export const UserProvider = ({ children }) => {
  const value = useUser();

  return (
    <UserContext.Provider 
    value={value}>
      {" "}
      <>{children} </>{" "}
    </UserContext.Provider>
  );
};
