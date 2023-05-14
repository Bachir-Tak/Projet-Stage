import logo from "./Assets/logo.jpeg";
import { useNavigate } from "react-router-dom";
import "./Styles/navbar.css";
function Navbar() {
  const navigate = useNavigate();

  function Logout(e) {
    e.preventDefault();
    window.user = null;
    window.userICE = null;
    window.user_connect = false;
    navigate("/Login");
  }
  return (
    <>
      <nav class="navbar navbar-expand-lg navos ">
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
          <form class="d-flex" role="search">
            <input
              class="form-control me-2 searchNav"
              type="search"
              placeholder="Search..."
              aria-label="Search"
            />
          </form>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">
                  <div className="text-white userButton">
                    <i class="fas fa-user-circle    "></i> {window.user}{" "}
                    <i class="fas fa-arrow-left    " onClick={Logout}></i>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
export default Navbar;
