//import styles from "./ffff/register.css";
import { Link } from "react-router-dom";
import { useState } from "react";

const Register = () => {
  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState(1);
  const [data, setData] = useState({});

  const changeStep = (e) => {
    e.preventDefault();
    setData({ nome: nome, cognome: cognome, email: email, password: password });
    setStep((p) => p + 1);
  };

  return (
    <div className="divPrincipale">
      <h1>Register</h1>

      {step === 1 && (
        <form action="" onSubmit={changeStep}>
          <label htmlFor="nome">Inserisci il nome</label>
          <input
            type="text"
            placeholder="nome"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <label htmlFor="cognome">Inserisci il cognome</label>
          <input
            type="text"
            id="cognome"
            placeholder="cognome"
            value={cognome}
            onChange={(e) => setCognome(e.target.value)}
          />

          <label htmlFor="email">Inserisci email</label>
          <input
            type="email"
            id="email"
            placeholder="example@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Inserisci la password</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button>Register</button>
        </form>
      )}
      {step === 2 && <SecondStep data={data} setData={setData} />}
      {step === 3 && <Authentication></Authentication>}
      <h1>I dati inseriti sono: </h1>
      <h5>Nome:{data.nome}</h5>
      <h5>Cognome:{data.cognome}</h5>
      <h5>Email:{data.email}</h5>
      <h5>Password:{data.password}</h5>
      <h5>type :{data.type}</h5>
      <div className="bottoniNextBack">
        <button className="bottoniNextBack" onClick={() => setStep(1)}>
          Back
        </button>
        <button className="bottoniNextBack" onClick={() => setStep(3)}>
          Next
        </button>
      </div>
    </div>
  );
};
export default Register;

const SecondStep = ({ data, setData }) => {
  const [value, setValue] = useState("");
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setData({
            ...data,
            type: value,
          });
        }}
      >
        <input
          type="radio"
          name="venditore"
          id=""
          value="venditore"
          onChange={(e) => setValue(e.target.value)}
        />
        <label for="venditore">Venditore</label>
        <button type="submit">send</button>
      </form>
    </div>
  );
};

//Metto un nome a caso, ma dovrebbe essere l'autenticazione dell'email
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
        <h4 className="objAuthentication">
          Non hai ricevuto nessuna email?
          <Link to="/register">Richiedi nuovo codice</Link>
        </h4>
        <button className="objAuthentication" onClick={() => setStep(1)}>
          Torna indietro
        </button>
      </form>
    </div>
  );
};
