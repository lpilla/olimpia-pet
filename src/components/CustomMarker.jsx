import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
} from "@material-tailwind/react";
import L from "leaflet";
import { useState } from "react";
import { Marker } from "react-leaflet";

const CustomMarker = ({ marker }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = () => {
    setDialogOpen((p) => !p);
  };
  const icon = L.icon({
    iconUrl: marker.icon,
    iconSize: [60, 60], // Adjust the size according to your icon
  });
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
      >
        <DialogHeader>{marker.name}</DialogHeader>
        <DialogBody divider>{marker.description}</DialogBody>
        <DialogFooter>
          <Button variant="gradient" color="green" onClick={handleDialogOpen}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
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
