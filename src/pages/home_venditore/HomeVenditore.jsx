import {
  Card,
  Chip,
  IconButton,
  Input,
  Typography,
} from "@material-tailwind/react";
import React, { useContext, useEffect, useState } from "react";
import { collection, query, getDocs, where } from "firebase/firestore";
import { db } from "../../lib/firebase.js";
import { UserContext } from "../../context/UserContext.jsx";
import ShopRow from "./components/ShopRow.jsx";
import CreateShop from "../../components/CreateShop.jsx";

const TABLE_HEAD = ["Name of Shop", "Street address", "services", ""];

const HomeVenditore = () => {
  const [showCreateShop, setShowCreateShop] = useState(false);
  const [editable, setEditable] = useState(false);
  const { user } = useContext(UserContext);
  const [TABLE_ROWS, setTableRows] = useState([]);
  const [ids, setIds] = useState([]);
  useEffect(() => {
    console.log(ids);
  }, [ids]);

  useEffect(() => {
    const getData = async (user) => {
      if (user) {
        const q = query(
          collection(db, "stores"),
          where("createdBy", "==", user.uid)
        );
        const myRows = [];
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          console.log("id: ", doc.id);
          setIds((ids) => [...ids, doc.id]);
          setTableRows((prev) => [...prev, doc.data()]);
        });
      }
    };

    getData(user);
  }, [user]);
  return (
    <>
      <Card className="overflow-scroll h-full w-full">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS.map((shop, index) => {
              const classes = "p-4 border-b border-blue-gray-50";
              return (
                <div>
                  <ShopRow
                    shop={shop}
                    classes={classes}
                    id={ids[index]}
                  ></ShopRow>
                </div>
              );
            })}
          </tbody>
        </table>
      </Card>
      <IconButton onClick={() => setShowCreateShop((p) => !p)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path
            fillRule="evenodd"
            d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
            clipRule="evenodd"
          />
        </svg>
      </IconButton>
      {showCreateShop && <CreateShop></CreateShop>}
    </>
  );
};

export default HomeVenditore;
