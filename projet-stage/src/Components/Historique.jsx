import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
function Historique() {
  const [rowtab, setrowtab] = useState([]);

  function Sendo() {
    const tab = [];
    axios
      .get(
        "http://localhost/Projet%20Stage/projet-stage/backend/Historique.php",
        {
          params: { ice: window.userICE },
        }
      )
      .then((data) => {
        data.data.map((d) => {
          tab.push({
            id: d["id"],
            Action: d["action"],
            Date: d["date"],
          });
        });
        setrowtab(tab);
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
      flex: 0.2,
      align: "center",
    },
    {
      field: "Date",
      headerName: "Date",
      headerClassName: "tabHeader",
      headerAlign: "center",
      flex: 0.3,
      align: "center",
    },
    {
      field: "Action",
      headerName: "Action",
      headerClassName: "tabHeader",
      headerAlign: "center",
      flex: 1,
      align: "center",
    },
  ];
  const rows = rowtab;
  return (
    <div className="conteinero slide-in-left">
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

export default Historique;
