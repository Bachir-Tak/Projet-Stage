import logo from "./Assets/logo.jpeg";
import { useNavigate } from "react-router-dom";
import "./Styles/navbar.css";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

function Navbar() {
  const navigate = useNavigate();
  const cookies = new Cookies();

  function Logout(e) {
    e.preventDefault();
    cookies.remove("name");
    cookies.remove("userInfo");
    window.user = null;
    window.userICE = null;
    window.user_connect = false;
    navigate("/Login");
  }
  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-dark shadow mb-2 navos ">
        <div class="container-fluid">
          <div class=" imageBrand" href="#">
            <img src={logo} alt="Logo" />
          </div>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse " id="navbarNav">
            <ul class="navbar-nav navelm">
              <li class="nav-item">
                <Link class="nav-link" to="/Accueil">
                  Accueil
                </Link>{" "}
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/Accueil/Settings">
                  Paramètres
                </Link>
              </li>
              <li class="nav-item " onClick={Logout}>
                <div class="nav-link">Log Out</div>
              </li>
              <li class="nav-item nav-mob">
                <Link to="/Accueil/Invoice" class="nav-link ">
                  <div>Facture</div>
                </Link>
              </li>
              <li class="nav-item nav-mob">
                <Link to="/Accueil/Client" class="nav-link ">
                  <div>Client</div>
                </Link>
              </li>
              <li class="nav-item nav-mob">
                <Link to="/Accueil/Product" class="nav-link ">
                  <div>Produit</div>
                </Link>
              </li>
              <li class="nav-item nav-mob">
                <Link to="/Accueil/Bin" class="nav-link ">
                  <div>Corbeille</div>
                </Link>
              </li>

              <li class="nav-item ">
                <Link class="nav-link testos" aria-current="page" href="#">
                  <i class="fas fa-user-circle fa-xl "></i>{" "}
                  <div>{window.user}</div>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
export default Navbar;
