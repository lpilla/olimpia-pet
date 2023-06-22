import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";

const AnimalCard = ({ titolo }) => {
  return (
    <>
      <Card className="w-56 border-t-2">
        <CardHeader floated={false} className="h-70">
          <img src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" alt="profile-picture" />
        </CardHeader>
        <CardBody className="text-center">
          <Typography variant="h5" color="blue-gray" className="mb-2">
            {titolo}
          </Typography>
        </CardBody>
      </Card>
    </>
  );
};

export default AnimalCard;
