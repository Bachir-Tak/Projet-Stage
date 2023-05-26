import Accueil from "./Accueil";

import Login from "./Login";
import Signup from "./Signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

function App() {
  const navigate = useNavigate();
  const cookies = new Cookies();
  function verify_login(path, component) {
    if (cookies.get("name") && cookies.get("userInfo")) {
      window.user_connect = true;
      window.userICE = cookies.get("userInfo")["nb_ICE"];
      window.user = cookies.get("name");
      window.userInfo = cookies.get("userInfo");
    }
    if (window.user_connect == false || window.user_connect == undefined) {
      if (path == "/Signup") {
        return <Signup />;
      }
      return <Login />;
    }
    if (path == "/Login") {
      return <Accueil />;
    }
    if (path == "/Signup") {
      return <Accueil />;
    }
    return component;
  }
  return (
    <>
      <Routes>
        <Route path="/" element={verify_login("/", <Accueil />)} />

        <Route path="/Login" element={verify_login("/Login", <Login />)} />
        <Route path="/Signup" element={verify_login("/Signup", <Signup />)} />
        <Route
          path="/Accueil"
          element={verify_login("/Accueil", <Accueil />)}
        />

        <Route path="*" element={verify_login("*", <Accueil />)} />
      </Routes>
    </>
  );
}

export default App;
