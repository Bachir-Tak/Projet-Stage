import Navbar from "./Navbar";
import NavbarVertical from "./NavbarVertical";
import Invoice from "./Components/Invoice";
import Invoice_New from "./Components/Invoice_new";
import Invoice_Edit from "./Components/Invoice_edit";
import Client from "./Components/Client";
import Client_New from "./Components/Client_new";
import Client_Edit from "./Components/Client_Edit";
import Product from "./Components/Product";
import Product_New from "./Components/Product_new";
import Product_Edit from "./Components/Product_edit";
import Settings from "./Components/Settings";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import "./Styles/Accueil.css";
import Generated_invoice from "./Components/Generated_invoice";
import Home from "./Components/Home";
import Bin from "./Components/Bin";
import BinClient from "./Components/BinComponents/BinClient";
import BinFacture from "./Components/BinComponents/BinFacture";
import BinProduit from "./Components/BinComponents/BinProduit";
import Historique from "./Components/Historique";
import VersionFacture from "./Components/VersionFacture";

function Accueil() {
  return (
    <>
      <Navbar />
      <div className="contentos_parent ">
        <NavbarVertical />
        <div className="contentos">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Accueil/Invoice" element={<Invoice />} />
            <Route path="/Accueil/Invoice_new" element={<Invoice_New />} />
            <Route
              path="/Accueil/Invoice_edit/:id"
              element={<Invoice_Edit />}
            />
            <Route path="/Accueil/Client" element={<Client />} />
            <Route path="/Accueil/Client_new" element={<Client_New />} />
            <Route path="/Accueil/Client_Edit/:id" element={<Client_Edit />} />
            <Route path="/Accueil/Product" element={<Product />} />
            <Route path="/Accueil/Product_new" element={<Product_New />} />
            <Route
              path="/Accueil/Product_edit/:id"
              element={<Product_Edit />}
            />
            <Route
              path="/Accueil/Gen_invoice"
              element={<Generated_invoice />}
            />
            /Accueil/BinClient
            <Route path="/Accueil/Bin" element={<Bin />} />
            <Route path="/Accueil/BinClient" element={<BinClient />} />
            <Route path="/Accueil/BinFacture" element={<BinFacture />} />
            <Route path="/Accueil/BinProduit" element={<BinProduit />} />
            <Route path="/Accueil/Historique" element={<Historique />} />
            <Route
              path="/Accueil/VersionFacture/:id"
              element={<VersionFacture />}
            />
            <Route path="/Accueil/Settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
      <BottomNavigation showLabels className="copyrightFooter ">
        <BottomNavigationAction label="WebCinq ©" />
      </BottomNavigation>
    </>
  );
}
export default Accueil;
