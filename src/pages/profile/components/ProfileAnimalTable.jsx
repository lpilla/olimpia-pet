import { useContext } from "react";
import AnimalTable from "../../../components/AnimalTable";
import { UserContext } from "../../../context/UserContext";
import { Button, Typography } from "@material-tailwind/react";

const ProfileAnimalTable = () => {
  const { userObj } = useContext(UserContext);
  const lista = userObj.lista;
  return (
    <>
      {lista.map((dog) => (
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
      ))}
    </>
  );
};

export default ProfileAnimalTable;
