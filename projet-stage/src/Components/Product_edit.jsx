import { Button } from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";

function Product_Edit() {
  let { id } = useParams();

  function Sendo(event) {
    event.preventDefault();
    axios
      .put("http://localhost/Projet%20Stage/projet-stage/backend/Product.php", {
        id: id,
        nom: event.target.nom.value,
        prix: event.target.prix.value,
        tva: event.target.TVA.value,
        ice: window.userICE,
      })
      .then((data) => {
        Swal.fire("Validé !", "Produit modifié!", "success");
        event.target.nom.value = null;
        event.target.prix.value = null;
        event.target.TVA.value = null;
      });
  }
  return (
    <>
      <div className="conteinero">
        <div className="New_All">
          <h1>Product Create</h1>

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
                  <input
                    type="number"
                    name="TVA"
                    id="TVA"
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
export default Product_Edit;
