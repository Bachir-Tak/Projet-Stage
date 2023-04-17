import "./Styles/signup.css";
import image from "./Assets/image1.jpg";
import { Link } from "react-router-dom";

function Signup() {
  return (
    <div className="contenaira_signup ">
      <img
        src={image}
        className="position-absolute z-n1 object-fit-cover w-100 h-100"
      />
      <div className="formus_signup  p-3 rounded text-center scale-up-center">
        <div className="w-100">
          <Link to="/Login">
            {" "}
            <a href="#">
              <i className="fas fa-arrow-left"></i>
            </a>
          </Link>
          <h1>Identifier votre entreprise</h1>
          <p>Saisissez vos informations</p>
        </div>
        <form action="SignUp.php" method="post">
          <label for="ice" name="ICE">
            Votre ICE
          </label>
          <input type="number" id="ice" name="ice" required />
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
        </form>
      </div>
    </div>
  );
}
export default Signup;
