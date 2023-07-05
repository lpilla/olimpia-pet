import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useState, useEffect } from "react";

const AnimalCard = ({ breed }) => {
  const [foto, setFoto] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://dog.ceo/api/breed/" + breed + "/images/random"
        );
        const json = await response.json();
        setFoto(json);
      } catch (error) {
        console.error("Errore durante il recupero delle immagini:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Card className="w-56 border-t-2">
        <CardHeader
          floated={false}
          className="h-70 flex items-center justify-center"
        >
          <img
            src={foto.message}
            alt="profile-picture"
            className="max-w-[300px] max-h-[150px]"
          />
        </CardHeader>
        <CardBody className="text-center">
          <Typography variant="h5" color="blue-gray" className="mb-2">
            {breed}
          </Typography>
        </CardBody>
      </Card>
    </>
  );
};

export default AnimalCard;
