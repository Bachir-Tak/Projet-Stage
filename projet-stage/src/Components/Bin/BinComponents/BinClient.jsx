import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
function BinClient() {
  const [rowtab, setrowtab] = useState([]);
  const [rowtabInvoice, setrowtabInvoice] = useState([]);

  function Sendo() {
    const tab = [];
    axios
      .get("http://localhost/Projet%20Stage/projet-stage/backend/Client.php", {
        params: { ice: window.userICE, actif: true },
      })
      .then((data) => {
        data.data.map((d) => {
          tab.push({
            id: d["id_client"],
            Nom: d["nom_client"],
            Adresse: d["adresse_client"],
            Tel: d["tel_client"],
          });
        });
        setrowtab(tab);
      });
  }
  function Delete(params) {
    var name = params.row["Nom"];
    axios
      .delete(
        "http://localhost/Projet%20Stage/projet-stage/backend/Client.php",
        {
          data: { ice: window.userICE, id: params["id"], nom: name },
        }
      )
      .then((data) => {
        if (data.data == false) {
          Swal.fire("Supprimé !", "Client supprimé !", "success");
          Sendo();
        } else {
          Swal.fire("Erreur !", "Client non supprimé !", "error");
        }
      });
  }
  function DeleteWithInvoice(params) {
    var name = params.row["Nom"];
    axios
      .delete(
        "http://localhost/Projet%20Stage/projet-stage/backend/Client.php",
        {
          data: {
            id: params["id"],
            ice: window.userICE,
            withInvoice: true,
            nom: name,
          },
        }
      )
      .then((data) => {
        {
          Swal.fire("Supprimé !", "Client supprimé !", "success");
          Sendo();
        }
      });
  }
  function Back(params) {
    var name = params.row["Nom"];
    axios
      .put("http://localhost/Projet%20Stage/projet-stage/backend/Client.php", {
        id: params["id"],
        ice: window.userICE,
        actif: true,
        nom: name,
      })
      .then((data) => {
        if (data.data == false) {
          Swal.fire("Restauré !", "Client restauré !", "success");
          Sendo();
        } else {
          Swal.fire("Erreur !", "Client non restauré !", "error");
        }
      });
  }
  function Search(paramsi) {
    const tab = [];
    axios
      .get("http://localhost/Projet%20Stage/projet-stage/backend/Client.php", {
        params: { nom: paramsi, ice: window.userICE, search: true },
      })
      .then((data) => {
        if (data.data[0] == undefined) {
          Sendo();
        } else {
          tab.push({
            id: data.data[0]["id_client"],
            Nom: data.data[0]["nom_client"],
            Adresse: data.data[0]["adresse_client"],
            Tel: data.data[0]["tel_client"],
          });
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
      field: "Nom",
      headerName: "Nom",
      headerClassName: "tabHeader",
      headerAlign: "center",
      flex: 1,
      align: "center",
    },
    {
      field: "Adresse",
      headerName: "Adresse",
      headerClassName: "tabHeader",
      headerAlign: "center",
      flex: 1,
      align: "center",
    },
    {
      field: "Tel",
      headerName: "Téléphone",
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
            <Button
              variant="contained"
              className="DeleteButton"
              onClick={() =>
                Swal.fire({
                  title: "Suppression ?",
                  text: "Supprimer le Client avec ses factures ?",
                  icon: "question",
                  showDenyButton: true,
                }).then((result) => {
                  if (result.isConfirmed) {
                    DeleteWithInvoice(params);
                  } else if (result.isDenied) {
                    Delete(params);
                  }
                })
              }
            >
              Supprimer
            </Button>
          </>
        );
      },
      headerClassName: "tabHeader",
      headerAlign: "center",
      flex: 2.5,
      align: "center",
    },
  ];
  const rows = rowtab;
  const rowAuto = [];
  rowtab.forEach((element) => {
    rowAuto.push(element["Nom"]);
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

export default BinClient;
