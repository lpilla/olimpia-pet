import {
  Card,
  Typography,
  Button,
  DialogFooter,
} from "@material-tailwind/react";
import { useState } from "react";

const AnimalTable = ({ TABLE_ROWS, sendStatus, sendId }) => {
  const TABLE_HEAD = ["Nome", "Animale", "Razza", ""];

  const addAnimal = () => {
    sendStatus?.(true);
  };

  const elimina = (id) => {
    sendId?.(id);
  };

  return (
    <Card className="overflow-auto h-full w-96">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TABLE_ROWS.map((item, index) => {
            const isLast = index === TABLE_ROWS.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

            return (
              <tr key={item.nome}>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {item.nome}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {item.animal}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {item.breed}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    as="a"
                    href="#"
                    variant="small"
                    color="red"
                    className="font-medium"
                    onClick={() => {
                      elimina(item.id);
                      console.log("clikc");
                    }}
                  >
                    remove
                  </Typography>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Button
        variant="outlined"
        color="green"
        className="hover:bg-green-700 hover:text-white"
        onClick={addAnimal}
      >
        Add
      </Button>
    </Card>
  );
};

export default AnimalTable;
