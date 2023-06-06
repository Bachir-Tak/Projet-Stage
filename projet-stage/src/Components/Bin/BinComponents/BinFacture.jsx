import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import axios from "axios";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
function BinFacture() {
  const [rowtab, setrowtab] = useState([]);

  function Sendo() {
    const tab = [];
    axios
      .get("http://localhost/Projet%20Stage/projet-stage/backend/Invoice.php", {
        params: { ice: window.userICE, actif: true },
      })
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
        "http://localhost/Projet%20Stage/projet-stage/backend/Invoice.php",
        {
          data: { ice: window.userICE, id: params["id"], client: client },
        }
      )
      .then((data) => {
        if (data.data == false) {
          Swal.fire("Supprimé !", "Facture supprimée !", "success");
          Sendo();
        } else {
          Swal.fire("Erreur !", "Facture non supprimée !", "error");
        }
      });
  }
  function Back(params) {
    var client = params.row["Client"];
    axios
      .put("http://localhost/Projet%20Stage/projet-stage/backend/Invoice.php", {
        id: params["id"],
        ice: window.userICE,
        actif: true,
        client: client,
      })
      .then((data) => {
        if (data.data == false) {
          Swal.fire("Restauré !", "Facture restauré !", "success");
          Sendo();
        } else {
          Swal.fire("Erreur !", "Facture non restauré !", "error");
        }
      });
  }
  function Search(paramsi) {
    const tab = [];
    axios
      .get("http://localhost/Projet%20Stage/projet-stage/backend/Invoice.php", {
        params: { client: paramsi, ice: window.userICE, search: true },
      })
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
            <Button
              variant="contained"
              className="BackButton"
              onClick={() => Back(params)}
            >
              Restaurer
            </Button>
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
      flex: 4.4,
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
        <Autocomplete
          className="form-control me-2 "
          sx={{ width: 700 }}
          options={rowAuto}
          renderInput={(params) => <TextField {...params} label="Search" />}
          onChange={(event, params) => Search(params)}
        />
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

export default BinFacture;
