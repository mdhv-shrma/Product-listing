import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginUser } from "../api/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser({ email, password });
  
      // Store authentication details in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId); // Store user ID
      localStorage.setItem("isAuthenticated", "true");
  
      toast.success("Login Successful", { position: "top-right", autoClose: 3000 });
  
      setTimeout(() => navigate("/"), 3000);
    } catch (error) {
      toast.error(error.message || "Login failed", { position: "top-right", autoClose: 3000 });
    }
  };
  

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <form onSubmit={handleLogin} className="flex flex-col">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-3 mb-3 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="p-3 mb-4 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          <button
            type="submit"
            className="bg-white text-gray-900 font-semibold p-3 rounded-md hover:bg-gray-300 transition"
          >
            Login
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
