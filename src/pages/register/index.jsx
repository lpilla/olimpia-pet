import React from "react";
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

const Register = () => {
  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState({});
  const [type, setType] = useState(false);
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
    });
    handleNext();
  };
  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

  return (
    <div className="flex flex-col items-center max-w-8xl mx-auto ">
      <div className="w-full py-4 px-8">
        <Stepper
          activeStep={activeStep}
          isLastStep={(value) => setIsLastStep(value)}
          isFirstStep={(value) => setIsFirstStep(value)}
        >
          <Step>1</Step>
          <Step>2</Step>
          <Step>3</Step>
        </Stepper>
      </div>
      <Typography variant="h4" color="blue-gray" className="text-left">
        Registrati
      </Typography>
      <Typography color="gray" className="mt-1 font-normal text-left">
        Inserisci i tuoi dati
      </Typography>
      <Card color="transparent" shadow={false}>
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

      {activeStep === 1 && (
        <Authentication changeStep={changeStep} handlePrev={handlePrev} />
      )}

      {/*<h1>I dati inseriti sono: </h1>
      <h5>Nome:{data.nome}</h5>
      <h5>Cognome:{data.cognome}</h5>
      <h5>Email:{data.email}</h5>
      <h5>Password:{data.password}</h5>
      <h5>type :{data.type}</h5>*/}
    </div>
  );
};
export default Register;

//Metto un nome a caso, ma dovrebbe essere l'autenticazione dell'email
const Authentication = ({ changeStep, handlePrev }) => {
  return (
    <div className="flex max-w-md mx-auto p-8 items-left max-w-8xl">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={changeStep}
      >
        <h2 className="text-xl font-bold mb-4">
          Controllare la posta ed inserisci il codice ricevuto
        </h2>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="confirmationCode"
          >
            Codice di 6 cifre
          </label>
          <div className="w-full" id="confirmationCode" type="text">
            <Input label="Codice Conferma " />
          </div>
        </div>
        <h4 className="text-sm mb-4">
          Non hai ricevuto nessuna email?
          <Link className="text-blue-500 hover:text-blue-700" to="/register">
            Richiedi nuovo codice
          </Link>
        </h4>
        <div className="flex items-center justify-between">
          <Button
            className="mt-6"
            type="button"
            color="red"
            onClick={handlePrev}
          >
            Indietro
          </Button>
          <Button className="mt-6" type="submit">
            Conferma
          </Button>
        </div>
      </form>
    </div>
  );
};
