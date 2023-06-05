import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
function Membres() {
  const [rowtab, setrowtab] = useState([]);

  function Sendo() {
    const tab = [];
    axios
      .get(
        "http://192.168.0.195/Projet%20Stage/projet-stage/backend/Membres.php",
        {
          params: { ice: window.userICE },
        }
      )
      .then((data) => {
        data.data.map((d) => {
          tab.push({
            id: d["id"],
            Nom: d["Nom"],
            Email: d["Email"],
          });
        });
        setrowtab(tab);
      });
  }
  function Delete(params) {
    var name = params.row["Nom"];
    axios
      .delete(
        "http://192.168.0.195/Projet%20Stage/projet-stage/backend/Membres.php",
        {
          data: {
            id: params["id"],
            ice: window.userICE,
            actif: true,
            Nom: name,
          },
        }
      )
      .then((data) => {
        if (data.data == false) {
          Swal.fire("Supprimé !", "Membre supprimé !", "warning");
          Sendo();
        } else {
          Swal.fire("Erreur !", "Membre non supprimé", "error");
        }
      });
  }
  function Search(paramsi) {
    const tab = [];
    axios
      .get(
        "http://192.168.0.195/Projet%20Stage/projet-stage/backend/Membres.php",
        {
          params: { Nom: paramsi, ice: window.userICE, search: true },
        }
      )
      .then((data) => {
        if (data.data[0] == undefined) {
          Sendo();
        } else {
          tab.push({
            id: data.data[0]["id"],
            Nom: data.data[0]["Nom"],
            Email: data.data[0]["Email"],
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
      field: "Email",
      headerName: "Email",
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

        <Link to="/Accueil/Membres_new">
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

export default Membres;
