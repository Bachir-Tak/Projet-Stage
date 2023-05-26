import Navbar from "./Navbar";
import NavbarVertical from "./NavbarVertical";
import Invoice from "./Components/Invoice/Invoice";
import Invoice_New from "./Components/Invoice/Invoice_new";
import Invoice_Edit from "./Components/Invoice/Invoice_edit";
import Client from "./Components/Client/Client";
import Client_New from "./Components/Client/Client_new";
import Client_Edit from "./Components/Client/Client_Edit";
import Product from "./Components/Product/Product";
import Product_New from "./Components/Product/Product_new";
import Product_Edit from "./Components/Product/Product_edit";
import Settings from "./Components/Settings";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import "./Styles/Accueil.css";
import Generated_invoice from "./Components/Invoice/Generated_invoice";
import Home from "./Components/Home";
import Bin from "./Components/Bin/Bin";
import BinClient from "./Components/Bin/BinComponents/BinClient";
import BinFacture from "./Components/Bin/BinComponents/BinFacture";
import BinProduit from "./Components/Bin/BinComponents/BinProduit";
import Historique from "./Components/Historique";
import VersionFacture from "./Components/Invoice/VersionFacture";
import Devis from "./Components/Devis/Devis";
import Devis_New from "./Components/Devis/Devis_new";
import Devis_Edit from "./Components/Devis/Devis_edit";
import BinDevis from "./Components/Bin/BinComponents/BinDevis";
import Generated_Devis from "./Components/Devis/Generated_devis";
import Membres from "./Components/Membres/Membres";
import Membres_New from "./Components/Membres/Membres_new";

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
            <Route path="/Accueil/Devis" element={<Devis />} />
            <Route path="/Accueil/Devis_new" element={<Devis_New />} />
            <Route path="/Accueil/Devis_edit/:id" element={<Devis_Edit />} />
            <Route path="/Accueil/Gen_devis" element={<Generated_Devis />} />
            <Route path="/Accueil/Client" element={<Client />} />
            <Route path="/Accueil/Client_new" element={<Client_New />} />
            <Route path="/Accueil/Membres" element={<Membres />} />
            <Route path="/Accueil/Membres_new" element={<Membres_New />} />
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
            <Route path="/Accueil/Bin" element={<Bin />} />
            <Route path="/Accueil/BinClient" element={<BinClient />} />
            <Route path="/Accueil/BinFacture" element={<BinFacture />} />
            <Route path="/Accueil/BinProduit" element={<BinProduit />} />
            <Route path="/Accueil/BinDevis" element={<BinDevis />} />
            <Route path="/Accueil/Historique" element={<Historique />} />
            <Route
              path="/Accueil/VersionFacture/:id"
              element={<VersionFacture />}
            />
            <Route path="/Accueil/Settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
      <BottomNavigation showLabels className="copyrightFooter shadow ">
        <BottomNavigationAction label="WebCinq ©" />
      </BottomNavigation>
    </>
  );
}
export default Accueil;
