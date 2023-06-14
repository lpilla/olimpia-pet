//import styles from "./styles/login.css";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div>
      <form action="">
        <h3>Login</h3>
        <label for="username"></label>
        <input type="text" placeholder="Inserisci Email" id="username" />
        <h6>
          <Link to="/register">Email dimenticata?</Link>
        </h6>
        <label for="password"></label>
        <input type="password" placeholder="Inserisci Password" />
        <h6>
          <Link to="/register">Password dimenticata?</Link>
        </h6>
        <button>Accedi</button>
        <h4>
          Non hai un account? <Link to="/register"> Registrati</Link>
        </h4>
        {
          <div class="social">
            <div class="circle">
              <img src="" alt="Google" />
            </div>
            <div class="circle">
              <img src="" alt="Facebook" />
            </div>
            <div class="circle">
              <img src="" alt="Apple" />
            </div>
          </div>
        }
      </form>
    </div>
  );
};

export default Login;
