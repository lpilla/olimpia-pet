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
  CardHeader,
  CardBody,
  CardFooter,
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
        className="mx-auto w-full from-blue-gray-900 to-blue-gray-800 px-4 py-3"
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
      <Map />
      <Dashboard />
    </>
  );
};

export default LandingPage;

const Dashboard = () => {
  return (
    <div className="flex justify-center items-center w-full">
      <Card className="mx-auto w-full h-full from-blue-gray-900 to-blue-gray-800 px-4 py-3">
        <div className="mb-2 p-4">
          <Typography
            variant="h5"
            color="blue-gray"
            className="flex items-center"
          >
          </Typography>
        </div>
        <div className="flex flex-wrap justify-center h-full">
          <div className="w-full sm:w-1/2">
            <ListItem className="h-full bg-gradient-to-br from-blue-gray-900 to-blue-gray-800 text-white">
              <button className="p-10 flex items-center justify-center h-full">
                Viaggi
              </button>
            </ListItem>
          </div>
          <div className="w-full sm:w-1/2">
            <ListItem className="h-full bg-gradient-to-br from-blue-gray-900 to-blue-gray-800 text-white sm:ml-2.5">
              <button className="p-10 flex items-center justify-center h-full">
                Servizi
              </button>
            </ListItem>
          </div>
          <div className="w-full sm:w-1/2">
            <ListItem className="h-full bg-gradient-to-br from-blue-gray-900 to-blue-gray-800 text-white mb-4 sm:mr-2.5">
              <button className="p-10 flex items-center justify-center h-full">
                Eventi
              </button>
            </ListItem>
          </div>
          <div className="w-full sm:w-1/2">
            <ListItem className="h-full bg-gradient-to-br from-blue-gray-900 to-blue-gray-800 text-white sm:ml-2.5">
              <button className="p-10 flex items-center justify-center h-full">
                News
              </button>
            </ListItem>
          </div>
        </div>
      </Card>
    </div>
  );
};

const Map = () => {
  return (
    <div className="flex justify-center items-center">
      <Card className="mt-12 w-96 bg-gradient-to-br from-blue-gray-900 to-blue-gray-800 text-white">
        <CardHeader className="relative ">
          <img layout="fill" />
        </CardHeader>
        <CardBody>
          <Typography variant="h5" color="white" className="mb-2">
            MAPPA
          </Typography>
        </CardBody>
      </Card>
    </div>
  );
};
