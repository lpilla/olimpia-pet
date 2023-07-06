import {useContext, useState} from "react";
import {useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  List,
  Accordion,
  ListItem,
  AccordionHeader,
  Avatar,
  AccordionBody,
  ListItemPrefix,
} from "@material-tailwind/react";
import {ChevronDownIcon, PowerIcon} from "@heroicons/react/24/outline";
import {UserContext} from "../context/UserContext.jsx";
import Foto from "../pages/profile/profilo.jpg";


const HomeProfile = ({ user, logout }) => {
  const [open, setOpen] = useState(0);
  const { userObj } = useContext(UserContext)
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
  const navigate = useNavigate();
  const goToProfilePage = () => {
    navigate("/profile");
  };
  return (
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
              className="border-b-0 p-3 flex justify-between mw-full"
            >
              <div className={"min-w-[75px]"}>
                <Avatar src={Foto} alt="avatar" size="xl" />
              </div>
              <div className="mt-[-30px]">
                <h4 className="text-xl font-bold leading-0 ">{userObj.nome}</h4>
                <p className="text-sm">N° Animali: 1</p>
                <p className="text-sm">{user === undefined ? "..." : user?.name}</p>
              </div>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <ListItem onClick={goToProfilePage}>Profile</ListItem>
              <ListItem>Annunci</ListItem>
              <ListItem>Eventi</ListItem>
              <ListItem onClick={logout}>
                <ListItemPrefix>
                  <PowerIcon className="h-5 w-5" />
                </ListItemPrefix>
                Log Out
              </ListItem>
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
  );
};

export default HomeProfile;
