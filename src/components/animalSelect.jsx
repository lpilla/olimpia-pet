import React, { useState, useEffect } from "react";
import { Select, Option } from "@material-tailwind/react";

const AnimalSelect = ({ lista, onSendValue }) => {
  const [value, setValue] = useState("");

  const changeValue = (evento) => {
    setValue(evento);
  };

  useEffect(() => {
    sendValue();
  }, [value]);

  const sendValue = () => {
    onSendValue?.(value);
  };

  return (
    <div className="w-72">
      <Select size="lg" onChange={changeValue}>
        {lista?.map((anim) => {
          return (
            <Option key={anim} value={anim}>
              {anim}
            </Option>
          );
        })}
      </Select>
    </div>
  );
};

export default AnimalSelect;
