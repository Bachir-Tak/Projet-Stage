import "../../Styles/Generated_invoice.css";
import logo from "../../Assets/logo2.jpeg";
import logo2 from "../../Assets/logo2.png";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import jsPDFInvoiceTemplate, {
  OutputType,
  jsPDF,
} from "jspdf-invoice-template";
import QRCode from "react-qr-code";

function Generated_invoice() {
  const location = useLocation();
  const [rowtab, setrowtab] = useState([]);
  const [rowtabItems, setrowtabItems] = useState([]);
  function Search(paramsi) {
    const tab = [];
    axios
      .get(
        "http://192.168.0.195/Projet%20Stage/projet-stage/backend/Client.php",
        {
          params: { nom: paramsi, ice: window.userICE, earch: true },
        }
      )
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
      .get(
        "http://192.168.0.195/Projet%20Stage/projet-stage/backend/Invoice.php",
        {
          params: { id: paramsi, ice: window.userICE, generated: true },
        }
      )
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
    if (window.cordova) {
      const pdfObject = jsPDFInvoiceTemplate(props);
      const pdfOutput = pdfObject.jsPDFDocObject.output("blob");
      window.resolveLocalFileSystemURL(
        window.cordova.file.externalApplicationStorageDirectory,
        function (dir) {
          dir.getFile(
            "Rapport" +
              "-" +
              location.state.params.Client +
              "-" +
              location.state.params.Date +
              ".pdf",
            { create: true, exclusive: false },
            function (fileEntry) {
              fileEntry.createWriter(
                function (writer) {
                  writer.onwrite = function (evt) {
                    console.log("write success");
                  };

                  console.log("writing to file");
                  writer.write(pdfOutput);
                },

                function () {
                  console.log("ERROR SAVEFILE");
                }
              );
            }
          );
        }
      );
    } else {
      const pdfObject = jsPDFInvoiceTemplate(props);
      pdfObject.jsPDFDocObject.save(
        "Rapport" +
          "-" +
          location.state.params.Client +
          "-" +
          location.state.params.Date
      );
    }
  };
  useEffect(() => {
    Search(location.state.params.Client);
    SearchItems(location.state.params.id);
  }, []);

  var props = {
    outputType: OutputType,
    returnJsPDFDocObject: true,
    fileName:
      "Rapport" +
      "-" +
      location.state.params.Client +
      "-" +
      location.state.params.Date,
    orientationLandscape: false,
    compress: true,
    logo: {
      src: logo2,
      type: "PNG", //optional, when src= data:uri (nodejs case)
      width: 90.33, //aspect ratio = width/height
      height: 50.66,
      margin: {
        top: -12, //negative or positive num, from the current position
        left: -15, //negative or positive num, from the current position
      },
    },
    stamp: {
      inAllPages: true, //by default = false, just in the last page
      src:
        "https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=" +
        location.state.params.Total +
        "&choe=UTF-8",
      type: "JPG", //optional, when src= data:uri (nodejs case)
      width: 20, //aspect ratio = width/height
      height: 20,
      margin: {
        top: 0, //negative or positive num, from the current position
        left: 0, //negative or positive num, from the current position
      },
    },
    business: {
      name: window.userInfo.nom_entreprise,
      address: window.userInfo.adresse_entreprise,
      phone: window.userInfo.tel_entreprise,
    },
    contact: {
      label: "Facture générée pour :",
      name: location.state.params.Client,
      address: rowtab.map((e) => {
        return e.Adresse;
      }),
      phone: rowtab.map((e) => {
        return e.Tel;
      }),
    },
    invoice: {
      label: "Facture #: ",
      num: location.state.params.id,
      invDate: "Facture du :" + location.state.params.Date,
      invGenDate: "Facture génerée le :" + new Date().toJSON().slice(0, 10),
      headerBorder: false,
      tableBodyBorder: false,
      header: [
        {
          title: "#",
          style: {
            width: 10,
          },
        },
        {
          title: "Produit",
          style: {
            width: 30,
          },
        },
        { title: "Quantité" },
        { title: "PrixHT" },
        { title: "TVA" },
        { title: "PrixTTC" },
      ],
      table: Array.from(rowtabItems, (item, index) => [
        index + 1,
        item.nom,
        item.quantite,
        item.totalHT,
        item.totalTVA,
        item.totalTTC,
      ]),
      additionalRows: [
        {
          col1: "Total TTC:",
          col2: location.state.params.Total + "€",
          style: {
            fontSize: 14, //optional, default 12
          },
        },
      ],
      invDescLabel: "Note",
      invDesc:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia expedita reiciendis quidem necessitatibus explicabo dolor cumque!Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia expedita reiciendis quidem necessitatibus explicabo dolor cumque!",
    },
    footer: {
      text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
    },
    pageEnable: true,
    pageLabel: "Page ",
  };

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
                    Facture #: {location.state.params.id}
                    <br />
                    Générée: {location.state.params.Date}
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
                    {window.userInfo.nom_entreprise}
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
            <td>Total: €{location.state.params.Total}</td>
          </tr>
        </table>
      </div>

      <Button
        variant="contained"
        className="PrintInvoice"
        onClick={generatePDF}
      >
        Imprimer
      </Button>
    </>
  );
}
export default Generated_invoice;
