import {
  Button,
  Chip,
  Input,
  List,
  ListItem,
  Typography,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import { db } from "../../../lib/firebase.js";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const ShopRow = ({ shop, classes, id }) => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    console.log(id);
  }, [id]);

  const handleOpen = () => setOpen((p) => !p);

  const [editable, setEditable] = useState(false);
  // const provider = new GoogleProvider({
  //   apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  // });
  const [results, setResults] = useState([]);

  const provider = new OpenStreetMapProvider();
  const saveData = async () => {
    console.log(shopObj);
    if (
      shopObj.name !== shop.name ||
      shopObj.shopAddress !== shop.shopAddress
    ) {
      try {
        const docRef = doc(db, "stores", id);
        await updateDoc(docRef, shopObj);
        const updatedDoc = await getDoc(docRef);
        if (updatedDoc.exists()) {
          const updatedData = updatedDoc.data();
          console.log(updatedData);
          window.location.reload(false);
        } else {
          console.log("Document does not exist");
        }
        handleOpen();
        setEditable((p) => !p);
      } catch (e) {
        alert(e);
      }
    }
  };

  const handleChangeAddress = async (e) => {
    setShopObj({ ...shopObj, shopAddress: e.target.value });
    const results = await provider.search({ query: e.target.value });
    console.log(results);
    setResults(results);
  };
  useEffect(() => {
    if (!editable) {
      setShopObj(shop);
    }
  }, [editable]);
  // const [shopObj, setShopObj] = useState(shop);
  const [shopObj, setShopObj] = useState(shop);
  return (
    <>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Modifica Dati</DialogHeader>
        <DialogBody divider>
          Stai andando a modificare i dati del tuo negozio, questa azione è
          irreversibile e in caso di errori non sarà più possibile ritornare
          indietro, sei sicuro di volere continuare?
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={saveData}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
      <tr key={name}>
        <td className={classes}>
          <Input
            label={shop.name}
            disabled={!editable}
            value={editable ? shopObj.name : shop.name}
            onChange={(e) => {
              setShopObj({ ...shopObj, name: e.target.value });
            }}
          />
        </td>
        <td className={classes}>
          <Input
            label={shop.shopAddress}
            disabled={!editable}
            onChange={(e) => {
              handleChangeAddress(e);
            }}
            value={editable ? shopObj.shopAddress : shop.shopAddress}
          />
          <List>
            {results?.map((result) => (
              <ListItem
                key={result.id}
                onClick={() => {
                  setShopObj({
                    ...shopObj,
                    shopAddress: result.label,
                    coordinates: [result.y, result.x],
                  });
                  setResults([]);
                }}
              >
                {result.label}
              </ListItem>
            ))}
          </List>
        </td>
        <td className={classes}>
          <div className="flex gap-2">
            {shop.categories?.map((cat) => {
              return <Chip value={cat} />;
            })}
          </div>
        </td>
        <td className={classes}>
          <div className="flex w-max gap-4">
            {editable && (
              <Button color="blue" onClick={handleOpen}>
                Modify Data
              </Button>
            )}

            <Button
              color="red"
              onClick={() => {
                setEditable((prev) => !prev);
              }}
            >
              {editable ? "Undo" : "Edit"}
            </Button>
          </div>
        </td>
      </tr>
    </>
  );
};

export default ShopRow;
