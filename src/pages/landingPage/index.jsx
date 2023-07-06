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
      <div className="flex items-center justify-center py-3">
        <Navbar
          variant="gradient"
          color="blue-gray"
          className="w-full px-4 py-3 flex items-center bg-blue-gray-900"
        >
          <div className="ml-2 mr-4">
            <img
              src="src/components/FotoAnimali/logo/logo pet trip.png"
              alt="logo sito"
              className="h-20"
            />
          </div>

          <div className="relative flex w-full gap-2 w-all">
            <Input
              type="seach"
              color="white"
              label="Type here..."
              className="pr-20 bg-blue-gray-800 rounded-full"
              containerProps={{
                className: "w-full",
              }}
            />
            <Button
              size="sm"
              color="white"
              className="right-1 top-1 rounded"
            >
              Search
            </Button>
          </div>
        </Navbar>
      </div>
      <Dashboard />
    </>
  );
};

export default LandingPage;

const Dashboard = () => {
  return (
    <div className="flex flex-col md:flex-row md:h-full">
      <div className="md:w-1/5 h-full bg-gradient-to-br from-blue-gray-900 to-blue-gray-800 rounded-r-xl">
        <List className="p-4">
          <ListItem className="flex items-center mb-4">
            <button className="p-4 flex items-center justify-center w-full text-white rounded-lg">
              Viaggi
            </button>
          </ListItem>
          <ListItem className="flex items-center mb-4">
            <button className="p-4 flex items-center justify-center w-full text-white rounded-lg">
              Servizi
            </button>
          </ListItem>
          <ListItem className="flex items-center mb-4">
            <button className="p-4 flex items-center justify-center w-full text-white rounded-lg">
              Eventi
            </button>
          </ListItem>
          <ListItem className="flex items-center">
            <button className="p-4 flex items-center justify-center w-full text-white rounded-lg">
              News
            </button>
          </ListItem>
        </List>
      </div>
      <div className="md:w-4/5 h-full flex flex-col">
        <div className="flex-1 max-h-full overflow-y-auto bg-white rounded-l-xl">
          <Card className="my-4 mx-8 p-4 rounded-xl border-blue-gray-900">
            <CardHeader color="blue-gray" contentPosition="none">
              <div className="w-full flex items-center justify-between ml-3">
                <h2 className="text-white text-lg font-medium justify-center"> MAPPA </h2>
              </div>
            </CardHeader>
            <CardBody>
              <Typography>
                
              </Typography>
            </CardBody>
            <CardFooter></CardFooter>
          </Card>
        </div>
        <div className="h-16 bg-white rounded-b-xl"></div>
      </div>
    </div>
  );
};