import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  Typography,
  CardHeader,
  CardBody,
  Chip,
} from "@material-tailwind/react";
import L from "leaflet";
import { useEffect, useState } from "react";
import { Marker } from "react-leaflet";
import Card from "@material-tailwind/react/components/Card";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import { PhoneIcon } from "@heroicons/react/24/outline";

const CustomMarker = ({ marker }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  useEffect(() => {
    console.log(marker.coordinates);
  }, []);

  const handleDialogOpen = () => {
    setDialogOpen((p) => !p);
  };
  const icon = marker?.icon ? L.icon({
    iconUrl: marker?.icon,
    iconSize: [60, 60], // Adjust the size according to your icon
  }) : null;
  return (
    <Marker
      position={marker.coordinates}
      icon={icon}
      eventHandlers={{
        click: () => {
          handleDialogOpen();
        },
      }}
    >
      <Dialog
        open={dialogOpen}
        handler={handleDialogOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        className={"p-0 m-0"}
      >
        <DialogHeader>{marker?.name}</DialogHeader>
        <DialogBody className={"p-0"}>
          {" "}
          <Card className="flex-row w-full max-w-[48rem] p-0 rounded-none shadow-none">
            <CardHeader
              shadow={false}
              floated={false}
              className="w-2/5 shrink-0 m-0 rounded-none"
            >
              <img
                src={marker?.icon}
                alt="image"
                className="w-full h-full object-cover"
              />
            </CardHeader>
            <CardBody>
              <div className="flex flex-wrap gap-1">
                {marker?.categories?.map((cat) => {
                  return <Chip variant="ghost" value={cat} key={cat} />;
                })}
              </div>
              <Typography variant="h4" color="blue-gray" className="my-2">
                Location:
              </Typography>
              <p className="my-2">
                {marker?.shopAddress}
              </p>
              <Typography color="gray" className="font-normal mb-8">
                {marker?.description}
              </Typography>
              <a href="#" className="inline-block">
                <Button
                  variant="text"
                  className="flex items-center gap-2"
                  color={"green"}
                >
                  <PhoneIcon strokeWidth={2} className="w-4 h-4" />
                  Contattaci Subito
                </Button>
              </a>
            </CardBody>
          </Card>
        </DialogBody>
      </Dialog>
      {/* <Popup
            minWidth={1000}
            closeOnEscapeKey
            closeButton={false}
            className="bg-white"
          >
            <Card className="mt-6 w-full h-full shadow-none">
                <CardHeader color="blue-gray" className="relative h-56">
                  <img
                    src={marker.icon}
                    alt="img-blur-shadow"
                    layout="fill"
                    className="w-full h-full object-cover"
                  />
                </CardHeader>
                <CardBody>
                  <Typography
                    variant="h5"
                    color="blue-gray"
                    className="mb-2"
                  >
                    {marker.name}
                  </Typography>
                  <Typography>{marker.description}</Typography>
                </CardBody>
                <CardFooter className="pt-0">
                  <Button>Scopri di più</Button>
                </CardFooter>
              </Card>
            
          </Popup> */}
    </Marker>
  );
};
export default CustomMarker;
