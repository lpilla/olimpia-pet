import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  Stepper,
  Step,
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Radio,
} from "@material-tailwind/react";
import AnimalSelect from "../../components/animalSelect";

const Register = () => {
  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState({});
  const [type, setType] = useState(false);
  const [animal, setAnimal] = useState("");
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);
  const changeStep = (e) => {
    e.preventDefault();
    setData({
      nome: nome,
      cognome: cognome,
      email: email,
      password: password,
      type: type,
      animal: animal,
    });
    handleNext();
  };
  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

  const catchAnimal = (v) => {
    setAnimal(v);
  };

  useEffect(() => {
    setData({
      nome: nome,
      cognome: cognome,
      email: email,
      password: password,
      type: type,
      animal: animal,
    });
  }, [animal]);

  return (
    <div className="flex flex-col items-center max-w-8xl mx-auto">
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Registrati
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter your details to register.
        </Typography>
        {activeStep === 0 && (
          <form
            action=""
            className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
            onSubmit={changeStep}
          >
            <div className="mb-4 flex flex-col gap-6">
              <Input
                size="lg"
                label="Nome"
                type="text"
                id="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
              <Input
                size="lg"
                label="Cognome"
                type="text"
                id="cognome"
                value={cognome}
                onChange={(e) => setCognome(e.target.value)}
              />
              <Input
                size="lg"
                label="Email"
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type="password"
                size="lg"
                label="Password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex gap-10">
              <Radio
                id="cliente"
                name="type"
                label="Cliente"
                value="cliente"
                onChange={(e) => setType(e.target.value)}
              />
              <Radio
                id="venditore"
                name="type"
                label="Venditore"
                value="venditore"
                onChange={(e) => setType(e.target.value)}
              />
            </div>
            <Checkbox
              label={
                <Typography
                  variant="small"
                  color="gray"
                  className="flex items-center font-normal"
                >
                  I agree the
                  <a
                    href="#"
                    className="font-medium transition-colors hover:text-blue-500"
                  >
                    &nbsp;Terms and Conditions
                  </a>
                </Typography>
              }
              containerProps={{ className: "-ml-2.5" }}
            />

            <Button className="mt-6" fullWidth type="submit">
              Register
            </Button>
            <Typography color="gray" className="mt-4 text-center font-normal">
              Already have an account?{" "}
              <a
                href="#"
                className="font-medium text-blue-500 transition-colors hover:text-blue-700"
              >
                Sign In
              </a>
            </Typography>
          </form>
        )}
      </Card>
      {activeStep === 1 && <Authentication />}
      <div className="w-full py-4 px-8">
        <Stepper
          activeStep={activeStep}
          isLastStep={(value) => setIsLastStep(value)}
          isFirstStep={(value) => setIsFirstStep(value)}
        >
          <Step onClick={() => setActiveStep(0)}>1</Step>
          <Step onClick={() => setActiveStep(1)}>2</Step>
          <Step onClick={() => setActiveStep(2)}>3</Step>
        </Stepper>
        {activeStep === 1 && (
          <div className="mt-16 flex justify-between">
            <Button onClick={handlePrev} disabled={isFirstStep}>
              Prev
            </Button>
            <Button onClick={handleNext} disabled={isLastStep}>
              Next
            </Button>
          </div>
        )}
        {activeStep === 2 && (
          <AnimalSelection onSendAnimal={catchAnimal}></AnimalSelection>
        )}
      </div>
      <h1>I dati inseriti sono: </h1>
      <h5>Nome:{data.nome}</h5>
      <h5>Cognome:{data.cognome}</h5>
      <h5>Email:{data.email}</h5>
      <h5>Password:{data.password}</h5>
      <h5>Type:{data.type}</h5>
      <h5>Animal:{data.animal} </h5>
    </div>
  );
};
export default Register;

const Authentication = () => {
  return (
    <div>
      <form className="divAuthentication" onSubmit={() => setStep(3)}>
        <h2 className="objAuthentication">
          Controllare la posta ed inserisci il codice ricevuto
        </h2>
        <input
          className="objAuthentication"
          type="text"
          placeholder="Codice di 6 cifre"
        />
        <h4 className="objAuthenticat<ion">
          Non hai ricevuto nessuna email?
          <Link className="link_to_register" to="/register">
            Richiedi nuovo codice
          </Link>
        </h4>
        <button className="objAuthentication" onClick={() => setStep(1)}>
          Torna indietro
        </button>
      </form>
    </div>
  );
};

const AnimalSelection = ({ onSendAnimal }) => {
  const animal = ["Cane", "Gatto", "Criceto", "Pappagallo", "Scimmia"];
  const [value, setValue] = useState("");

  const catchValue = (v) => {
    setValue(v);
  };

  const sendAnimal = () => {
    onSendAnimal?.(value);
  };

  useEffect(() => {
    sendAnimal();
  }, [value]);

  return (
    <div className="flex flex-col items-center">
      <h2>Select your animal</h2>
      <AnimalSelect lista={animal} onSendValue={catchValue} />
    </div>
  );
};
