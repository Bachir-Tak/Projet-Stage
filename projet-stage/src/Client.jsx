import "./Styles/Client.css";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
function Client() {
  const columns = [
    {
      field: "id",
      headerName: "ID",
      headerClassName: "tabHeaderLeft",
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
      renderCell: () => {
        return (
          <Button variant="contained" className="EditButton">
            Edit
          </Button>
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
      renderCell: () => {
        return (
          <Button variant="contained" className="DeleteButton">
            Delete
          </Button>
        );
      },
      headerClassName: "tabHeaderRight",
      headerAlign: "center",
      flex: 1,
      align: "center",
    },
  ];
  const rows = [
    { id: 21, Nom: "Hamid", Adresse: "30 rue Noor", Tel: "0562748590" },
    { id: 21, Nom: "Hamid", Adresse: "30 rue Noor", Tel: "0562748590" },
    { id: 21, Nom: "Hamid", Adresse: "30 rue Noor", Tel: "0562748590" },
    { id: 21, Nom: "Hamid", Adresse: "30 rue Noor", Tel: "0562748590" },
  ];
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
        <Button variant="contained">New</Button>
      </div>
      <div className="List-Mui">
        <DataGrid
          style={{ borderRadius: "15px" }}
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </div>
    </div>
  );
}

export default Client;
