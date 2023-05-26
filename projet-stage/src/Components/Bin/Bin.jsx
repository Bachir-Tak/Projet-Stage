import "../../Styles/Bin.css";
import { Link } from "react-router-dom";
function Bin() {
  return (
    <>
      <div className="allBin slide-in-left">
        <div className="OneBin shadow">
          <Link to="/Accueil/BinClient">
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-mood-smile"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#2E4F4F"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <circle cx="12" cy="12" r="9" />
              <line x1="9" y1="10" x2="9.01" y2="10" />
              <line x1="15" y1="10" x2="15.01" y2="10" />
              <path d="M9.5 15a3.5 3.5 0 0 0 5 0" />
            </svg>{" "}
            <h5>Client</h5>
          </Link>
        </div>
        <div className="OneBin shadow">
          <Link to="/Accueil/BinProduit">
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-archive"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#2E4F4F"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <rect x="3" y="4" width="18" height="4" rx="2" />
              <path d="M5 8v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-10" />
              <line x1="10" y1="12" x2="14" y2="12" />
            </svg>
            <h5>Produit</h5>
          </Link>
        </div>
        <div className="OneBin BinInvoice shadow">
          <Link to="/Accueil/BinFacture">
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-file-invoice"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#2E4F4F"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M14 3v4a1 1 0 0 0 1 1h4" />
              <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
              <line x1="9" y1="7" x2="10" y2="7" />
              <line x1="9" y1="13" x2="15" y2="13" />
              <line x1="13" y1="17" x2="15" y2="17" />
            </svg>{" "}
            <h5>Facture</h5>
          </Link>
        </div>
        <div className="OneBin BinInvoice shadow">
          <Link to="/Accueil/BinDevis">
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-file-dollar"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#2E4F4F"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M14 3v4a1 1 0 0 0 1 1h4" />
              <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
              <path d="M14 11h-2.5a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 1 0 3h-2.5" />
              <path d="M12 17v1m0 -8v1" />
            </svg>
            <h5>Devis</h5>
          </Link>
        </div>
      </div>
    </>
  );
}
export default Bin;
