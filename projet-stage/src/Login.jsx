import "./Styles/login.css";
import image from "./Assets/image1.jpg";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
function Login() {
  const navigate = useNavigate();

  function Sendo(event) {
    event.preventDefault();
    axios
      .post("http://localhost/Projet%20Stage/projet-stage/backend/Login.php", {
        email: event.target.email.value,
        password: event.target.password.value,
      })
      .then((data) => {
        if (data.data[0] == true) {
          window.user_connect = true;
          window.userICE = data.data[1][0]["nb_ICE"];
          window.user = data.data[1][0]["nom_entreprise"];
          window.userInfo = data.data[1][0];
          navigate("/Accueil");
        } else {
          window.user_connect = false;
          window.user = null;
          window.userICE = null;
          Swal.fire("Refusé !", "Email Inexistant!", "error");
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
        <form action="" method="post" onSubmit={Sendo}>
          <label for="email" name="email">
            Votre Email
          </label>
          <input type="email" id="email" name="email" required />
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
