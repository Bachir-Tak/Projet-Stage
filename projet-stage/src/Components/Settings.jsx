import "../Styles/Settings.css";
import { Button } from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

function Settings() {
  function Sendo(event) {
    event.preventDefault();
    axios
      .post(
        "http://localhost/Projet%20Stage/projet-stage/backend/Settings.php",
        {
          nom: event.target.nom.value,
          email: event.target.email.value,
          adresse: event.target.adresse.value,
          tel: event.target.tel.value,
          activite: event.target.activite.value,
          password: event.target.password.value,
          ice: window.userICE,
        }
      )
      .then((data) => {
        Swal.fire(
          "Changement effectué !",
          "Vous allez être déconnecté !",
          "info"
        ).then(() => window.location.reload());
      });
  }
  return (
    <>
      <div className="conteinero">
        <div className="New_All">
          <h1>Settings</h1>
          <div className="Settings">
            <div className="New_Element_parent">
              <div className="New_Element">
                <form action="" method="post" onSubmit={Sendo}>
                  <div className="row">
                    <label required htmlFor="email">
                      Email :{" "}
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Change..."
                    />
                  </div>
                  <div className="row">
                    <label required htmlFor="nom">
                      Nom Entreprise :{" "}
                    </label>
                    <input
                      type="text"
                      name="nom"
                      id="nom"
                      placeholder="Change..."
                    />
                  </div>
                  <div className="row">
                    <label required htmlFor="adresse">
                      Adresse :{" "}
                    </label>
                    <input
                      type="text"
                      name="adresse"
                      id="adresse"
                      placeholder="Change..."
                    />
                  </div>
                  <div className="row">
                    <label required htmlFor="tel">
                      Téléphone :{" "}
                    </label>
                    <input
                      type="tel"
                      name="tel"
                      id="tel"
                      placeholder="Change..."
                    />
                  </div>
                  <div className="row">
                    <label required htmlFor="activite">
                      Activité :{" "}
                    </label>
                    <input
                      type="text"
                      name="activite"
                      id="activite"
                      placeholder="Change..."
                    />
                  </div>
                  <div className="row">
                    <label required htmlFor="password">
                      Password :{" "}
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Change..."
                    />
                  </div>

                  <Button variant="contained" type="submit">
                    Save{" "}
                  </Button>
                </form>
                <div className="custom">
                  <Link to="/Accueil/Historique">
                    <Button variant="contained">
                      Historique
                      <i
                        class="fa fa-arrow-circle-o-right"
                        aria-hidden="true"
                      ></i>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Settings;
