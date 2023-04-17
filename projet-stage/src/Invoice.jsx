import "./Styles/Invoice.css";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
function Invoice() {
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
      field: "Date",
      headerName: "Date de facturation",
      headerClassName: "tabHeader",
      headerAlign: "center",
      flex: 1,
      align: "center",
    },
    {
      field: "Total",
      headerName: "Total",
      type: "number",
      headerClassName: "tabHeader",
      headerAlign: "center",
      flex: 1,
      align: "center",
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
    { id: 1, Date: "23/07/2003", Total: 5000, Client: "Test" },
    { id: 1, Date: "23/07/2003", Total: 5000, Client: "Test" },
    { id: 1, Date: "23/07/2003", Total: 5000, Client: "Test" },
    { id: 1, Date: "23/07/2003", Total: 5000, Client: "Test" },
    { id: 1, Date: "23/07/2003", Total: 5000, Client: "Test" },
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

export default Invoice;
