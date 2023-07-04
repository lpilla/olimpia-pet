import { Card, Chip, Input, Typography } from "@material-tailwind/react";
import React, { useContext, useEffect, useState } from "react";
import { collection, query, getDocs, where } from "firebase/firestore";
import { db } from "../../lib/firebase.js";
import { UserContext } from "../../context/UserContext.jsx";
import ShopRow from "./components/ShopRow.jsx";

const TABLE_HEAD = ["Name of Shop", "Street address", "services", ""];

const HomeVenditore = () => {
  const [editable, setEditable] = useState(false);
  const { user } = useContext(UserContext);
  const [TABLE_ROWS, setTableRows] = useState([]);
  const [ids, setIds] = useState([]);
  useEffect(() => {
    console.log("table rows: ", TABLE_ROWS);
  }, [TABLE_ROWS]);
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
          console.log(doc.id);
          setIds([...ids, doc.id]);
          setTableRows((prev) => [...prev, doc.data()]);
          // doc.data() is never undefined for query doc snapshots
        });
      }
    };

    getData(user);
  }, [user]);
  return (
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
              <ShopRow shop={shop} classes={classes} id={ids[index]}></ShopRow>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
};

export default HomeVenditore;
