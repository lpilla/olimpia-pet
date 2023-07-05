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
import { databaseContext } from "../../context/DatabaseContext";

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
    const id = new Date().getTime().toString();
    setListaAnimal([
      ...listaAnimal,
      { id: id, nome: nome, descrizione: desc, animal: animal, breed: breed },
    ]);
    setActiveStep(3);
  };

  const catchAnimalId = (id) => {
    const nuovaLista = listaAnimal.filter((animal) => animal.id !== id);
    setListaAnimal(nuovaLista);
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
  const {
    sendRegister,
    signInWithGoogle,
    isEmailAlreadyRegistered,
    updateDisplayName,
  } = useContext(UserContext);

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
      console.log("Dati nel form inseriti correttamente");
      return true;
    } else {
      console.log("Dati nel form non inseriti correttamente");
      return false;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (allDataInserted() === true) {
      if (password.length >= 6) {
        const isRegistered = await isEmailAlreadyRegistered(email);
        if (isRegistered === false) {
          await sendRegister(email, password);
          console.log("Lorelepsum")
          await updateDisplayName(nome);
          changeStep(e);
        } else {
          alert("Email già registrata");
        }
      } else {
        alert("La password deve avere almeno 6 caratteri");
      }
    }
    if (isChecked == false) {
      console.log("non è checked");
      setShowWarningTerms(true);
    } else {
      console.log("Tutto ok!");
    }
  };
  const { addData } = useContext(databaseContext);

  const addDataToDatabase = async () => {
    await addData(nome, cognome, email, type, listaAnimal);
  };

  /*useEffect(() => {
    if (isRendering) {
      setActiveStep(2);
    }
  }, [isRendering]);
*/
  return (
    <div className="flex flex-col items-center max-w-8xl mx-auto justify-center relative min-h-screen">
      <svg
        preserveAspectRatio="xMidYMid slice"
        viewBox="10 10 80 80"
        className="absolute inset-0 w-full h-full z-0 mb-0 bg-yellow-400"
        style={{ zIndex: -1 }}
      >
        <defs>
          <style
            dangerouslySetInnerHTML={{
              __html:
                "\n            @keyframes rotate {\n\t\t\t\t\t 0% {\n                    transform: rotate(0deg);\n                }\n                100% {\n                    transform: rotate(360deg);\n                }\n            }\n            .out-top {\n                animation: rotate 20s linear infinite;\n                transform-origin: 13px 25px;\n            }\n            .in-top {\n                animation: rotate 10s linear infinite;\n                transform-origin: 13px 25px;\n            }\n            .out-bottom {\n                animation: rotate 25s linear infinite;\n                transform-origin: 84px 93px;\n            }\n            .in-bottom {\n                animation: rotate 15s linear infinite;\n                transform-origin: 84px 93px;\n            }\n        ",
            }}
          />
        </defs>
        <path
          fill="#9b5de5"
          className="out-top"
          d="M37-5C25.1-14.7,5.7-19.1-9.2-10-28.5,1.8-32.7,31.1-19.8,49c15.5,21.5,52.6,22,67.2,2.3C59.4,35,53.7,8.5,37-5Z"
        />
        <path
          fill="#f15bb5"
          className="in-top"
          d="M20.6,4.1C11.6,1.5-1.9,2.5-8,11.2-16.3,23.1-8.2,45.6,7.4,50S42.1,38.9,41,24.5C40.2,14.1,29.4,6.6,20.6,4.1Z"
        />
        <path
          fill="#00bbf9"
          className="out-bottom"
          d="M105.9,48.6c-12.4-8.2-29.3-4.8-39.4.8-23.4,12.8-37.7,51.9-19.1,74.1s63.9,15.3,76-5.6c7.6-13.3,1.8-31.1-2.3-43.8C117.6,63.3,114.7,54.3,105.9,48.6Z"
        />
        <path
          fill="#00f5d4"
          className="in-bottom"
          d="M102,67.1c-9.6-6.1-22-3.1-29.5,2-15.4,10.7-19.6,37.5-7.6,47.8s35.9,3.9,44.5-12.5C115.5,92.6,113.9,74.6,102,67.1Z"
        />
      </svg>
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
      <Card
        color="transparent"
        shadow={true}
        className={"bg-white p-5 bg-opacity-70"}
      >
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
          <AnimalSelection onSendAnimal={catchAnimal} handlePrev={handlePrev} />
          {animal === "Cane" && <AnimalDogList onSendBreed={catchBreed} />}
          {open ? (
            <AnimalName sendOpen={catchOpen} sendValue={catchNewAnimal} />
          ) : null}
        </>
      )}
      {activeStep === 2 && type === "venditore" && (
        <>
          <CreateShop type={"register"}></CreateShop>
        </>
      )}
      {activeStep === 3 && type === "cliente" && (
        <>
          <div className="flex flex-col items-end">
            <AnimalTable
              TABLE_ROWS={listaAnimal}
              sendStatus={(v) => {
                setStatus(v);
                setActiveStep(4);
              }}
              sendId={catchAnimalId}
            />
            <Button
              className="mt-6"
              type="submit"
              disabled={listaAnimal.length === 0}
              onClick={() => {
                addDataToDatabase();
                navigate("/home");
              }}
            >
              Conferma
            </Button>
          </div>
        </>
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
