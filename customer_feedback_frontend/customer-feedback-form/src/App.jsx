import { Routes, Route, useLocation } from "react-router-dom";
import { useContext } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Feedback from "./pages/Feedback";
import { AuthContext } from "./globalapi/Authconstext";
import Navbar from "./pages/Navbar";
import Admin from "./pages/Admin";

function App() {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  const hideNavbar =
    location.pathname === "/" || location.pathname === "/register";

  return (
    <div className="min-h-screen bg-white">
      {user && !hideNavbar && <Navbar />}

      <div className="p-6">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
