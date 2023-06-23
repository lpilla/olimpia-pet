import React from "react";
import face from "./face-2.jpg";
import {
  Card,
  List,
  ListItem,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Carousel,
  Avatar,
} from "@material-tailwind/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

export default function Example() {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <div>
      <Card className="bg-[#D9D9D9] fixed top-4 left-4 h-auto w-full max-w-[20rem] shadow-xl shadow-blue-gray-900/5">
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
    </div>
  );
}
