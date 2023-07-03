import { Chip } from "@material-tailwind/react";
import { useState } from "react";

const MyCustomChip = ({ name, onDelete }) => {
  const [open, setOpen] = useState(true);
  const handleDelete = () => {
    onDelete();
  };

  return (
    <div>
      <Chip open={open} value={name} onClose={() => handleDelete()} />
    </div>
  );
};

export default MyCustomChip;
