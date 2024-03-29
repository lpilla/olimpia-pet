import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Avatar,
  Input,
  Button,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import fotoProfilo from "./profilo.jpg";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext.jsx";
import ProfileAnimalTable from "./components/ProfileAnimalTable";
import {db} from "../../lib/firebase.js";
import {collection, doc, getDocs, query, updateDoc, where} from "firebase/firestore";
import * as updatedDoc from "autoprefixer";
import {useNavigate} from "react-router-dom";
export default function Profile() {
  const [index, setIndex] = useState(0);
  const { logOut } = useContext(UserContext);
  const handleIndex = (value) => {
    setIndex(value);
  };
  const navigate = useNavigate()
  const logout = async ()=>{
    await logOut
    navigate ("/login");
  }

  return (
    <div className="flex flex-row h-[calc(100vh-1rem)] m-2">
      <Card className="flex w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 border-green-400 border-solid border-2">
        <div className="flex flex-col items-center justify-center w-full text-center ">
          <Avatar
            src={fotoProfilo}
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
          <ListItem onClick={() => handleIndex(1)}>
            <ListItemPrefix>
              <InboxIcon className="h-5 w-5" />
            </ListItemPrefix>
            Animali
          </ListItem>
          <ListItem onClick={() => handleIndex(2)}>
            <ListItemPrefix>
              <Cog6ToothIcon className="h-5 w-5" />
            </ListItemPrefix>
            Settings
          </ListItem>
          <ListItem onClick={logout}>
            <ListItemPrefix>
              <PowerIcon className="h-5 w-5" />
            </ListItemPrefix>
            Logout
          </ListItem>
        </List>
      </Card>
      <div className="flex  w-full max-w-[calc(100%-20rem)] border-2 border-green-400">
        {index === 0 && <ProfileSettings />}
        {index === 1 && <ProfileAnimalTable />}
        {index === 2 && <Settings />}
      </div>
    </div>
  );
}

const ProfileSettings = () => {
  const { user, updateDisplayName, userObj } = useContext(UserContext);
  const [editing, setEditing] = useState(0);
  const [newName, setNewName] = useState(userObj.nome);
  const [previousName, setPreviousName] = useState(userObj.nome);
  const [newSurname, setNewSurname] = useState(userObj.cognome);
  const [previousSurname, setPreviousSurname] = useState(userObj.cognome);

  const handleEditClick = (index) => {
    setEditing(index);
  };

  const handleConfirmClick = async () => {
    if (editing === 1) {
      setPreviousName(newName);
      setEditing(0);

      await updateData();
    }
    if (editing === 2) {
      //update registro
      setPreviousSurname(newSurname);
      setEditing(0);
      await updateData();
    }
  };

  const newUserObj = userObj

  const [ids, setIds] = useState([]);

  useEffect(() => {
    console.log(ids);
  }, [ids]);

  useEffect(() => {
    const getData = async (user) => {
      if (user) {
        const q = query(
            collection(db, "users"),
            where("createdBy", "==", user.uid)
        );
        const myRows = [];
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          console.log("id: ", doc.id);
          setIds((ids) => [...ids, doc.id]);
        });
      }
    };

    getData(user);
  }, [user]);

  const navigate = useNavigate()
  const updateData = async () => {
    if (userObj.nome !== newName)
    {
      newUserObj.nome = newName
    }
    if (userObj.cognome !== newSurname)
    {
      newUserObj.cognome = newSurname
    }
    const docRef = doc(db, "users", ids[0]); // ottenere il riferimento al documento corretto
    const profiloAggiornato = {
      data : newUserObj
    };
    await updateDoc(docRef, profiloAggiornato);
    console.log("Dati aggiornati");
    navigate("/home");
  };

  const handleUndoClick = () => {
    if (editing === 1) {
      setNewName(previousName);
    }
    if (editing === 2) {
      setNewSurname(previousSurname);
    }
    setEditing(0);
  };
  console.log(user);
  return (
    <div className="grid gap-4 grid-cols-1 grid-rows-4 w-full h-full">
      <div className="flex flex-col items-center justify-center w-full text-center ">
        <Avatar
          src={fotoProfilo}
          alt="avatar"
          withBorder={true}
          className="p-0.5"
          size="xxl"
        />
      </div>
      {editing === 1 ? (
        <div className="grid grid-cols-2 gap-[20rem] grid-rows-1 w-[full-4rem] h-[5rem] border-2 border-r-2 rounded-lg border-blue-300 ml-[10rem] mr-[10rem]">
          <div className="flex justify-center items-center ">
            <Input
              label={"nome"}
              type={"Text"}
              className="focus:!border-t-blue-500 focus:!border-blue-500 ring-4 ring-transparent focus:ring-blue-500/20 !border !border-blue-gray-50 bg-white shadow-lg shadow-blue-gray-900/5 placeholder:text-blue-gray-200 text-blue-gray-500"
              labelProps={{ className: "hidden" }}
              required={true}
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </div>
          <div className="flex space-x-4 justify-center items-center">
            <Button variant="text" onClick={handleConfirmClick}>
              Confirm
            </Button>
            <Button
              variant="text"
              className="text-red-500"
              onClick={handleUndoClick}
            >
              Undo
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-[20rem] grid-rows-1 w-[full-4rem] h-[5rem] border-2 border-r-2 rounded-lg border-blue-300 ml-[10rem] mr-[10rem]">
          <div className="flex items-center pl-10">
            <Typography variant="h4" className="flex pr-4">
              Nome:{" "}
            </Typography>
            <Typography variant="h5"> {previousName}</Typography>
          </div>
          <div className="flex justify-center items-center">
            <Button variant="text" onClick={() => handleEditClick(1)}>
              Edit
            </Button>
          </div>
        </div>
      )}
      {editing === 2 ? (
          <div className="grid grid-cols-2 gap-[20rem] grid-rows-1 w-[full-4rem] h-[5rem] border-2 border-r-2 rounded-lg border-blue-300 ml-[10rem] mr-[10rem]">
            <div className="flex justify-center items-center ">
              <Input
                  label={"cognome"}
                  type={"Text"}
                  className="focus:!border-t-blue-500 focus:!border-blue-500 ring-4 ring-transparent focus:ring-blue-500/20 !border !border-blue-gray-50 bg-white shadow-lg shadow-blue-gray-900/5 placeholder:text-blue-gray-200 text-blue-gray-500"
                  labelProps={{ className: "hidden" }}
                  required={true}
                  value={newSurname}
                  onChange={(e) => setNewSurname(e.target.value)}
              />
            </div>
            <div className="flex space-x-4 justify-center items-center">
              <Button variant="text" onClick={handleConfirmClick}>
                Confirm
              </Button>
              <Button
                  variant="text"
                  className="text-red-500"
                  onClick={handleUndoClick}
              >
                Undo
              </Button>
            </div>
          </div>
      ) : (
          <div className="grid grid-cols-2 gap-[20rem] grid-rows-1 w-[full-4rem] h-[5rem] border-2 border-r-2 rounded-lg border-blue-300 ml-[10rem] mr-[10rem]">
            <div className="flex items-center pl-10">
              <Typography variant="h4" className="flex pr-4">
                Cognome:{" "}
              </Typography>
              <Typography variant="h5"> {previousSurname}</Typography>
            </div>
            <div className="flex justify-center items-center">
              <Button variant="text" onClick={() => handleEditClick(2)}>
                Edit
              </Button>
            </div>
          </div>
      )}
      <div className="flex pl-10 w-[full-4rem] h-[5rem] border-2 border-r-2 rounded-lg border-blue-300 ml-[10rem] mr-[10rem]">
        <div className="flex justify-center items-center">
          <Typography variant="h4" className="flex pr-4">
            Email:{" "}
          </Typography>
          <Typography variant="h5"> {userObj.email}</Typography>
        </div>
      </div>
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
