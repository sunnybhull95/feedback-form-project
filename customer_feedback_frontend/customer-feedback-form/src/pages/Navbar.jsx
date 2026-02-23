import { useContext } from "react";
import { AuthContext } from "../globalapi/Authconstext";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <nav className="bg-blue-600 p-4 flex justify-between text-white">
      <h1 className="font-bold">Feedback System</h1>

      <div className="flex gap-4">
        <button
          onClick={() => navigate("/admin")}
          className="bg-green-500 px-3 py-1 rounded"
        >
          Admin
        </button>

        <button
          onClick={() => navigate("/feedback")}
          className="bg-yellow-500 px-3 py-1 rounded"
        >
          User
        </button>

        <button
          onClick={() => {
            logout();
            navigate("/");
          }}
          className="bg-red-500 px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
