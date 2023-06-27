import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useMap, useMapEvents } from "react-leaflet/hooks";
import face from "./face-2.jpg";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  List,
  ListItemPrefix,
  ListItem,
  Checkbox,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Carousel,
  Avatar,
  Tooltip,
  IconButton,
} from "@material-tailwind/react";
import {
  BanknotesIcon,
  StarIcon,
  HeartIcon,
  WifiIcon,
  HomeIcon,
  TvIcon,
  FireIcon,
} from "@heroicons/react/24/solid";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

import L from "leaflet";
import card from "@material-tailwind/react/theme/components/card";
function MapController({ position, setPosition }) {
  const map = useMap();
  const mapEvents = useMapEvents({
    click: (e) => {
      console.log(e);
    },
  });
  map.setView([position.latitude, position.longitude]);
  console.log("map center:", map.getCenter());
  return null;
}
export default function Home() {
  const [open, setOpen] = useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
  const createCustomMarker = (p) => {
    setMarkers([
      ...markers,
      {
        id: 3,
        coordinates: [p.latitude, p.longitude],
        name: "giorgio",
        description:
          "The place is close to Barceloneta Beach and bus stop just 2 min by walk and near to &quot;Naviglio&quot; where you can enjoy the main night life in Barcelona.",
        icon: "https://media.istockphoto.com/id/1171733307/it/foto/veterinario-con-cane-e-gatto-cucciolo-e-gattino-dal-dottore.jpg?s=612x612&w=0&k=20&c=3M18OZ2x-fJcx88S9FHefEx4OItXbVEJ-d3iQZuQXmA=",
      },
    ]);
  };
  const [markers, setMarkers] = useState([]);
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  useEffect(() => {
    handleGeolocation();
  }, []);

  const handleGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          console.log(location);
        },
        (error) => {
          console.log("Error getting location:", error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };
  return (
    <div>
      <MapContainer
        markerZoomAnimation={true}
        center={[location.latitude, location.longitude]}
        zoom={13}
        doubleClickZoom={false}
        className={"map-container"}
      >
        <div className="buttons">
          <button onClick={handleGeolocation}>give position</button>
          <button onClick={() => createCustomMarker(location)}>
            create marker
          </button>
        </div>

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map((marker) => {
          const icon = L.icon({
            iconUrl: marker.icon,
            iconSize: [32, 32], // Adjust the size according to your icon
          });
          return (
            <Marker position={marker.coordinates} icon={icon}>
              <Popup
                minWidth={1000}
                closeOnEscapeKey
                closeButton={false}
                className="bg-white"
              >
                {
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
                }
              </Popup>
            </Marker>
          );
        })}

        <Card className="bg-[#D9D9D9] fixed top-4 left-4 h-auto w-full max-w-[20rem] shadow-xl shadow-blue-gray-900/5 z-[9999]">
          <List>
            <Accordion
              open={open === 1}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${
                    open === 1 ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem className="p-0 relative" selected={open === 1}>
                <AccordionHeader
                  onClick={() => handleOpen(1)}
                  className="border-b-0 p-3 flex justify-between"
                >
                  <div>
                    <Avatar src={face} alt="avatar" size="xl" />
                    <Avatar
                      src={face}
                      alt="avatar"
                      size="sm"
                      className="absolute bottom-2 left-[50px]"
                    />
                    <Avatar
                      src={face}
                      alt="avatar"
                      size="sm"
                      className="absolute bottom-2 left-[75px]"
                    />
                    <Avatar
                      src={face}
                      alt="avatar"
                      size="sm"
                      className="absolute bottom-2 left-[100px]"
                    />
                  </div>
                  <div className="mt-[-30px]">
                    <h4 className="text-xl font-bold leading-0 ">
                      Lorenzo Pilla
                    </h4>
                    <p className="text-sm">2 animali</p>
                  </div>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0">
                  <ListItem>Analytics</ListItem>
                  <ListItem>Reporting</ListItem>
                  <ListItem>Projects</ListItem>
                </List>
              </AccordionBody>
            </Accordion>
          </List>

          {/*<Carousel className="rounded-xl">
        <img
          src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
          alt="image 1"
          className="h-full w-full object-cover"
        />
        <img
          src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
          alt="image 2"
          className="h-full w-full object-cover"
        />
        <img
          src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
          alt="image 3"
          className="h-full w-full object-cover"
        />
      </Carousel>*/}
        </Card>
        <Card className="bg-[#D9D9D9] fixed bottom-4 left-4 h-auto w-full max-w-[20rem] shadow-xl shadow-blue-gray-900/5 z-[9999]">
          <List>
            <Typography variant="h2" className="px-3 py-2 text-black">
              Filtri
            </Typography>

            <ListItem className="p-0">
              <label
                htmlFor="vertical-list-react"
                className="px-3 py-2 flex items-center w-full cursor-pointer"
              >
                <ListItemPrefix className="mr-3">
                  <Checkbox
                    id="vertical-list-react"
                    ripple={false}
                    className="hover:before:opacity-0"
                    containerProps={{
                      className: "p-0",
                    }}
                  />
                </ListItemPrefix>
                <Typography color="blue-gray" className="font-medium">
                  React.js
                </Typography>
              </label>
            </ListItem>
            <ListItem className="p-0">
              <label
                htmlFor="vertical-list-vue"
                className="px-3 py-2 flex items-center w-full cursor-pointer"
              >
                <ListItemPrefix className="mr-3">
                  <Checkbox
                    id="vertical-list-vue"
                    ripple={false}
                    className="hover:before:opacity-0"
                    containerProps={{
                      className: "p-0",
                    }}
                  />
                </ListItemPrefix>
                <Typography color="blue-gray" className="font-medium">
                  Vue.js
                </Typography>
              </label>
            </ListItem>
            <ListItem className="p-0">
              <label
                htmlFor="vertical-list-svelte"
                className="px-3 py-2 flex items-center w-full cursor-pointer"
              >
                <ListItemPrefix className="mr-3">
                  <Checkbox
                    id="vertical-list-svelte"
                    ripple={false}
                    className="hover:before:opacity-0"
                    containerProps={{
                      className: "p-0",
                    }}
                  />
                </ListItemPrefix>
                <Typography color="blue-gray" className="font-medium">
                  Svelte.js
                </Typography>
              </label>
            </ListItem>
          </List>
        </Card>
        <MapController position={location} />
      </MapContainer>
    </div>
  );
}
