import React, { useState } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Input,
  Button,
  Textarea,
  Select,
  Option,
  List,
  ListItem,
} from "@material-tailwind/react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../lib/firebase";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../lib/firebase.js";
import { useNavigate } from "react-router-dom";

const CreateShop = () => {
  const [url, setUrl] = useState("");
  const navigate = useNavigate();

  const [file, setFile] = useState("");

  // progress
  const [percent, setPercent] = useState(0);

  // Handle file upload event and update state
  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  const handleUpload = () => {
    if (!file) {
      alert("Please upload an image first!");
    }

    const storageRef = ref(storage, `images/${file.name}`);

    // progress can be paused and resumed. It also exposes progress updates.
    // Receives the storage reference and the file to upload.
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        // update progress
        setPercent(percent);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
          setUrl(url);
          const docRef = await addDoc(collection(db, "stores"), {
            ...formData,
            icon: url,
          });

          console.log("Document written with ID: ", docRef.id);

          alert("created");
          navigate("/home");
        });
      }
    );
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      handleUpload();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const [results, setResults] = useState([]);

  const provider = new OpenStreetMapProvider();

  const handleChangeAddress = async (e) => {
    setFormData({ ...formData, shopAddress: e.target.value });
    const results = await provider.search({ query: e.target.value });
    setResults(results);
  };
  const [formData, setFormData] = useState({
    name: "",
    shopAddress: "",
    coordinates: null,
    shopType: "",
    description: "",
  });
  const data = [
    {
      label: "Negozio",
      value: "shop",
      desc: `Negozio negozioso`,
    },
    {
      label: "Servizio",
      value: "service",
      desc: `Servizio servizioso `,
    },
  ];
  return (
    <Tabs value="shop">
      <TabsHeader>
        {data.map(({ label, value }) => (
          <Tab key={value} value={value}>
            <div className="flex items-center gap-2">{label}</div>
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        <TabPanel key="shop" value="shop">
          <form
            action=""
            className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
            onSubmit={handleSubmit}
          >
            <div className="mb-4 flex flex-col gap-6">
              <Input
                size="lg"
                label="Nome"
                type="text"
                required={true}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                value={formData.name}
              />
              <Input
                size="lg"
                label="Indirizzo"
                type="text"
                required={true}
                value={formData.shopAddress}
                onChange={(e) => handleChangeAddress(e)}
              />
              <List>
                {results?.map((result) => (
                  <ListItem
                    key={result.id}
                    onClick={() => {
                      setFormData({
                        ...formData,
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
              <Input
                type={"file"}
                accept="/image/*"
                onChange={handleChange}
                required
              />

              <Select
                label={"servizio"}
                onChange={(e) => setFormData({ ...formData, shopType: e })}
                className={"text-black"}
                required={true}
              >
                <Option value={"petShop"}>Pet Shop</Option>
                <Option value={"veterinario"}>Veterinario</Option>
              </Select>
              <Textarea
                size="lg"
                label="Descrizione"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              ></Textarea>
            </div>
            <Button
              className="mt-6"
              fullWidth
              type="submit"
              disabled={formData.coordinates === null}
            >
              Register
            </Button>
          </form>
        </TabPanel>
        <TabPanel key="service" value="service">
          <h1>Sedia</h1>
          <input></input>
        </TabPanel>
      </TabsBody>
    </Tabs>
  );
};

export default CreateShop;
