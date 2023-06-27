import {
  Card,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
  Checkbox,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";

const HomeFilters = ({ setMarkers, markers }) => {
  const [filters, setFilters] = useState([]);

  const [myMarkers, setMyMarkers] = useState(null);
  useEffect(() => {
    setMyMarkers(markers);
  }, []);

  useEffect(() => {
    filterBy();
  }, [filters]);

  const filterBy = () => {
    const filteredObjects = myMarkers?.filter((object) =>
      filters.some((category) => object.categories.includes(category))
    );
    setMarkers(filteredObjects);
  };
  return (
    <Card className="bg-[#D9D9D9] fixed bottom-4 left-4 h-auto w-full max-w-[20rem] shadow-xl shadow-blue-gray-900/5 z-[9999]">
      <List>
        <Typography variant="h2" className="px-3 py-2 text-black">
          Filtri
        </Typography>

        <ListItem className="p-0">
          <label
            onChange={async (e) => {
              console.log(e.target.checked);
              if (e.target.checked) {
                setFilters([...filters, e.target.value]);
              } else {
                setMarkers(myMarkers);
                await setFilters(
                  filters.filter((item) => item !== e.target.value)
                );
              }
            }}
            htmlFor="vertical-list-react"
            className="px-3 py-2 flex items-center w-full cursor-pointer"
          >
            <ListItemPrefix className="mr-3">
              <Checkbox
                id="vertical-list-react"
                ripple={false}
                value={"veterinario"}
                className="hover:before:opacity-0"
                containerProps={{
                  className: "p-0",
                }}
              />
            </ListItemPrefix>
            <Typography color="blue-gray" className="font-medium">
              Veterinario
            </Typography>
          </label>
        </ListItem>
        <ListItem className="p-0">
          <label
            onChange={async (e) => {
              console.log(e.target.checked);
              if (e.target.checked) {
                setFilters([...filters, e.target.value]);
              } else {
                setMarkers(myMarkers);
                await setFilters(
                  filters.filter((item) => item !== e.target.value)
                );
              }
            }}
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
                value={"parco"}
              />
            </ListItemPrefix>
            <Typography color="blue-gray" className="font-medium">
              Parco
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
              Pet Shop
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
              Altro
            </Typography>
          </label>
        </ListItem>
      </List>
    </Card>
  );
};

export default HomeFilters;
