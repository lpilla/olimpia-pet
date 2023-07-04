import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Avatar, Input, Button,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import io from "../../assets/images/Io_circle.png";
import {useContext, useState} from "react";
import {UserContext} from "../../context/UserContext.jsx";
export default function Profile() {
  const [index, setIndex] = useState(0);

  const handleIndex = (value) => {
    setIndex(value);
  };

  return (
    <div className="flex flex-row h-[calc(100vh-1rem)] m-2">
      <Card className="w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 border-green-400 border-solid border-2">
        <div className="flex flex-col items-center justify-center w-full text-center ">
          <Avatar
            src={io}
            alt="avatar"
            withBorder={true}
            className="p-0.5"
            size="xxl"
          />
        </div>
        <List>
          <ListItem onClick={() => handleIndex(0)}>
            <ListItemPrefix>
              <UserCircleIcon className="h-5 w-5" />
            </ListItemPrefix>
            Profile
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <InboxIcon className="h-5 w-5" />
            </ListItemPrefix>
            Inbox
            <ListItemSuffix>
              <Chip
                value="14"
                size="sm"
                variant="ghost"
                color="blue-gray"
                className="rounded-full"
              />
            </ListItemSuffix>
          </ListItem>
          <ListItem onClick={() => handleIndex(2)}>
            <ListItemPrefix>
              <Cog6ToothIcon className="h-5 w-5" />
            </ListItemPrefix>
            Settings
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <PowerIcon className="h-5 w-5" />
            </ListItemPrefix>
            Log Out
          </ListItem>
        </List>
      </Card>
      <div className="flex justify-center items-center w-full max-w-[calc(100%-20rem)] border-2 border-green-400">
        {index === 0 && <ProfileSettings />}
        {index === 2 && <Settings />}
      </div>
    </div>
  );
}

const ProfileSettings = () => {

  const {user,updateDisplayName} = useContext(UserContext);
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState(user.displayName);
  const [previousName, setPreviousName] = useState(user.displayName);

  const handleEditClick = () => {
    setEditing(true);
  }

  const handleConfirmClick = async () => {
    await updateDisplayName(newName);
    setEditing(false);
    setPreviousName(newName);
  }

  const handleUndoClick = () => {
    setNewName(previousName);
    setEditing(false);
  }
  console.log(user)
  return (
      <div className="grid gap-4 grid-cols-1 grid-rows-4 w-full h-full">
        <div className="flex flex-col items-center justify-center w-full text-center ">
          <Avatar
              src={io}
              alt="avatar"
              withBorder={true}
              className="p-0.5"
              size="xxl"
          />
        </div>
        {editing ? (
            <div className="flex items-center justify-center">
              <Input
                  label={"nome"}
                  type={"Text"}
                  className="focus:!border-t-blue-500 focus:!border-blue-500 ring-4 ring-transparent focus:ring-blue-500/20 !border !border-blue-gray-50 bg-white shadow-lg shadow-blue-gray-900/5 placeholder:text-blue-gray-200 text-blue-gray-500"
                  labelProps={{className: "hidden"}}
                  required={true}
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
              />
              <button onClick={handleConfirmClick}>Confirm</button>
              <button onClick={handleUndoClick}>Undo</button>
            </div>
        ) : (
            <div className="grid grid-cols-2 gap-[20rem] grid-rows-1 w-[full-4rem] h-[5rem] border-2 border-r-2 rounded-lg border-blue-300 ml-[10rem] mr-[10rem]">
              <div className="flex justify-center items-center">
                <Typography variant="h4" className="flex pr-4">Nome: </Typography>
                <Typography variant="h5"> {previousName}</Typography>
              </div>
              <div className="flex justify-center items-center">
                <Button variant="text" onClick={handleEditClick}>Edit</Button>
              </div>
            </div>
        )}
        {editing ? (
            <div className="flex items-center justify-center">
              <Input
                  label={"nome"}
                  type={"Text"}
                  className="focus:!border-t-blue-500 focus:!border-blue-500 ring-4 ring-transparent focus:ring-blue-500/20 !border !border-blue-gray-50 bg-white shadow-lg shadow-blue-gray-900/5 placeholder:text-blue-gray-200 text-blue-gray-500"
                  labelProps={{className: "hidden"}}
                  required={true}
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
              />
              <button onClick={handleConfirmClick}>Confirm</button>
              <button onClick={handleUndoClick}>Undo</button>
            </div>
        ) : (
            <div className="grid grid-cols-2 gap-[20rem] grid-rows-1 w-[full-4rem] h-[5rem] border-2 border-r-2 rounded-lg border-blue-300 ml-[10rem] mr-[10rem]">
              <div className="flex justify-center items-center">
                <Typography variant="h4" className="flex pr-4">Cognome: </Typography>
                <Typography variant="h5"> {previousName}</Typography>
              </div>
              <div className="flex justify-center items-center">
                <Button variant="text" onClick={handleEditClick}>Edit</Button>
              </div>
            </div>
        )}
      </div>
  );
};

const Settings = () => {
    return (
      <div>
        <h1>Settings</h1>
      </div>
    );
  };
