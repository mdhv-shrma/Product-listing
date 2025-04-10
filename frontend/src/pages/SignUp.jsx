import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signUpUser } from "../api/auth"; // Import API function

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const data = await signUpUser({ name, email, password });
      toast.success(data.message, { position: "top-right", autoClose: 3000 });
      setTimeout(() => navigate("/login"), 3000);
    } catch (error) {
      toast.error(error, { position: "top-right", autoClose: 3000 });
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>
        <form onSubmit={handleSignUp} className="flex flex-col">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="p-3 mb-3 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
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
            Sign Up
          </button>
        </form>
        <p className="text-center text-gray-400 mt-4">
          Already have an account?{" "}
          <span className="text-white underline cursor-pointer" onClick={() => navigate("/login")}>
            Login
          </span>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
}

export default SignUp;
