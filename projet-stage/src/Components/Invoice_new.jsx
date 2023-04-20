import "../Styles/Invoice_new.css";
import { Button } from "@mui/material";
function Invoice_New() {
  function form_submit() {
    document.getElementById("form_id").submit();
  }
  return (
    <>
      <div className="conteinero">
        <div className="New_All">
          <h1>Invoice Create</h1>

          <div className="New_Element_parent">
            <div className="New_Element">
              <form className="block" id="form_id">
                <div className="row">
                  <label htmlFor="date_facture">Date de facture : </label>
                  <input type="date" name="date_facture" id="date_facture" />
                </div>
                <div className="row">
                  <label htmlFor="client">Client : </label>
                  <select name="client" id="client">
                    <option value="test">test</option>
                    <option value="test">test</option>
                    <option value="test">test</option>
                    <option value="test">test</option>
                  </select>
                </div>
                <div className="row">
                  <label htmlFor="TotalTVA">TotalTVA : </label>
                  <input
                    type="number"
                    name="TotalTVA"
                    id="TotalTVA"
                    placeholder="Change..."
                  />
                </div>
                <div className="row">
                  <label htmlFor="TotalHT">TotalHTT : </label>
                  <input
                    type="number"
                    name="TotalHT"
                    id="TotalHT"
                    placeholder="Change..."
                  />
                </div>
                <div className="row">
                  <label htmlFor="TotalTTC">TotalTTC : </label>
                  <input
                    type="number"
                    name="TotalTTC"
                    id="TotalTTC"
                    placeholder="Change..."
                  />
                </div>
                <div className="row">
                  <label htmlFor="produit">Produit : </label>
                  <div className="flex-row ">
                    <select name="produit" id="produit">
                      <option value="produit">produit</option>
                      <option value="produit">produit</option>
                      <option value="produit">produit</option>
                      <option value="produit">produit</option>
                    </select>
                    <i
                      className="fa fa-plus-square mx-2"
                      aria-hidden="true"
                    ></i>
                  </div>
                </div>
                <div className="row">
                  <label htmlFor="quantité">Quantité :</label>
                  <input
                    type="number"
                    name="quantité"
                    id="quantité"
                    placeholder="Change..."
                  />
                </div>
                <Button variant="contained" onClick={form_submit}>
                  Save{" "}
                </Button>
              </form>
            </div>
            <div class="tablos  ">
              <table class="table table-hover text-center  table-responsive rounded-3 shadow border-3 border">
                <thead>
                  <tr class="">
                    <th scope="col">Produit</th>
                    <th scope="col">Quantite</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>test</td>
                    <td>5</td>
                  </tr>
                  <tr>
                    <td>test</td>
                    <td>5</td>
                  </tr>
                  <tr>
                    <td>test</td>
                    <td>5</td>
                  </tr>
                  <tr>
                    <td>test</td>
                    <td>5</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Invoice_New;
