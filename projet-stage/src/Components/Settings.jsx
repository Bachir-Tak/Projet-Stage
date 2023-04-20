import "../Styles/Settings.css";
import { Button } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

function Settings() {
  function form_submit() {
    document.getElementById("form_id").submit();
  }
  return (
    <>
      <div className="conteinero">
        <div className="New_All">
          <h1>Settings</h1>
          <div className="Settings">
            <div className="New_Element_parent">
              <div className="New_Element">
                <form>
                  <div className="row">
                    <label htmlFor="Nom">Email : </label>
                    <input
                      type="email"
                      name="Email"
                      id="Email"
                      placeholder="Change..."
                    />
                  </div>
                  <div className="row">
                    <label htmlFor="nom">Nom Entreprise : </label>
                    <input
                      type="text"
                      name="nom"
                      id="nom"
                      placeholder="Change..."
                    />
                  </div>
                  <div className="row">
                    <label htmlFor="adresse">Adresse : </label>
                    <input
                      type="text"
                      name="adresse"
                      id="adresse"
                      placeholder="Change..."
                    />
                  </div>
                  <div className="row">
                    <label htmlFor="tel">Téléphone : </label>
                    <input
                      type="tel"
                      name="tel"
                      id="tel"
                      placeholder="Change..."
                    />
                  </div>
                  <div className="row">
                    <label htmlFor="activite">Activité : </label>
                    <input
                      type="text"
                      name="activite"
                      id="activite"
                      placeholder="Change..."
                    />
                  </div>
                  <div className="row">
                    <label htmlFor="password">Password : </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Change..."
                    />
                  </div>

                  <Button variant="contained" onClick={form_submit}>
                    Save{" "}
                  </Button>
                </form>
                <div className="custom">
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Envoyer des notifications"
                  />
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
