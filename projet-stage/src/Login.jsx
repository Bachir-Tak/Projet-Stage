import "./Styles/login.css";
import image from "./Assets/image1.jpg";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  function Sendo(event) {
    event.preventDefault();
    axios
      .post("http://localhost/Projet%20Stage/projet-stage/backend/Login.php", {
        ice: event.target.ice.value,
        password: event.target.password.value,
      })
      .then((data) => {
        console.log(data.data[0][0]);
        if (data.data[0][0] == true) {
          window.user_connect = true;
          window.user = data.data[0][1];
          navigate("/Accueil");
        } else {
          window.user_connect = false;

          alert("ICE Inexistant");
        }
      });
  }
  return (
    <div className="contenaira ">
      <img
        src={image}
        className="position-absolute z-n1 object-fit-cover w-100 h-100"
      />
      <div className="formus p-3 rounded text-center scale-up-center">
        <div className="w-100">
          <h1>Identifier votre entreprise</h1>
          <p className="m-3">Connectez-Vous</p>
        </div>
        <form action="Login.php" method="post" onSubmit={Sendo}>
          <label for="ice" name="ICE">
            Votre ICE
          </label>
          <input type="text" id="ice" name="ice" required />
          <label for="password">Mot de passe</label>
          <input name="password" id="password" type="password" required />
          <input
            type="submit"
            className="button-signup rounded"
            value="Login"
          />
          <Link to="/Signup">
            <a href="#" className="text-center">
              Pas encore inscrit ?
            </a>
          </Link>
        </form>
      </div>
    </div>
  );
}
export default Login;
