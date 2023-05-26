import { Button } from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

function Client_Edit() {
  let { id } = useParams();
  function Sendo(event) {
    event.preventDefault();
    axios
      .put("http://localhost/Projet%20Stage/projet-stage/backend/Client.php", {
        id: id,
        nom: event.target.nom.value,
        adresse: event.target.adresse.value,
        tel: event.target.tel.value,
        ice: window.userICE,
      })
      .then((data) => {
        Swal.fire("Validé !", "Client modifié!", "success");
        event.target.nom.value = null;
        event.target.adresse.value = null;
        event.target.tel.value = null;
      });
  }
  function fetchClient() {
    axios
      .get("http://localhost/Projet%20Stage/projet-stage/backend/Client.php", {
        params: { ice: window.userICE, id_modif: id },
      })
      .then((data) => {
        document.getElementById("nom").value = data.data[0]["nom_client"];
        document.getElementById("adresse").value =
          data.data[0]["adresse_client"];
        document.getElementById("tel").value = data.data[0]["tel_client"];
      });
  }
  useEffect(() => {
    fetchClient();
  }, []);
  return (
    <>
      <div className="conteinero slide-in-left">
        <div className="New_All">
          <h1>Modification Client</h1>

          <div className="New_Element_parent">
            <div className="New_Element">
              <form action="" method="post" onSubmit={Sendo}>
                <div className="row">
                  <label htmlFor="Nom">Nom : </label>
                  <input
                    type="text"
                    name="Nom"
                    id="nom"
                    placeholder="Change..."
                  />
                </div>
                <div className="row">
                  <label htmlFor="Adresse">Adresse : </label>
                  <input
                    type="text"
                    name="Adresse"
                    id="adresse"
                    placeholder="Change..."
                  />
                </div>
                <div className="row">
                  <label htmlFor="Téléphone">Téléphone : </label>
                  <input
                    type="tel"
                    name="tel"
                    id="tel"
                    placeholder="Change..."
                  />
                </div>
                <Button variant="contained" type="submit">
                  Enregistrer{" "}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Client_Edit;
