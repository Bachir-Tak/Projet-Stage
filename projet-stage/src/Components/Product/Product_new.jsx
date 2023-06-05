import { Button } from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";

function Product_New() {
  function Sendo(event) {
    event.preventDefault();
    axios
      .post(
        "http://192.168.0.195/Projet%20Stage/projet-stage/backend/Product.php",
        {
          nom: event.target.nom.value,
          prix: event.target.prix.value,
          tva: event.target.TVA.value,
          ice: window.userICE,
        }
      )
      .then((data) => {
        if (data.data == false) {
          Swal.fire("Refusé !", "Produit déjà existant!", "error");
        } else {
          Swal.fire("Validé !", "Produit Ajouté!", "success");
          event.target.nom.value = null;
          event.target.prix.value = null;
          event.target.TVA.value = null;
        }
      });
  }
  return (
    <>
      <div className="conteinero slide-in-left">
        <div className="New_All">
          <h1>Nouveau Produit</h1>

          <div className="New_Element_parent">
            <div className="New_Element">
              <form action="" method="post" onSubmit={Sendo}>
                <div className="row">
                  <label htmlFor="Nom">Nom : </label>
                  <input
                    type="text"
                    name="nom"
                    id="nom"
                    placeholder="Change..."
                  />
                </div>
                <div className="row">
                  <label htmlFor="Prix">Prix Unitaire: </label>
                  <input
                    type="number"
                    name="prix"
                    id="prix"
                    placeholder="Change..."
                  />
                </div>
                <div className="row">
                  <label htmlFor="TVA">TVA : </label>
                  <select type="number" name="TVA" id="TVA">
                    <option value="7">7 %</option>
                    <option value="10">10 %</option>
                    <option value="14">14 %</option>
                    <option value="20">20 %</option>
                  </select>
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
export default Product_New;
