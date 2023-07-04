import {
  Navbar,
  Typography,
  IconButton,
  Button,
  Input,
} from "@material-tailwind/react";
import { BellIcon, Cog6ToothIcon } from "@heroicons/react/24/solid";
import {
  Card,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";

const LandingPage = () => {
  return (
    <>
      <Navbar
        variant="gradient"
        color="blue-gray"
        className="mx-auto max-w-screen-xl from-blue-gray-900 to-blue-gray-800 px-4 py-3"
      >
        <div className="flex flex-wrap items-center justify-between gap-y-4 text-white">
          <Typography
            as="a"
            href="#"
            variant="h6"
            className="mr-4 ml-2 cursor-pointer py-1.5"
          >
            Olimpya Pet
          </Typography>
          <div className="relative flex w-full gap-2 md:w-max">
            <Input
              type="search"
              color="white"
              label="Type here..."
              className="pr-20"
              containerProps={{
                className: "min-w-[700px]",
              }}
            />
            <Button
              size="sm"
              color="white"
              className="!absolute right-1 top-1 rounded"
            >
              Search
            </Button>
          </div>
        </div>
      </Navbar>
      <Dashboard />
    </>
  );
};
export default LandingPage;

const Dashboard = () => {
  return (
    <Card className="fixed top-100 left-4 h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4">
        <Typography
          variant="h5"
          color="blue-gray"
          className="flex items-center"
        >
          Bho
        </Typography>
      </div>
      <List>
        <ListItem className="bg-gradient-to-br from-blue-gray-900 to-blue-gray-800 text-white">
          <button className="p-10 flex items-center justify-center">
            Viaggi
          </button>
        </ListItem>
        <ListItem className="bg-gradient-to-br from-blue-gray-900 to-blue-gray-800 text-white">
          <button className="p-10 flex items-center justify-center">
            Servizi
          </button>
        </ListItem>
        <ListItem className="bg-gradient-to-br from-blue-gray-900 to-blue-gray-800 text-white">
          <button className="p-10 flex items-center justify-center">
            Eventi
          </button>
        </ListItem>
        <ListItem className="bg-gradient-to-br from-blue-gray-900 to-blue-gray-800 text-white">
          <button className="p-10 flex items-center justify-center">
            News
          </button>
        </ListItem>
      </List>
    </Card>
  );
};

const Map = () => {
  return (
    <div>
      <h1>Mappa</h1>
    </div>
  );
};
