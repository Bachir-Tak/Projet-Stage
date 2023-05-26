import "./Styles/navbarVertical.css";
import { Link } from "react-router-dom";
function NavbarVertical() {
  return (
    <>
      <nav className="navbarVertical ">
        <Link to="/Accueil">
          <div className="navbtn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-home"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#2E4F4F"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <polyline points="5 12 3 12 12 3 21 12 19 12" />
              <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
              <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
            </svg>{" "}
            Accueil
          </div>
        </Link>
        <Link to="/Accueil/Invoice">
          <div className="navbtn">
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
            Facture
          </div>
        </Link>
        <Link to="/Accueil/Devis">
          <div className="navbtn">
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
            Devis
          </div>
        </Link>
        <Link to="/Accueil/Client">
          <div className="navbtn">
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
            Client
          </div>
        </Link>
        <Link to="/Accueil/Product">
          <div className="navbtn">
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
            Produit
          </div>
        </Link>

        <Link to="/Accueil/Bin">
          <div className="navbtn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-trash-x"
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
              <path d="M4 7h16" />
              <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
              <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
              <path d="M10 12l4 4m0 -4l-4 4" />
            </svg>
            Corbeille
          </div>
        </Link>
      </nav>
    </>
  );
}
export default NavbarVertical;
