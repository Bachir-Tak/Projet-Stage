import { Button } from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";

function Membres_New() {
  function Sendo(event) {
    event.preventDefault();
    axios
      .post(
        "http://localhost/Projet%20Stage/projet-stage/backend/Membres.php",
        {
          Nom: event.target.Nom.value,
          Email: event.target.Email.value,
          Password: event.target.Password.value,
          ice: window.userICE,
        }
      )
      .then((data) => {
        if (data.data == false) {
          Swal.fire("Refusé !", "Membre déjà existant!", "error");
        } else {
          Swal.fire("Validé !", "Membre Ajouté!", "success");
          event.target.Nom.value = null;
          event.target.Email.value = null;
          event.target.Password.value = null;
        }
      });
  }
  return (
    <>
      <div className="conteinero slide-in-left">
        <div className="New_All">
          <h1>Nouveau Membre</h1>

          <div className="New_Element_parent">
            <div className="New_Element">
              <form action="" method="post" onSubmit={Sendo}>
                <div className="row">
                  <label htmlFor="Nom">Nom : </label>
                  <input
                    type="text"
                    name="Nom"
                    id="Nom"
                    placeholder="Change..."
                  />
                </div>
                <div className="row">
                  <label htmlFor="Email">Email : </label>
                  <input
                    type="email"
                    name="Email"
                    id="Email"
                    placeholder="Change..."
                  />
                </div>
                <div className="row">
                  <label htmlFor="Password">Mot de passe : </label>
                  <input
                    type="password"
                    name="Password"
                    id="Password"
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
export default Membres_New;
