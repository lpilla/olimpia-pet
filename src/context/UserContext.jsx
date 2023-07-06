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
  updateProfile
} from "firebase/auth";
import {auth, db, googleProvider} from "../lib/firebase";
import {collection, getDocs, query, where} from "firebase/firestore";

export const UserContext = createContext("");

export const useUser = () => {
  const [user, setUser] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const addUser = (user) => {
    setUser(user);
  };

  const [userObj,setUserObj] = useState({});

  useEffect(()=> {
    const addUserObj = async (user) => {
      if (user) {
        const q = query(
            collection(db, "users"),
            where("createdBy", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);
        let newData = {};
        querySnapshot.forEach((doc) => {
              setUserObj({
                nome: doc.data().data.nome,
                cognome : doc.data().data.cognome,
                email : doc.data().data.email,
                type : doc.data().data.type,
                lista : doc.data().data.lista,
              });
        });
      }
    };
    addUserObj(user)
  },[user])
  useEffect(()=>{console.log(userObj)},[userObj])
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
    console.log("sono dentro signInWithLink")
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
          console.log("Hey sono verificato")
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
        //console.log(user.emailVerified);
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
  /*const updateDisplayName = async (nome) =>{
    const currentUser = auth.currentUser
    //console.log("Utente corrente" + currentUser.uid)
    await updateProfile(currentUser, {
      displayName: nome, photoURL: null
    }).then(() => {
      console.log("Nome profilo aggiornato")
      console.log(currentUser.displayName)
    }).catch((error) => {
      console.log("Nome profilo non aggiornato")
    });
  }*/
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
    //updateDisplayName,
    userObj
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
