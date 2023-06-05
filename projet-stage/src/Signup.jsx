import "./Styles/signup.css";
import image from "./Assets/image1.jpg";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Signup() {
  const navigate = useNavigate();

  function Sendo(event) {
    event.preventDefault();
    axios
      .post("http://10.0.2.2/Projet%20Stage/projet-stage/backend/SignUp.php", {
        password: event.target.password.value,
        ice: event.target.ice.value,
        nom: event.target.nom.value,
        email: event.target.Email.value,
        formejuridique: event.target.formejuridique.value,
        activite: event.target.activite.value,
        identifiantfiscal: event.target.identifiantfiscal.value,
      })
      .then((data) => {
        if (data.data == true) {
          Swal.fire(
            "Enregistré !",
            "Connectez-vous pour accéder à votre Compte!",
            "success"
          ).then(navigate("/Login"));
        } else {
          Swal.fire("Refusé !", "Email ou ICE Existant!", "error");
        }
      });
  }
  return (
    <>
      <div className="contenaira_signup ">
        <img
          src={image}
          className="position-absolute z-n1 object-fit-cover w-100 h-100"
        />
        <div className="formus_signup  p-4 rounded text-center scale-up-center">
          <div className="w-100">
            <Link to="/Login">
              {" "}
              <i className="fas fa-arrow-left fa-2x"></i>
            </Link>
            <h2>Identifier votre entreprise</h2>
            <p>Saisissez vos informations</p>
          </div>
          <form action="" method="post" onSubmit={Sendo}>
            <div>
              <label for="ice" name="ice">
                Votre ICE
              </label>
              <input type="number" id="ice" name="ice" required />
              <label for="nom" name="nom">
                Votre Entreprise
              </label>
              <input type="text" id="nom" name="nom" required />
              <label for="Email" name="Email">
                Votre Email
              </label>
              <input type="email" id="Email" name="Email" required />
              <label for="formejuridique">Forme juridique </label>
              <select name="formejuridique" id="formejuridique">
                <option value=""></option>
                <option value="sas">S.A.S</option>
                <option value="sarl">S.A.R.L</option>
                <option value="sasu">S.A.S.U</option>
                <option value="eurl">E.U.R.L</option>
                <option value="ei">E.I</option>
                <option value="eirl">E.I.R.L</option>
              </select>
            </div>
            <div>
              <label for="activite">Activité</label>
              <input name="activite" id="activite" type="text" required />
              <label for="identifiantfiscal">Identifiant fiscal</label>
              <input
                name="identifiantfiscal"
                id="identifiantfiscal"
                type="text"
                required
              />
              <label for="password">Mot de passe</label>
              <input name="password" id="password" type="password" required />
              <input
                className="button-signup rounded"
                type="submit"
                value="Sign-up"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default Signup;
