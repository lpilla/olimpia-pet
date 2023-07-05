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
      <div className="flex items-center justify-center">
        <Navbar
          variant="gradient"
          color="blue-gray"
          className="w-1/2 h-1/2 from-blue-gray-900 to-blue-gray-800 px-4 py-3 flex items-center"
        >
          <div className="ml-2 mr-4">
            <img
              src="src\components\FotoAnimali\logo\logo pet trip.png"
              alt="logo sito"
            />
          </div>

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
        </Navbar>
      </div>
      <Map />
      <Dashboard />
    </>
  );
};


export default LandingPage;

const Dashboard = () => {
  return (
    <div className="">
      <Card className="w-full h-full from-blue-gray-900 to-blue-gray-800 justify-center items-center">
        <div className="mb-2 p-4">
          <Typography
            variant="h5"
            color="blue-gray"
            className="flex items-center"
          ></Typography>
        </div>
        <div className="flex flex-wrap justify-center">
          <div className="w-full w-all mb-5">
            <ListItem className="h-full bg-gradient-to-br from-blue-gray-900 to-blue-gray-800 text-white items-center justify-center flex flex-row">
              <button className="p-10 flex items-center justify-center">
                Viaggi
              </button>
            </ListItem>
          </div>
          <div className="w-full w-all mb-5">
            <ListItem className="h-full bg-gradient-to-br from-blue-gray-900 to-blue-gray-800 text-white items-center justify-center flex flex-row">
              <button className="p-10 flex items-center justify-center">
                Servizi
              </button>
            </ListItem>
          </div>
          <div className="w-full w-all mb-5">
            <ListItem className="h-full bg-gradient-to-br from-blue-gray-900 to-blue-gray-800 text-white mb-4 sm:mr-2.5 items-center justify-center flex flex-row">
              <button className="p-10 flex items-center justify-center">
                Eventi
              </button>
            </ListItem>
          </div>
          <div className="w-full w-all mb-5">
            <ListItem className="h-full bg-gradient-to-br from-blue-gray-900 to-blue-gray-800 text-white items-center justify-center flex flex-row">
              <button className="p-10"> 
                <h2>
                  News
                </h2>
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
    <div className=" w-auto h-auto justify-center items-center ">
      <Card className="h-full items-center justify-center bg-gradient-to-br from-blue-gray-900 to-blue-gray-800 text-white mt-5">
        <CardHeader className=" ">
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
