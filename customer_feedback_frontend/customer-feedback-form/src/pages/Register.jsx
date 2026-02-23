import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../globalapi/api";

function Register() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", form);
      setMessage("Registered Successfully");
      navigate("/");
    } catch (err) {
      setMessage(err.response?.data?.message || "Error occurred");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-6 shadow-2xl shadow-black/50 rounded">
      <h2 className="text-2xl font-bold mb-4 mx-40">Register</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          name="name"
          placeholder="Name"
          className="border p-2"
          onChange={handleChange}
          required
        />
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

        <button className="border-2 border-black p-2 rounded">Register</button>
      </form>

      <p className="mt-4">
        Already have account?{" "}
        <Link to="/" className="text-red-500">
          Login
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

export default Register;
