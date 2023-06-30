import React, { useEffect, useState } from "react";
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

const CreateShop = ({ sendData }) => {
  const [nome, setNome] = useState("");
  const [service, setService] = useState("");
  const [tel, setTel] = useState("");
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({
    name: nome,
    cell: tel,
    service: service,
    desc: text,
  });

  useEffect(() => {
    const getData = async () => {
      await setData({
        name: nome,
        cell: tel,
        service: service,
        desc: text,
      });
    };
    getData();
  }, [nome, tel, service, text]);

  const onSendData = () => {
    if (nome === "") {
      alert("nome vuoto");
      return;
    }
    if (tel === "") {
      alert("tel vuoto");
      return;
    }
    if (service === "") {
      alert("service vuoto");
      return;
    }
    sendData?.(data);
  };

  const onChangeAltro = (e) => {
    setService(e.target.value);
  };

  const onChangeService = (e) => {
    setService(e);
    if (e === "altro") {
      setOpen(true);
    }
  };

  const tabs = [
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
    <>
      <Tabs value="shop">
        <TabsHeader>
          {tabs.map(({ label, value }) => (
            <Tab key={value} value={value}>
              <div className="flex items-center gap-2">{label}</div>
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody>
          <TabPanel key="shop" value="shop">
            <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
              <div className="mb-4 flex flex-col gap-6">
                <Input
                  size="lg"
                  label="Nome"
                  type="text"
                  required={true}
                  onChange={(e) => setNome(e.target.value)}
                />
                <Input
                  size="lg"
                  label="Telefono"
                  type="tel"
                  required={true}
                  onChange={(e) => setTel(e.target.value)}
                />
                <Select size="lg" label="Servizio" onChange={onChangeService}>
                  <Option key="alimenti" value="alimenti">
                    Negozio di alimenti
                  </Option>
                  <Option key="toelettatura" value="toelettatura">
                    Toelettatura
                  </Option>
                  <Option key="veterinaria" value="veterinaria">
                    Clinica veterinaria
                  </Option>
                  <Option key="addestramento" value="addestramento">
                    Negozio di addestramento
                  </Option>
                  <Option key="pet-sitting" value="pet-sitting">
                    Negozio di adozione
                  </Option>
                  <Option key="altro" value="altro">
                    Altro
                  </Option>
                </Select>
                {open && (
                  <Input
                    size="lg"
                    label="Altro servizio"
                    onChange={onChangeAltro}
                  />
                )}
                <Textarea
                  size="lg"
                  label="Descrizione"
                  onChange={(e) => setText(e.target.value)}
                ></Textarea>
                {
                  //Pilla deve mettere la mappa con la localizzazione
                }
                <h1>Mappa</h1>
              </div>
              <Button className="mt-6" fullWidth onClick={onSendData}>
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
    </>
  );
};

export default CreateShop;
