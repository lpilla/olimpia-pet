import { useContext } from "react";
import AnimalTable from "../../../components/AnimalTable";
import { UserContext } from "../../../context/UserContext";
import { Button, Typography, Avatar } from "@material-tailwind/react";
import FotoCliccabile from "./FotoCliccabile";
import { useState } from "react";

const ProfileAnimalTable = () => {
  const { userObj } = useContext(UserContext);
  const [idCancellazione, setId] = useState("");
  const catchId = (v) => {
    setId(v);
  };

  return (
    <>
      <div className="flex items-start justify-start m-10">
        {userObj.lista.map((dog) => {
          return (
            <div className="flex flex-col items-center justify-center">
              <h5 className="text-2xl font-bold text-blue-900">{dog.nome}</h5>
              <FotoCliccabile dog={dog} sendId={catchId} />
            </div>
          );
        })}
      </div>

      {/*
      lista.map((dog) => (
        <div className="grid grid-cols-2 gap-[20rem] grid-rows-1 w-[full-4rem] h-[5rem] border-2 border-r-2 rounded-lg border-blue-300 ml-[10rem] mr-[10rem]">
          <div className="flex justify-center items-center "></div>
          <div className="flex space-x-4 justify-center items-center">
            <Typography variant="h4" className="flex pr-4">
              Nome:{dog.nome}
            </Typography>
            <Button variant="text">Edit</Button>
            <Button variant="text" className="text-red-500">
              Remove
            </Button>
          </div>
        </div>
      ))
      */}
    </>
  );
};

export default ProfileAnimalTable;
