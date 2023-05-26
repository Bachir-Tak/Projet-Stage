import { Button } from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";

function Client_New() {
  function Sendo(event) {
    event.preventDefault();
    axios
      .post("http://localhost/Projet%20Stage/projet-stage/backend/Client.php", {
        nom: event.target.nom.value,
        adresse: event.target.adresse.value,
        tel: event.target.tel.value,
        ice: window.userICE,
      })
      .then((data) => {
        if (data.data == false) {
          Swal.fire("Refusé !", "Client déjà existant!", "error");
        } else {
          Swal.fire("Validé !", "Client Ajouté!", "success");
          event.target.nom.value = null;
          event.target.adresse.value = null;
          event.target.tel.value = null;
        }
      });
  }
  return (
    <>
      <div className="conteinero slide-in-left">
        <div className="New_All">
          <h1>Nouveau Client</h1>

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
export default Client_New;
