import Accueil from "./Accueil";

import Login from "./Login";
import Signup from "./Signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  function verify_login(path, component) {
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
