import "../../Styles/Invoice.css";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import axios from "axios";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "dayjs/locale/en-gb";

function Invoice() {
  const [rowtab, setrowtab] = useState([]);
  const [DateDu, setDateDu] = useState(null);
  const [DateAu, setDateAu] = useState(null);
  function Sendo() {
    const tab = [];
    axios
      .get(
        "http://192.168.0.195/Projet%20Stage/projet-stage/backend/Invoice.php",
        {
          params: { ice: window.userICE },
        }
      )
      .then((data) => {
        data.data.map((d) => {
          tab.push({
            id: d["id_facture"],
            Date: d["date_facture"],
            Total: d["TotalTTC"],
            Remise: d["Remise"],
            Client: d["nom_client"],
          });
        });
        setrowtab(tab);
      });
  }

  function Delete(params) {
    var client = params.row["Client"];
    axios
      .delete(
        "http://192.168.0.195/Projet%20Stage/projet-stage/backend/Invoice.php",
        {
          data: {
            id: params["id"],
            ice: window.userICE,
            actif: true,
            client: client,
          },
        }
      )
      .then((data) => {
        if (data.data == false) {
          Swal.fire(
            "Supprimé !",
            "Facture envoyée dans la corbeille !",
            "warning"
          );
          Sendo();
        } else {
          Swal.fire(
            "Erreur !",
            "Facture non envoyée dans la corbeille !",
            "error"
          );
        }
      });
  }
  function Search(paramsi) {
    const tab = [];
    axios
      .get(
        "http://192.168.0.195/Projet%20Stage/projet-stage/backend/Invoice.php",
        {
          params: { client: paramsi, ice: window.userICE, search: true },
        }
      )
      .then((data) => {
        if (data.data[0] == undefined) {
          Sendo();
        } else {
          if (!Array.isArray(data.data)) {
            tab.push({
              id: data.data[0]["id_facture"],
              Date: data.data[0]["date_facture"],
              Total: data.data[0]["TotalTTC"],
              Client: data.data[0]["nom_client"],
              Remise: data.data[0]["Remise"],
            });
          } else {
            data.data.map((d) => {
              tab.push({
                id: d["id_facture"],
                Date: d["date_facture"],
                Total: d["TotalTTC"],
                Client: d["nom_client"],
                Remise: d["Remise"],
              });
            });
          }
          setrowtab(tab);
        }
      });
  }
  function SearchDate() {
    const tab = [];
    axios
      .get(
        "http://192.168.0.195/Projet%20Stage/projet-stage/backend/Invoice.php",
        {
          params: {
            ice: window.userICE,
            Du: DateDu,
            Au: DateAu,
          },
        }
      )
      .then((data) => {
        console.log(data.data);
        if (data.data[0] == undefined) {
          Sendo();
        } else {
          if (!Array.isArray(data.data)) {
            tab.push({
              id: data.data[0]["id_facture"],
              Date: data.data[0]["date_facture"],
              Total: data.data[0]["TotalTTC"],
              Client: data.data[0]["nom_client"],
              Remise: data.data[0]["Remise"],
            });
          } else {
            data.data.map((d) => {
              tab.push({
                id: d["id_facture"],
                Date: d["date_facture"],
                Total: d["TotalTTC"],
                Client: d["nom_client"],
                Remise: d["Remise"],
              });
            });
          }
          setrowtab(tab);
        }
      });
  }
  function SearchDate1(params) {
    var datos =
      params["$y"] +
      "-" +
      Number(Number(params["$M"]) + Number(1)) +
      "-" +
      params["$D"];

    setDateDu(datos);
  }
  function SearchDate2(params) {
    var datos =
      params["$y"] +
      "-" +
      Number(Number(params["$M"]) + Number(1)) +
      "-" +
      params["$D"];

    setDateAu(datos);
  }
  function Clear() {
    setDateAu(null);
    setDateDu(null);
  }
  useEffect(() => {
    if (DateDu == null) {
      if (DateAu == null) {
        Sendo();
      }
    } else {
      if (new Date(DateAu) == "Invalid Date") {
        Sendo();
      } else {
        SearchDate();
      }
    }
  }, [DateAu]);
  useEffect(() => {
    if (DateAu == null) {
      if (DateDu == null) {
        Sendo();
      }
    } else {
      if (new Date(DateDu) == "Invalid Date") {
        Sendo();
      } else {
        SearchDate();
      }
    }
  }, [DateDu]);
  useEffect(() => {
    Sendo();
  }, []);
  const columns = [
    {
      field: "id",
      headerName: "ID",
      headerClassName: "tabHeader",
      headerAlign: "center",
      flex: 1,
      align: "center",
    },
    {
      field: "Date",
      headerName: "Date de facturation",
      headerClassName: "tabHeader",
      headerAlign: "center",
      flex: 1,
      align: "center",
    },
    {
      field: "Total",
      headerName: "TotalTTC",
      type: "number",
      headerClassName: "tabHeader",
      headerAlign: "center",
      flex: 1,
      align: "center",
      renderCell: (params) => {
        return <>{params.value} €</>;
      },
    },
    {
      field: "Remise",
      headerName: "Remise",
      type: "number",
      headerClassName: "tabHeader",
      headerAlign: "center",
      flex: 1,
      align: "center",
      renderCell: (params) => {
        return <>{params.value} %</>;
      },
    },
    {
      field: "Client",
      headerName: "Client",
      headerClassName: "tabHeader",
      headerAlign: "center",
      flex: 1,
      align: "center",
    },
    {
      field: "Action",
      headerName: "Action",
      renderCell: (params) => {
        return (
          <>
            <Link to={"/Accueil/Invoice_Edit/" + params["id"]}>
              <Button variant="contained" className="EditButton">
                Modifier
              </Button>
            </Link>
            <Link to={"/Accueil/VersionFacture/" + params["id"]}>
              <Button variant="contained" className="HistoriqueButton">
                Historique
              </Button>
            </Link>
            <Link to={"/Accueil/Gen_invoice"} state={{ params: params.row }}>
              <Button variant="contained" className="PrintButton">
                Imprimer
              </Button>
            </Link>
            <Button
              variant="contained"
              className="DeleteButton"
              onClick={() => Delete(params)}
            >
              Supprimer
            </Button>
          </>
        );
      },
      headerClassName: "tabHeader",
      headerAlign: "center",
      flex: 4,
      align: "center",
    },
  ];
  const rows = rowtab;
  const rowAuto = [];
  rowtab.forEach((element) => {
    if (!rowAuto.includes(element["Client"])) rowAuto.push(element["Client"]);
  });

  return (
    <div className="conteinero slide-in-left">
      <div className="Search-New">
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
          <DatePicker
            label="Du"
            className="form-control me-2 "
            sx={{ width: 175 }}
            value={DateDu}
            onChange={(params) => SearchDate1(params)}
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
          <DatePicker
            label="Au"
            className="form-control me-2 "
            sx={{ width: 175 }}
            onChange={(params) => SearchDate2(params)}
            value={DateAu}
          />
        </LocalizationProvider>
        <Button variant="contained" className="clearButton" onClick={Clear}>
          Vider
        </Button>
        <Autocomplete
          className="form-control me-2 "
          sx={{ width: 350 }}
          options={rowAuto}
          renderInput={(params) => <TextField {...params} label="Search" />}
          onChange={(event, params) => Search(params)}
        />
        <Link to="/Accueil/Invoice_new">
          <Button variant="contained">Nouveau</Button>
        </Link>
      </div>
      <div className="List-Mui">
        <DataGrid
          sx={{ ".MuiDataGrid-columnHeaders": { backgroundColor: "#0e8388" } }}
          style={{ borderRadius: "15px" }}
          rows={rows}
          columns={columns}
          pageSize={5}
          pageSizeOptions={[5, 10]}
          rowsPerPageOptions={[5]}
        />
      </div>
    </div>
  );
}

export default Invoice;
