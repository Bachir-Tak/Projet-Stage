import "../Styles/Generated_invoice.css";
import logo from "../Assets/logo2.jpeg";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import JsPDF from "jspdf";

function Generated_invoice() {
  const location = useLocation();
  const [rowtab, setrowtab] = useState([]);
  const [rowtabItems, setrowtabItems] = useState([]);

  function Search(paramsi) {
    const tab = [];
    axios
      .get("http://localhost/Projet%20Stage/projet-stage/backend/Client.php", {
        params: { nom: paramsi, ice: window.userICE, earch: true },
      })
      .then((data) => {
        tab.push({
          id: data.data[0]["id_client"],
          Nom: data.data[0]["nom_client"],
          Adresse: data.data[0]["adresse_client"],
          Tel: data.data[0]["tel_client"],
        });
        setrowtab(tab);
      });
  }
  function SearchItems(paramsi) {
    const tab = [];
    axios
      .get("http://localhost/Projet%20Stage/projet-stage/backend/Invoice.php", {
        params: { id: paramsi, ice: window.userICE, generated: true },
      })
      .then((data) => {
        data.data.map((d) => {
          tab.push({
            nom: d["nom_produit"],
            quantite: d["quantité"],
            totalHT: d["TotalHT"],
            totalTVA: d["TotalTVA"],
            totalTTC: d["TotalTTC"],
          });
        });
        setrowtabItems(tab);
      });
  }
  const generatePDF = () => {
    const report = new JsPDF("landscape", "pt", "a4");
    report.html(document.querySelector(".invoice-box")).then(() => {
      report.save("report.pdf");
    });
    axios.get(
      "http://localhost/Projet%20Stage/projet-stage/backend/Invoice.php",
      {
        params: {
          id: location.state.params.id,
          generatedPrint: true,
          ice: window.userICE,
        },
      }
    );
  };
  useEffect(() => {
    Search(location.state.params.Client);
    SearchItems(location.state.params.id);
  }, []);
  return (
    <>
      <div class="invoice-box ">
        <table cellpadding="0" cellspacing="0">
          <tr>
            <td colspan="5" className="topTd">
              <table>
                <tr>
                  <td class="title">
                    <img src={logo} />
                  </td>

                  <td className="invoiceId">
                    Invoice #: {location.state.params.id}
                    <br />
                    Created: {location.state.params.Date}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr class="information">
            <td colspan="5">
              <table>
                <tr>
                  <td>
                    <b>Entreprise</b>
                    <br />
                    {window.user}
                    <br />
                    {window.userInfo.adresse_entreprise}
                    <br />
                    {window.userInfo.tel_entreprise}
                  </td>

                  <td>
                    <b> Client</b>
                    <br />
                    {location.state.params.Client}
                    <br />
                    {rowtab.map((e) => {
                      return e.Adresse;
                    })}
                    <br />
                    {rowtab.map((e) => {
                      return e.Tel;
                    })}{" "}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr class="heading">
            <td>Item</td>

            <td>Quantite</td>
            <td>PriceHT</td>

            <td>PriceTVA</td>

            <td>PriceTTC</td>
          </tr>

          {rowtabItems.map((e) => {
            return (
              <tr class="item">
                <td>{e.nom}</td>
                <td>{e.quantite}</td>
                <td>{e.totalHT}</td>
                <td>{e.totalTVA}</td>
                <td>{e.totalTTC}</td>
              </tr>
            );
          })}

          <tr class="total">
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>Total: ${location.state.params.Total}</td>
          </tr>
        </table>
      </div>
      <Button
        variant="contained"
        className="PrintInvoice"
        onClick={generatePDF}
      >
        Print
      </Button>
    </>
  );
}
export default Generated_invoice;
