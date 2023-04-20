import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
function Client() {
  const tab = [];
  const [rowtab, setrowtab] = useState([]);

  function Sendo() {
    axios
      .get("http://localhost/Projet%20Stage/projet-stage/backend/Client.php")
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
    axios
      .delete(
        "http://localhost/Projet%20Stage/projet-stage/backend/Client.php",
        { data: { id: params } }
      )
      .then((data) => {
        console.log(data.data);
        if (data.data == false) {
          Swal.fire("Supprimé !", "Client supprimé !", "success");
          Sendo();
        } else {
          Swal.fire("Erreur !", "Client non supprimé !", "error");
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
      field: "Edit",
      headerName: "Edit",
      renderCell: (params) => {
        return (
          <Link to={"/Accueil/Client_Edit/" + params["id"]}>
            <Button variant="contained" className="EditButton">
              Edit
            </Button>
          </Link>
        );
      },
      headerClassName: "tabHeader",
      headerAlign: "center",
      flex: 1,
      align: "center",
    },
    {
      field: "Delete",
      headerName: "Delete",
      renderCell: (params) => {
        return (
          <Button
            variant="contained"
            className="DeleteButton"
            onClick={() => Delete(params["id"])}
          >
            Delete
          </Button>
        );
      },
      headerClassName: "tabHeader",
      headerAlign: "center",
      flex: 1,
      align: "center",
    },
  ];
  const rows = rowtab;
  return (
    <div className="conteinero">
      <div className="Search-New">
        <form action="">
          <input
            className="form-control me-2 "
            type="search"
            placeholder="Search..."
            aria-label="Search"
          />
        </form>
        <Link to="/Accueil/Client_new">
          <Button variant="contained">New</Button>
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

export default Client;
