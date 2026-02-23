import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../globalapi/api";
import { AuthContext } from "../globalapi/Authconstext";

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", form);
      login(res.data);
      navigate("/feedback");
    } catch {
      setMessage("Invalid credentials plss try again");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-6 shadow-2xl shadow-black/50 rounded">
      <h2 className="text-2xl font-bold mb-4 mx-40">Login</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="border p-2"
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="border p-2"
          onChange={handleChange}
          required
        />

        <button className="border-2 border-red-black  p-2 rounded cursor-pointer">
          Login
        </button>
      </form>

      <p className="mt-4">
        Don't have account?{" "}
        <Link to="/register" className="text-red-600">
          Register
        </Link>
      </p>

      {message && (
        <div className="text-red-500 border-2 border-red-600 flex justify-center">
          <p>{message}</p>
        </div>
      )}
    </div>
  );
}

export default Login;
