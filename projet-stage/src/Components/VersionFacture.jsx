import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function VersionFacture() {
  const [rowtab, setrowtab] = useState([]);
  let { id } = useParams();

  function Sendo() {
    const tab = [];
    axios
      .get(
        "http://localhost/Projet%20Stage/projet-stage/backend/VersionFacture.php",
        {
          params: { ice: window.userICE, id: id },
        }
      )
      .then((data) => {
        data.data.map((d) => {
          tab.push({
            id: d["id"],
            Date: d["date_facture"],
            Total: d["TotalTTC"],
            Remise: d["Remise"],
            Client: d["nom_client"],
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
        return <>{params.value} $</>;
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
  ];
  const rows = rowtab;
  const rowAuto = [];
  rowtab.forEach((element) => {
    if (!rowAuto.includes(element["Client"])) rowAuto.push(element["Client"]);
  });
  return (
    <div className="conteinero">
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

export default VersionFacture;
