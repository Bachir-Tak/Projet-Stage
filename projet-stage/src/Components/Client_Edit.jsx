import { Button } from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";

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
      })
      .then((data) => {
        Swal.fire("Validé !", "Client modifié!", "success");
        event.target.nom.value = null;
        event.target.adresse.value = null;
        event.target.tel.value = null;
      });
  }
  return (
    <>
      <div className="conteinero">
        <div className="New_All">
          <h1>Client Edit</h1>

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
                  Save{" "}
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
