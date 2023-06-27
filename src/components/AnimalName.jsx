import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/solid";

const AnimalName = ({ sendOpen, sendValue }) => {
  const [nome, setNome] = useState("");
  const [desc, setDesc] = useState("");
  const [bottone, setBottone] = useState(null);

  const onModificaNome = (evento) => {
    const valore = evento.target.value;
    setNome(valore);
  };

  const onModificaDesc = (evento) => {
    const valore = evento.target.value;
    setDesc(valore);
  };

  const handleOpen = () => {
    sendOpen?.(false);
    sendValue?.([nome, desc]);
  };

  const handleOpen1 = () => {
    sendOpen?.(false);
  };

  return (
    <React.Fragment>
      <Dialog open={true} handler={handleOpen}>
        <div className="flex items-center justify-between">
          <DialogHeader>Profilo Animale</DialogHeader>
          <XMarkIcon
            className="mr-3 h-5 w-5 hover:bg-red-700"
            onClick={handleOpen1}
          />
        </div>
        <DialogBody divider>
          <form className="grid gap-6">
            <Input label="Nome dell'animale" onChange={onModificaNome} />
            <Textarea label="Descrizione" onChange={onModificaDesc} />
          </form>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button
            variant="outlined"
            color="red"
            className="hover:bg-red-700 hover:text-white"
            onClick={handleOpen1}
          >
            close
          </Button>
          <Button
            variant="outlined"
            color="green"
            className="hover:bg-green-700 hover:text-white"
            onClick={handleOpen}
          >
            Add animal
          </Button>
        </DialogFooter>
      </Dialog>
    </React.Fragment>
  );
};

export default AnimalName;
