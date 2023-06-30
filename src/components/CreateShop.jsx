import React from "react";
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
    <Tabs value="dashboard">
      <TabsHeader>
        {data.map(({ label, value }) => (
          <Tab key={value} value={value}>
            <div className="flex items-center gap-2">{label}</div>
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        <TabPanel key="shop" value="shop">
          <form action="" className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
            <div className="mb-4 flex flex-col gap-6">
              <Input size="lg" label="Nome" type="text" required={true} />
              <Input size="lg" label="Indirizzo" type="text" required={true} />
              <Select>
                <Option>Sto cazzo</Option>
              </Select>
              <Textarea size="lg" label="Descrizione"></Textarea>
            </div>
            <Button className="mt-6" fullWidth type="submit">
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
