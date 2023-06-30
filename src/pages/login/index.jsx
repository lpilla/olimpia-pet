import React, {Fragment, useState} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import {Alert, Button, Card, Checkbox, Input, Typography} from "@material-tailwind/react";
import MyAlert from "../../components/myAlert.jsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const { userLogin } = useContext(UserContext);
  const navigate = useNavigate();


  const onLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      userLogin(email, password,(e) => {
        if(e === "login effettuato"){
          navigate("/home");
        } else {
          setMessage(e);
          setOpen(true);
        }
      });
    }
  };

  return (
      <>    <div className="flex justify-center items-center h-[100vh]">

      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Log in
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter your details to Log in.
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={onLogin}>
          <div className="mb-4 flex flex-col gap-6">
            <Input size="lg" label="Email" onChange={(e) => setEmail(e.target.value)} />
            <Input type="password" size="lg" label="Password" onChange={(e) => setPassword(e.target.value)} />
          </div>

          <Button className="mt-6" fullWidth type={"submit"}>
            Login
          </Button>
        </form>
      </Card>
    </div>
    <MyAlert m={message} open={open} onCloseAlert={() => {
      setOpen(false)
    }} />
        </>
  );
};

export default Login;
