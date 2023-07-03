import React, { useContext, useEffect, useState } from "react";
import { Form, Link, Navigate, useNavigate } from "react-router-dom";
// @ts-ignore
import {
  Stepper,
  Step,
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Radio,
  IconButton,
  // @ts-ignore
  InformationCircleIcon,
  // @ts-ignore
  Alert,
} from "@material-tailwind/react";
import AnimalSelect from "../../components/animalSelect";
import { FaGoogle, FaApple } from "react-icons/fa";
import AnimalCard from "../../components/animalCard";
import AnimalName from "../../components/AnimalName";
import { db } from "../../lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import AnimalTable from "../../components/AnimalTable";
import { UserContext } from "../../context/UserContext.jsx";
import CreateShop from "../../components/CreateShop";

const Register = () => {
  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState({});
  const [type, setType] = useState("");
  const [animal, setAnimal] = useState("");
  const [breed, setBreed] = useState("");
  const [listaAnimal, setListaAnimal] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [addingStatus, setStatus] = useState(false);
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

  const catchAnimal = (v) => {
    setAnimal(v);
  };
  const catchBreed = (v) => {
    setBreed(v);
    setOpen(!open);
  };

  const catchOpen = (v) => {
    setOpen(v);
  };

  const catchNewAnimal = (v) => {
    const [nome, desc] = v;
    if (!nome) {
      return;
    }
    setListaAnimal([
      ...listaAnimal,
      { nome: nome, descrizione: desc, animal: animal, breed: breed },
    ]);
    setActiveStep(3);
  };

  useEffect(() => {
    setData({
      nome: nome,
      cognome: cognome,
      email: email,
      password: password,
      type: type,
      lista: listaAnimal,
    });
  }, [listaAnimal]);

  const [isChecked, setIsChecked] = useState(false);
  const [showWarningTerms, setShowWarningTerms] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
    setShowWarningTerms(false);
  };

  //caricamento dati su database

  // @ts-ignore
  const { sendRegister, signInWithGoogle } = useContext(UserContext);

  const handleRegister = (e) => {
    e.preventDefault();
    sendRegister(email, password);
  };
  const navigate = useNavigate();

  const signInGoogle = async () => {
    await signInWithGoogle();
    //<Navigate replace to="/home"/>;

    console.log("Viaggo verso la home e oltre");
    navigate("/home");
  };

  function allDataInserted() {
    if (
      nome != "" &&
      cognome != "" &&
      email != "" &&
      password != "" &&
      type != ""
    ) {
      console.log("dati inseriti");
      return true;
    } else {
      console.log("dati non inseriti");
      return false;
    }
  }

  const handleSubmit = (e) => {
    //console.log(e);
    e.preventDefault();

    if (allDataInserted() === true) {
      if (password.length >= 6) {
        changeStep(e);
      } else {
        alert("La password deve avere almeno 6 caratteri");
      }
    }
    if (isChecked == false) {
      console.log("non è checked");
      setShowWarningTerms(true);
    } else {
      console.log("Manca qualche dato nel form!");
    }
  };

  return (
    <div className="flex flex-col items-center max-w-8xl mx-auto justify-center ">
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
            onSubmit={handleSubmit}
          >
            <div className="mb-4 flex flex-col gap-6">
              <Input
                size="lg"
                label="Nome"
                type="text"
                id="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required={true}
              />
              <Input
                size="lg"
                label="Cognome"
                type="text"
                id="cognome"
                value={cognome}
                onChange={(e) => setCognome(e.target.value)}
                required={true}
              />
              <Input
                size="lg"
                label="Email"
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required={true}
              />
              <Input
                type="password"
                size="lg"
                label="Password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required={true}
              />
            </div>
            <div className="flex gap-10 justify-center">
              <Radio
                id="cliente"
                name="type"
                label="Cliente"
                value="cliente"
                onChange={(e) => setType(e.target.value)}
                required={true}
              />
              <Radio
                id="venditore"
                name="type"
                label="Venditore"
                value="venditore"
                onChange={(e) => setType(e.target.value)}
                required={true}
              />
            </div>
            {showWarningTerms && (
              <Typography variant="small" color="red">
                Please agree to the Terms and Conditions!
              </Typography>
            )}
            <Checkbox
              label={
                <Typography
                  variant="small"
                  color="gray"
                  className="flex w-full items-center font-normal justify-center"
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
              required={true}
              containerProps={{ className: "-ml-2.5 " }}
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            {showWarningTerms && (
              <Typography variant="small" color="red">
                Please agree to the Terms and Conditions!
              </Typography>
            )}
            <Button className="mt-6" fullWidth type="submit">
              Register
            </Button>
            <Typography color="gray" className="mt-4 text-center font-normal">
              Already have an account?{" "}
              <Link
                to={"/login"}
                className="font-medium text-blue-500 transition-colors hover:text-blue-700"
              >
                Sign In
              </Link>
            </Typography>
            <div className="flex gap-4 items-center w-full justify-center mt-2">
              <IconButton
                onClick={signInGoogle}
                className="bg-[#ea4335] rounded hover:shadow-[#ea4335]/20 focus:shadow-[#ea4335]/20 active:shadow-[#ea4335]/10"
              >
                <FaGoogle className="w-4 h-4" />
              </IconButton>
              <IconButton className="bg-[#000000] rounded hover:shadow-[#ea4335]/20 focus:shadow-[#ea4335]/20 active:shadow-[#ea4335]/10">
                <FaApple className="w-4 h-4" />
              </IconButton>
            </div>
          </form>
        )}
      </Card>
      {activeStep === 1 && isChecked && (
        <Authentication changeStep={changeStep} handlePrev={handlePrev} />
      )}
      {activeStep === 2 && type === "cliente" && (
        <>
          // @ts-ignore
          <AnimalSelection onSendAnimal={catchAnimal} handlePrev={handlePrev} />
          {animal === "Cane" && <AnimalDogList onSendBreed={catchBreed} />}
          {open ? (
            <AnimalName sendOpen={catchOpen} sendValue={catchNewAnimal} />
          ) : null}
        </>
      )}
      {activeStep === 2 && type === "venditore" && (
        <>
          <CreateShop></CreateShop>
        </>
      )}
      {activeStep === 3 && type === "cliente" && (
        <AnimalTable
          TABLE_ROWS={listaAnimal}
          sendStatus={(v) => {
            setStatus(v);
            setActiveStep(4);
          }}
        />
      )}
      {activeStep === 4 && type === "cliente" && addingStatus && (
        <>
          // @ts-ignore
          <AnimalSelection onSendAnimal={catchAnimal} handlePrev={handlePrev} />
          {animal === "Cane" && <AnimalDogList onSendBreed={catchBreed} />}
          {open ? (
            <AnimalName sendOpen={catchOpen} sendValue={catchNewAnimal} />
          ) : null}
        </>
      )}
      <pre>{JSON.stringify(data, 2, null)}</pre>

      <h1>I dati inseriti sono: </h1>
      <h5>
        Nome:
        {
          // @ts-ignore
          data.nome
        }
      </h5>
      <h5>
        Cognome:
        {
          // @ts-ignore
          data.cognome
        }
      </h5>
      <h5>
        Email:
        {
          // @ts-ignore
          data.email
        }
      </h5>
      <h5>
        Password:
        {
          // @ts-ignore
          data.password
        }
      </h5>
      <h5>
        Type:
        {
          // @ts-ignore
          data.type
        }
      </h5>
      <h5>
        Lista:{" "}
        {JSON.stringify(
          // @ts-ignore
          data.lista,
          2,
          null
        )}
      </h5>
    </div>
  );
};
export default Register;

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
          <div
            className="w-full"
            id="confirmationCode"
            // @ts-ignore
            type="text"
          >
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

const AnimalSelection = ({ onSendAnimal, changeStep, handlePrev }) => {
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
    <div className="flex flex-col items-center max-w-md mx-auto">
      <Form
        onSubmit={changeStep}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <h2>Select your animal</h2>
        <AnimalSelect lista={animal} onSendValue={catchValue} />
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
      </Form>
    </div>
  );
};

const AnimalDogList = ({ onSendBreed }) => {
  const [listaDog, setListaDog] = useState([]);
  //da modificare, selezione cane
  const [selectedDog, setSelectedDog] = useState(null);
  //da modificare funzione che seleziona che tipo di cane l'utente voglia
  const handleClick = (breed) => {
    console.log(breed);
    setSelectedDog(breed);
    onSendBreed(breed);
  };

  useEffect(() => {
    fetch("https://dog.ceo/api/breeds/list/all")
      .then((response) => response.json())
      .then((json) => {
        const keys = Object.keys(json.message);
        setListaDog(keys);
      });
  }, []);

  return (
    <div className="flex flex-wrap h-[725px] w-90 overflow-auto rounded-lg border-solid border-4 border-red-500 mb-4">
      <div className="grid grid-cols-3 gap-4 p-4">
        {listaDog.map((dog) => (
          <div key={dog} onClick={() => handleClick(dog)}>
            <AnimalCard
              breed={dog}
              titolo={dog}
              selected={dog === selectedDog}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
