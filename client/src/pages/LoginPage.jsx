import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { EyeIcon } from "@heroicons/react/24/outline";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!rememberMe) {
      alert("Please check 'Remember Me' before logging in.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });

      console.log("Login response:", res.data);

      localStorage.setItem("token", res.data.token);


      if (rememberMe) {
        localStorage.setItem("token", res.data.token);
      } else {
        sessionStorage.setItem("token", res.data.token);
      }

      navigate("/DashboardLayout");
    } catch (err) {
      console.error(err.response?.data);
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  const handleShowPassword = () => {
    setShowPassword(true);
    setTimeout(() => setShowPassword(false), 1000);
  };

  return (

    <section className="flex items-center justify-center min-h-screen bg-blue-100 px-4">

      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-black mb-6 text-center">
         Admin Login
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Email */}
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

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#F59E0B] outline-none pr-10"
                required
              />
              {/* Eye Icon Button */}
              <button
                type="button"
                onClick={handleShowPassword}
                className="absolute inset-y-0 right-3 flex items-center"
              >
                <EyeIcon className="h-5 w-5 text-gray-500 hover:text-gray-700" />
              </button>
            </div>
          </div>

          {/* ✅ Remember Me */}
          <div className="flex items-center">
            <input
              id="rememberMe"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <label
              htmlFor="rememberMe"
              className="ml-2 block text-sm text-gray-700"
            >
              Remember Me
            </label>
          </div>

          {/* Submit */}
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
