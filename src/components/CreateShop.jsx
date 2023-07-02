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
} from "@material-tailwind/react";

const CreateShop = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
  };
  const [formData, setFormData] = useState({
    shopName: "",
    shopAddress: "",
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
                onChange={(e) =>
                  setFormData({ ...formData, shopAddress: e.target.value })
                }
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
                value={formData.shopDescription}
                onChange={(e) =>
                  setFormData({ ...formData, shopDescription: e.target.value })
                }
              ></Textarea>
            </div>
            <Button className="mt-6" fullWidth type="submit">
              Register
            </Button>
          </form>
          {JSON.stringify(formData, 2, null)}
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
