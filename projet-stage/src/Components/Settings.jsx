import "../Styles/Settings.css";
import { Button } from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

function Settings() {
  const [Admin, setAdmin] = useState(false);
  const navigate = useNavigate();
  const cookies = new Cookies();
  function Sendo(event) {
    event.preventDefault();
    if (Admin) {
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
          if (data.data == true) {
            Swal.fire(
              "Changement effectué !",
              "Vous allez être déconnecté !",
              "info"
            ).then(() => {
              cookies.remove("name");
              cookies.remove("userInfo");
              window.user = null;
              window.userICE = null;
              window.user_connect = false;
              navigate("/Login");
            });
          } else {
            Swal.fire("Refusé !", "Email Existant!", "error");
          }
        });
    } else {
      axios
        .post(
          "http://localhost/Projet%20Stage/projet-stage/backend/Settings.php",
          {
            nom: event.target.nom.value,
            email: event.target.email.value,
            password: event.target.password.value,
            ice: window.userICE,
          }
        )
        .then((data) => {
          if (data.data == true) {
            Swal.fire(
              "Changement effectué !",
              "Vous allez être déconnecté !",
              "info"
            ).then(() => {
              cookies.remove("name");
              cookies.remove("userInfo");
              window.user = null;
              window.userICE = null;
              window.user_connect = false;
              navigate("/Login");
            });
          } else {
            Swal.fire("Refusé !", "Email Existant!", "error");
          }
        });
    }
  }
  function fetchSettings() {
    axios
      .get(
        "http://localhost/Projet%20Stage/projet-stage/backend/Settings.php",
        {
          params: { ice: window.userICE },
        }
      )
      .then((data) => {
        document.getElementById("nom").value = data.data[0]["Nom"];
        if (data.data[1] == "1") {
          setAdmin(true);
          document.getElementById("nom").value = data.data[0]["nom_entreprise"];
        }
      });
  }
  useEffect(() => {
    fetchSettings();
  }, []);
  useEffect(() => {
    axios
      .get(
        "http://localhost/Projet%20Stage/projet-stage/backend/Settings.php",
        {
          params: { ice: window.userICE },
        }
      )
      .then((data) => {
        document.getElementById("email").value = data.data[0]["Email"];
        document.getElementById("tel").value = data.data[0]["tel_entreprise"];
        document.getElementById("activite").value = data.data[0]["activite"];
        document.getElementById("adresse").value =
          data.data[0]["adresse_entreprise"];
      });
  }, [Admin]);
  return (
    <>
      <div className="conteinero slide-in-left">
        <div className="New_All">
          <h1>Paramètres</h1>
          <div className="Settings">
            <div className="New_Element_parent">
              <div className="New_Element">
                <form action="" method="post" onSubmit={Sendo}>
                  <div className="row">
                    <label required htmlFor="nom">
                      Nom:{" "}
                    </label>
                    <input
                      type="text"
                      name="nom"
                      id="nom"
                      placeholder="Change..."
                    />
                  </div>
                  {Admin && (
                    <>
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
                    </>
                  )}
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
                    <label required htmlFor="password">
                      Mot de passe :{" "}
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Change..."
                    />
                  </div>

                  <Button variant="contained" type="submit">
                    Enregistrer{" "}
                  </Button>
                </form>
                <div className="custom">
                  {Admin && (
                    <>
                      <Link to="/Accueil/Historique">
                        <Button variant="contained">
                          Historique
                          <i
                            class="fa fa-arrow-circle-o-right"
                            aria-hidden="true"
                          ></i>
                        </Button>
                      </Link>
                      <Link to="/Accueil/Membres">
                        <Button variant="contained">
                          Membres
                          <i
                            class="fa fa-arrow-circle-o-right"
                            aria-hidden="true"
                          ></i>
                        </Button>
                      </Link>
                    </>
                  )}
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
