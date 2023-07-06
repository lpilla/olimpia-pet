import { useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import FotoCliccabile from "./FotoCliccabile";
import { useState } from "react";
import { useEffect } from "react";

const ProfileAnimalTable = () => {
  const { userObj } = useContext(UserContext);
  const [idCancellazione, setId] = useState("");
  const [lista, setLista] = useState(userObj.lista);

  useEffect(() => {
    setLista(userObj.lista);
  }, [userObj]);

  const catchId = (v) => {
    setId(v);
    //Id per cancellare Animale dalla lista
  };

  if (lista)
    return (
      <>
        <div className="grid grid-cols-3">
          {lista.map((dog) => {
            return (
              <div className="flex flex-col items-center justify-center m-10">
                <h5 className="text-2xl font-bold text-blue-900">{dog.nome}</h5>
                <FotoCliccabile dog={dog} sendId={catchId} />
              </div>
            );
          })}
        </div>
      </>
    );
};

export default ProfileAnimalTable;
