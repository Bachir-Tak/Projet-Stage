import { Button } from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

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
  function fetchProduit() {
    axios
      .get("http://localhost/Projet%20Stage/projet-stage/backend/Product.php", {
        params: { ice: window.userICE, id_modif: id },
      })
      .then((data) => {
        document.getElementById("nom").value = data.data[0]["nom"];
        document.getElementById("prix").value = data.data[0]["prix_unitaire"];
        document.getElementById("TVA").value = data.data[0]["TVA"];
      });
  }
  useEffect(() => {
    fetchProduit();
  }, []);
  return (
    <>
      <div className="conteinero">
        <div className="New_All">
          <h1>Product Edit</h1>

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
