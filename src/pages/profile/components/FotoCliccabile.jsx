import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Avatar,
  IconButton,
  Typography,
  Card,
} from "@material-tailwind/react";
import Foto from "./caneStilizzato.webp";

const FotoCliccabile = ({ dog, sendId }) => {
  const [open, setOpen] = React.useState(false);
  const [isFavorite, setIsFavorite] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const handleIsFavorite = () => setIsFavorite((cur) => !cur);

  const onSendId = () => {
    sendId(dog.id);
  };

  return (
    <React.Fragment>
      <Card
        className="h-64 w-96 cursor-pointer overflow-hidden transition-opacity hover:opacity-90 border border-blue-500"
        onClick={handleOpen}
      >
        <img
          alt={dog.nome}
          className="h-full w-full object-cover object-center"
          src={Foto}
        />
      </Card>
      <Dialog size="xl" open={open} handler={handleOpen}>
        <DialogHeader>Profilo Animale</DialogHeader>
        <DialogBody divider={true} className="p-0">
          <div className="p-4">
            <h1 className="text-xl font-bold mb-2">Nome:</h1>
            <p className="mb-4">{dog.nome}</p>
            <h1 className="text-xl font-bold mb-2">Animale:</h1>
            <p className="mb-4">{dog.animal}</p>
            <h1 className="text-xl font-bold mb-2">Razza:</h1>
            <p className="mb-4">{dog.breed}</p>
            <h1 className="text-xl font-bold mb-2">Descrizione:</h1>
            <p>{dog.descrizione}</p>
          </div>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button
            variant="outlined"
            color="green"
            className="hover:bg-green-700 hover:text-white"
            onClick={handleOpen}
          >
            Close
          </Button>
          <Button
            variant="outlined"
            color="red"
            className="hover:bg-red-700 hover:text-white"
            onClick={onSendId}
          >
            Elimina Animale
          </Button>
        </DialogFooter>
      </Dialog>
    </React.Fragment>
  );
};

export default FotoCliccabile;
