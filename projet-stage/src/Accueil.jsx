import Navbar from "./Navbar";
import NavbarVertical from "./NavbarVertical";
import Invoice from "./Invoice";
import Product from "./Product";
import Client from "./Client";
import Settings from "./Settings";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import "./Styles/Accueil.css";
function Accueil() {
  return (
    <>
      <Navbar />
      <div className="contentos_parent">
        <NavbarVertical />
        <div className="contentos">
          <Routes>
            {" "}
            <Route path="/Accueil/Invoice" element={<Invoice />} />
            <Route path="/Accueil/Client" element={<Client />} />
            <Route path="/Accueil/Product" element={<Product />} />
            <Route path="/Accueil/Settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
      <BottomNavigation showLabels className="copyrightFooter">
        <BottomNavigationAction label="WebCinq ©" />
      </BottomNavigation>
    </>
  );
}
export default Accueil;
