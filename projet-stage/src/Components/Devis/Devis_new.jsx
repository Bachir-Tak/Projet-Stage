import { Button } from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
function Devis_New() {
  Date.prototype.toDateInputValue = function () {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
  };
  const [rowtab, setrowtab] = useState([]);
  const [rowtabproduit, setrowtabproduit] = useState([]);
  const [listProds, setlistProds] = useState([]);
  const [trueValue, settrueValue] = useState(0);
  const [remise, setremise] = useState(0);
  const [suiviValue, setsuiviValue] = useState([]);
  var Client;

  function fetchClient() {
    axios
      .get("http://localhost/Projet%20Stage/projet-stage/backend/Client.php", {
        params: { ice: window.userICE },
      })
      .then((data) => {
        setrowtab(data.data);
      });
  }
  function fetchProduit() {
    axios
      .get("http://localhost/Projet%20Stage/projet-stage/backend/Product.php", {
        params: { ice: window.userICE },
      })
      .then((data) => {
        setrowtabproduit(data.data);
      });
  }
  function Sendo(event) {
    const tab = [];

    event.preventDefault();
    Client = event.target.client.value;
    listProds.map((e) => {
      tab.push({
        nom_produit: e[1],
        quantite: Number(e[2]),
        TotalHT: Number(e[3]),
        TotalTVA: Number(e[4]),
        TotalTTC: Number(e[5]),
      });
    });
    axios
      .post("http://localhost/Projet%20Stage/projet-stage/backend/Devis.php", {
        tab: tab,
        client: Client,
        date_facture: event.target.date_facture.value,
        TotalTTC: event.target.TotalTTC.value,
        ice: window.userICE,
        TotalTVA: event.target.TotalTVA.value,
        TotalHT: event.target.TotalHT.value,
        remise: remise.toFixed(2),
      })
      .then((data) => {
        Swal.fire("Validé !", "Devis Ajouté!", "success");
      });
  }
  function add(produit, quantite) {
    var produitId = produit.split(",")[0];
    var produitNom = produit.split(",")[1];
    var produitTVA = produit.split(",")[3];
    var produitPrix;
    var HT;
    var TVA;
    var TTC;
    if (listProds.flat().includes(produitNom)) {
      listProds.some((e) => {
        if (e.includes(produitNom)) {
          produitPrix = e[3] / e[2];
          produitTVA = e[4];
          HT = Number(produitPrix) * Number(quantite);
          TVA = Number(produitTVA);
          TTC = Number(HT * (1 + TVA / 100));
          listProds[listProds.indexOf(e)][2] =
            Number(listProds[listProds.indexOf(e)][2]) + Number(quantite);
          listProds[listProds.indexOf(e)][3] = Number(
            Number(Number(listProds[listProds.indexOf(e)][3]) + HT).toFixed(2)
          );
          listProds[listProds.indexOf(e)][5] = Number(
            Number(listProds[listProds.indexOf(e)][5]) + TTC
          ).toFixed(2);
          setlistProds((oldArray) => [...oldArray]);
        }
      });
      var totalHT = document.getElementById("TotalHT");
      var totalTVA = document.getElementById("TotalTVA");
      var totalTTC = document.getElementById("TotalTTC");
      totalHT.value = Number(Number(totalHT.value) + HT);
      totalTTC.value = Number(Number(totalTTC.value) + Number(TTC)).toFixed(2);
      totalTVA.value = Number(
        (totalTTC.value / totalHT.value - 1) * 100
      ).toFixed(0);
      if (suiviValue.flat().includes(produitNom)) {
        suiviValue.some((e) => {
          if (e.includes(produitNom)) {
            settrueValue(
              Number(
                trueValue +
                  Number(Number(e[1]) * Number(quantite) * (1 + TVA / 100))
              )
            );
          }
        });
      } else {
        settrueValue(Number(trueValue + Number(HT * (1 + TVA / 100))));
      }
    } else {
      var produitPrix = produit.split(",")[2];
      HT = Number(produitPrix) * Number(quantite);
      TVA = Number(produitTVA);
      TTC = Number(HT * (1 + TVA / 100));
      setlistProds((oldArray) => [
        ...oldArray,
        [produitId, produitNom, quantite, HT, TVA, TTC.toFixed(2)],
      ]);

      var totalHT = document.getElementById("TotalHT");
      var totalTVA = document.getElementById("TotalTVA");
      var totalTTC = document.getElementById("TotalTTC");
      totalHT.value = Number(Number(totalHT.value) + HT);
      totalTTC.value = Number(Number(totalTTC.value) + Number(TTC)).toFixed(2);
      totalTVA.value = Number(
        (totalTTC.value / totalHT.value - 1) * 100
      ).toFixed(0);
      settrueValue(Number(trueValue + Number(HT * (1 + TVA / 100))));
    }
  }
  function deleteProd(e) {
    listProds.splice(listProds.indexOf(e), 1);
    setlistProds((oldArray) => [...oldArray]);
    var totalHT = document.getElementById("TotalHT");
    var totalTVA = document.getElementById("TotalTVA");
    var totalTTC = document.getElementById("TotalTTC");
    totalHT.value = Number(Number(totalHT.value) - e[3]);
    totalTTC.value = Number(Number(totalTTC.value) - Number(e[5])).toFixed(2);
    if (totalHT.value == 0) {
      totalTVA.value = 0;
    } else {
      totalTVA.value = Number(
        (totalTTC.value / totalHT.value - 1) * 100
      ).toFixed(0);
    }
    if (suiviValue.flat().includes(e[1])) {
      suiviValue.some((ev) => {
        if (ev.includes(e[1])) {
          settrueValue(
            Number(trueValue - Number(ev[1] * Number(e[2]) * (1 + e[4] / 100)))
          );
        }
      });
    } else {
      settrueValue(Number(trueValue - Number(e[5])));
    }
  }
  function change1(e, event) {
    if (suiviValue.flat().includes(e[1])) {
    } else {
      rowtabproduit.some((ev) => {
        if (ev.nom == e[1]) {
          setsuiviValue((oldArray) => [
            ...oldArray,
            [e[1], ev["prix_unitaire"]],
          ]);
        }
      });
    }
    var totalHT = document.getElementById("TotalHT");
    var totalTVA = document.getElementById("TotalTVA");
    var totalTTC = document.getElementById("TotalTTC");
    totalHT.value = totalHT.value - listProds[listProds.indexOf(e)][3];
    totalTTC.value = totalTTC.value - listProds[listProds.indexOf(e)][5];
    listProds[listProds.indexOf(e)][3] = Number(event.target.value);
    listProds[listProds.indexOf(e)][5] = Number(
      listProds[listProds.indexOf(e)][3] *
        (1 + Number(listProds[listProds.indexOf(e)][4]) / 100)
    ).toFixed(2);
    setlistProds((oldArray) => [...oldArray]);
    totalHT.value = Number(
      Number(totalHT.value) + Number(listProds[listProds.indexOf(e)][3])
    );
    totalTTC.value = Number(
      Number(totalTTC.value) + Number(listProds[listProds.indexOf(e)][5])
    ).toFixed(2);
    totalTVA.value = Number((totalTTC.value / totalHT.value - 1) * 100).toFixed(
      0
    );
    setremise(100 - (Number(totalTTC.value) * 100) / Number(trueValue));
  }
  function change2(e, event) {
    if (suiviValue.flat().includes(e[1])) {
    } else {
      rowtabproduit.some((ev) => {
        if (ev.nom == e[1]) {
          setsuiviValue((oldArray) => [
            ...oldArray,
            [e[1], ev["prix_unitaire"]],
          ]);
        }
      });
    }
    var totalHT = document.getElementById("TotalHT");
    var totalTVA = document.getElementById("TotalTVA");
    var totalTTC = document.getElementById("TotalTTC");
    totalHT.value = totalHT.value - listProds[listProds.indexOf(e)][3];
    totalTTC.value = totalTTC.value - listProds[listProds.indexOf(e)][5];
    listProds[listProds.indexOf(e)][5] = Number(event.target.value);
    listProds[listProds.indexOf(e)][3] = Number(
      listProds[listProds.indexOf(e)][5] /
        (1 + Number(listProds[listProds.indexOf(e)][4]) / 100)
    ).toFixed(2);
    setlistProds((oldArray) => [...oldArray]);
    totalHT.value = Number(
      Number(totalHT.value) + Number(listProds[listProds.indexOf(e)][3])
    );
    totalTTC.value = Number(
      Number(totalTTC.value) + Number(listProds[listProds.indexOf(e)][5])
    ).toFixed(2);
    totalTVA.value = Number((totalTTC.value / totalHT.value - 1) * 100).toFixed(
      0
    );
    setremise(100 - (Number(totalTTC.value) * 100) / Number(trueValue));
  }
  useEffect(() => {
    fetchClient();
    fetchProduit();
  }, []);
  useEffect(() => {
    var totalTTC = document.getElementById("TotalTTC");
    if (Number(trueValue.toFixed(2)) <= 0) {
      setremise(0);
    } else {
      setremise(
        100 - (Number(totalTTC.value) * 100) / Number(trueValue.toFixed(2))
      );
    }
  }, [trueValue]);
  return (
    <>
      <div className="conteinero slide-in-left">
        <div className="New_All">
          <h1>Nouveau Devis </h1>

          <div className="New_Element_parent">
            <div className="New_Element">
              <form action="" method="post" onSubmit={Sendo}>
                <div className="row">
                  <label required htmlFor="date_facture">
                    Date de facture :{" "}
                  </label>
                  <input
                    type="date"
                    name="date_facture"
                    id="date_facture"
                    defaultValue={new Date().toDateInputValue()}
                    required
                  />
                </div>
                <div className="row">
                  <label required htmlFor="client">
                    Client :{" "}
                  </label>
                  <select name="client" id="client">
                    {rowtab.map((e) => (
                      <option value={e["nom_client"]}>{e["nom_client"]}</option>
                    ))}
                  </select>
                </div>
                <div className="row">
                  <label required htmlFor="produit">
                    Produit :{" "}
                  </label>
                  <select name="produit" id="produit" required>
                    {rowtabproduit.map((e) => (
                      <option
                        value={[
                          e["id_produit"],
                          e["nom"],
                          e["prix_unitaire"],
                          e["TVA"],
                        ]}
                      >
                        {e["nom"]}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="row">
                  <label htmlFor="quantite">Quantité :</label>
                  <input
                    required
                    type="number"
                    name="quantite"
                    id="quantite"
                    placeholder="Change..."
                  />
                  <i
                    className="fa fa-plus-square mx-2"
                    aria-hidden="true"
                    onClick={() =>
                      add(
                        document.getElementById("produit").value,
                        document.getElementById("quantite").value
                      )
                    }
                  ></i>
                </div>
                <div className="row">
                  <label required htmlFor="TotalTVA">
                    TotalTVA :{" "}
                  </label>
                  <input
                    required
                    name="TotalTVA"
                    id="TotalTVA"
                    placeholder="Change..."
                  />
                </div>
                <div className="row">
                  <label htmlFor="TotalHT">TotalHTT : </label>
                  <input
                    required
                    name="TotalHT"
                    id="TotalHT"
                    placeholder="Change..."
                  />
                </div>
                <div className="row">
                  <label required htmlFor="TotalTTC">
                    TotalTTC :{" "}
                  </label>
                  <input
                    required
                    name="TotalTTC"
                    id="TotalTTC"
                    placeholder="Change..."
                  />
                </div>

                <Button variant="contained" type="submit">
                  Enregistrer{" "}
                </Button>
              </form>
            </div>
            <div className="tablos  ">
              <div className="tablosAF rounded-3 shadow border-3 border">
                <table class="table table-hover text-center  rounded-3">
                  <thead>
                    <tr>
                      <th scope="col">Produit</th>
                      <th scope="col">Quantite</th>
                      <th scope="col">HT</th>
                      <th scope="col">TTC</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listProds.map((e) => (
                      <tr>
                        <td>{e[1]}</td>
                        <td>{e[2]}</td>
                        <td onBlur={(event) => change1(e, event)}>
                          {" "}
                          <input type="number" defaultValue={e[3]} key={e[3]} />
                        </td>
                        <td onBlur={(event) => change2(e, event)}>
                          {" "}
                          <input type="number" defaultValue={e[5]} key={e[5]} />
                        </td>
                        <td>
                          {" "}
                          <Button
                            variant="contained"
                            className="DeleteButton"
                            onClick={() => deleteProd(e)}
                          >
                            Retirer
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <h2>Prix de base: {Math.abs(trueValue).toFixed(2)}€</h2>
              <h2>Remise: {remise.toFixed(2)}%</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Devis_New;
