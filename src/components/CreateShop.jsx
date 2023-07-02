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
import { OpenStreetMapProvider } from "leaflet-geosearch";

const CreateShop = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const [results, setResults] = useState([]);

  const provider = new OpenStreetMapProvider();

  const handleChangeAddress = async (e) => {
    setFormData({ ...formData, shopAddress: e.target.value });
    const results = await provider.search({ query: e.target.value });
    setResults(results);
  };
  const [formData, setFormData] = useState({
    shopName: "",
    shopAddress: "",
    shopCoordinates: null,
    shopType: "",
    shopDescription: "",
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
                  setFormData({ ...formData, shopName: e.target.value })
                }
                value={formData.shopName}
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
                        shopCoordinates: [result.x, result.y],
                      });
                      setResults([]);
                    }}
                  >
                    {result.label}
                  </ListItem>
                ))}
              </List>
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
                value={formData.shopDescription}
                onChange={(e) =>
                  setFormData({ ...formData, shopDescription: e.target.value })
                }
              ></Textarea>
            </div>
            <Button
              className="mt-6"
              fullWidth
              type="submit"
              disabled={formData.shopCoordinates === null}
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
