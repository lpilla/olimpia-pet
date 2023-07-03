import { addDoc, collection } from "firebase/firestore";
import { db } from "../lib/firebase";
import { createContext } from "react";

export const databaseContext = createContext(null);

export const useDatabase = () => {
  const addData = async (nome, cognome, type, listaAnimal) => {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        nome: nome,

        cognome: cognome,

        type: type,

        lista: listaAnimal,
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
