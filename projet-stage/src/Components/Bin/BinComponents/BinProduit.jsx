import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
function BinProduit() {
  const [rowtab, setrowtab] = useState([]);

  function Sendo() {
    const tab = [];
    axios
      .get("http://localhost/Projet%20Stage/projet-stage/backend/Product.php", {
        params: { ice: window.userICE, actif: true },
      })
      .then((data) => {
        data.data.map((d) => {
          tab.push({
            id: d["id_produit"],
            Nom: d["nom"],
            Prix: d["prix_unitaire"],
            TVA: d["TVA"],
          });
        });
        setrowtab(tab);
      });
  }
  function Delete(params) {
    var name = params.row["Nom"];
    axios
      .delete(
        "http://localhost/Projet%20Stage/projet-stage/backend/Product.php",
        {
          data: { id: params["id"], ice: window.userICE, nom: name },
        }
      )
      .then((data) => {
        if (data.data == false) {
          Swal.fire("Supprimé !", "Produit supprimé !", "success");
          Sendo();
        } else {
          Swal.fire("Erreur !", "Produit non supprimé !", "error");
        }
      });
  }
  function Back(params) {
    var name = params.row["Nom"];

    axios
      .put("http://localhost/Projet%20Stage/projet-stage/backend/Product.php", {
        id: params["id"],
        ice: window.userICE,
        actif: true,
        nom: name,
      })
      .then((data) => {
        if (data.data == false) {
          Swal.fire("Restauré !", "Produit restauré !", "success");
          Sendo();
        } else {
          Swal.fire("Erreur !", "Produit non restauré !", "error");
        }
      });
  }
  function Search(paramsi) {
    const tab = [];
    axios
      .get("http://localhost/Projet%20Stage/projet-stage/backend/Product.php", {
        params: { nom: paramsi, ice: window.userICE, search: true },
      })
      .then((data) => {
        if (data.data[0] == undefined) {
          Sendo();
        } else {
          tab.push({
            id: data.data[0]["id_produit"],
            Nom: data.data[0]["nom"],
            Prix: data.data[0]["prix_unitaire"],
            TVA: data.data[0]["TVA"],
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
      field: "Prix",
      headerName: "Prix Unitaire",
      headerClassName: "tabHeader",
      headerAlign: "center",
      flex: 1,
      align: "center",
      renderCell: (params) => {
        return <>{params.value} €</>;
      },
    },
    {
      field: "TVA",
      headerName: "TVA",
      headerClassName: "tabHeader",
      headerAlign: "center",
      flex: 1,
      align: "center",
      renderCell: (params) => {
        return <>{params.value} %</>;
      },
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
              onClick={() => Delete(params)}
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

export default BinProduit;
