import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useMap, useMapEvents } from "react-leaflet/hooks";
import face from "./face-2.jpg";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import {
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
import Card from "@material-tailwind/react/components/Card";
import CustomMarker from "../../components/CustomMarker";
import HomeFilters from "../../components/HomeFilters";
import HomeProfile from "../../components/HomeProfile";

function MapController({ position, setPosition }) {
  const map = useMap();
  const mapEvents = useMapEvents({
    click: (e) => {
      console.log(e.latlng.lat, e.latlng.lng);
    },
  });
  map.setView([position.latitude, position.longitude]);
  return null;
}
export default function Home() {
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
        categories: ["vaterinario"],
      },
    ]);
  };
  const [markers, setMarkers] = useState([
    {
      id: 1,
      coordinates: [45.49851513788384, 9.246648739483234],
      name: "giorgio",
      description: "lorem ipsum dolor sit amet consectetur adipisicing elit.",
      icon: "https://media.istockphoto.com/id/1171733307/it/foto/veterinario-con-cane-e-gatto-cucciolo-e-gattino-dal-dottore.jpg?s=612x612&w=0&k=20&c=3M18OZ2x-fJcx88S9FHefEx4OItXbVEJ-d3iQZuQXmA=",
      categories: ["veterinario", "parco"],
    },
    {
      id: 2,
      coordinates: [45.504052789979056, 9.255578153067383],
      name: "giorgio 2",
      description:
        "lorem ipsum dolor sit amet consectetur adipisicing elit. fdfddf d",
      icon: "https://media.istockphoto.com/id/1171733307/it/foto/veterinario-con-cane-e-gatto-cucciolo-e-gattino-dal-dottore.jpg?s=612x612&w=0&k=20&c=3M18OZ2x-fJcx88S9FHefEx4OItXbVEJ-d3iQZuQXmA=",
      categories: ["veterinario"],
    },
  ]);
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
          <button onClick={() => createCustomMarker(location)}>
            create marker
          </button>
        </div>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers?.map((marker) => {
          return <CustomMarker marker={marker} key={marker.id} />;
        })}
        ;
        <HomeProfile />
        <HomeFilters setMarkers={setMarkers} markers={markers} />
        <MapController position={location} />
      </MapContainer>
    </div>
  );
}
