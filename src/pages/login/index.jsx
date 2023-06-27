import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { userLogin } = useContext(UserContext);
  const navigate = useNavigate();

  const onLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      userLogin(email, password);
      navigate("/home");
    }
  };

  return (
    <>
      <main>
        <section>
          <div>
            <h1> Login </h1>

            <form>
              <div>
                <label htmlFor="email-address">Email address</label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  required
                  placeholder="Email address"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div>
                <button onClick={onLogin}>Login</button>
              </div>
            </form>

            <p className="text-sm text-white text-center">
              No account yet? <NavLink to="/signup">Sign up</NavLink>
            </p>
          </div>
        </section>
      </main>
    </>
  );
};

export default Login;
