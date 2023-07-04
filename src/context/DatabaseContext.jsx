import { addDoc, collection } from "firebase/firestore";
import { db } from "../lib/firebase";
import {createContext, useContext} from "react";
import {UserContext} from "./UserContext.jsx";

export const databaseContext = createContext(null);

export const useDatabase = () => {

  const {user} = useContext(UserContext);
  const addData = async (nome, cognome, type, listaAnimal) => {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        nome: nome,

        cognome: cognome,

        type: type,

        lista: listaAnimal,

        createdBy: user.uid
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return { addData };
};

export const DatabaseProvider = ({ children }) => {
  const value = useDatabase();
  return (
    <databaseContext.Provider value={value}>
      {children}
    </databaseContext.Provider>
  );
};
