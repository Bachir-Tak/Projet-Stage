import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  PointElement,
  LineElement,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import axios from "axios";
import { useEffect, useState } from "react";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title
);

function Home() {
  const [rowtab, setrowtab] = useState([]);

  function Sendo() {
    const tab = [];
    axios
      .get("http://localhost/Projet%20Stage/projet-stage/backend/Invoice.php", {
        params: { ice: window.userICE },
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
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  };
  function CallFactures() {
    const tab = [];
    rowtab.forEach((e) => {
      var i = 0;
      tab.forEach((ev) => {
        if (ev.includes(e["Client"])) {
          ev[1] = ev[1] + 1;
          i = 1;
        }
      });
      if (i == 0) {
        tab.push([e["Client"], 1]);
      }
    });
    return tab;
  }
  function CallFacturesDates() {
    const tab = [];
    rowtab.forEach((e) => {
      tab.push([e["Date"], e["Total"]]);
    });
    return tab;
  }
  function CallFacturesClient() {
    const tab = [];
    rowtab.forEach((e) => {
      tab.push([e["Client"], e["Total"]]);
    });
    return tab;
  }
  const data1 = {
    labels: (function AfficheClient() {
      const tab = [];
      CallFactures().forEach((e) => {
        tab.push(e[0]);
      });
      console.log(tab);
      return tab;
    })(),
    datasets: [
      {
        label: "# de Factures",
        data: (function AfficheNombre() {
          const tab = [];
          CallFactures().forEach((e) => {
            tab.push(e[1]);
          });
          console.log(tab);
          return tab;
        })(),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const data2 = {
    labels: (function AfficheDate() {
      const tab = [];
      CallFacturesDates().forEach((e) => {
        tab.push(e[0]);
      });
      tab.reverse();
      return tab;
    })(),
    datasets: [
      {
        label: "Total de la facture en DH",

        data: (function AfficheFactureTotal() {
          const tab = [];
          CallFacturesDates().forEach((e) => {
            tab.push(e[1]);
          });
          tab.reverse();

          return tab;
        })(),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const data3 = {
    labels: (function AfficheDate() {
      const tab = [];
      CallFacturesClient().forEach((e) => {
        tab.push(e[0]);
      });
      return tab;
    })(),
    datasets: [
      {
        label: "# of Votes",
        data: (function AfficheFactureTotal() {
          const tab = [];
          CallFacturesClient().forEach((e) => {
            tab.push(e[1]);
          });
          return tab;
        })(),
        barPercentage: 0.9,

        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  useEffect(() => {
    Sendo();
  }, []);
  return (
    <div className="Charts slide-in-left">
      <div className="Diag Pie">
        <Pie data={data1} options={options} />
      </div>
      <div className="Diag Line">
        <Line data={data2} options={options} />
      </div>
      <div className="Diag Bar">
        <Bar data={data3} options={options} />
      </div>
    </div>
  );
}
export default Home;
