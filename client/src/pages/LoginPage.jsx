import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");   
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });

      console.log("Login response:", res.data);

      
      localStorage.setItem("token", res.data.token);

      //RD
      navigate("/dashboard");
    } catch (err) {
      console.error(err.response?.data);
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-blue-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-black mb-6 text-center">
          Login Page
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#F59E0B] outline-none"
              required
            />
          </div>

          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#F59E0B] outline-none pr-10"
                required
              />

              
              {/* <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button> */}
            </div>
          </div>

          
          <button
            type="submit"
            className="w-full bg-blue-700 text-white font-semibold py-2 rounded-md hover:bg-blue-800 transition"
          >
            Login
          </button>
        </form>
      </div>
    </section>
  );
}
