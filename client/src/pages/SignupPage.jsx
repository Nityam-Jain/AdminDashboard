import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); // stop page reload
        setError("");

        //  confirm password
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const res = await axios.post("http://localhost:5000/api/signup", {
                name,
                email,
                password,

            });

            console.log("Signup response:", res.data);

            // Save token in localStorage
            localStorage.setItem("token", res.data.token);

            navigate("/dashboard");

        } catch (err) {
            console.error("Signup error:", err.response?.data);
            setError(err.response?.data?.message || "Something went wrong");
        }
    };


    return (
        <section className="flex items-center justify-center min-h-screen bg-blue-200 px-4">
            <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-[#0B1C3B] mb-6 text-center">
                    Create Account
                </h2>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                        </label>
                        <input
                            type="text"
                            placeholder="John Doe"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#F59E0B] outline-none"
                            required
                        />
                    </div>

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
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#F59E0B] outline-none"
                            required
                        />
                    </div>


                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#F59E0B] outline-none"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#F59E0B] text-[#0B1C3B] font-semibold py-2 rounded-md hover:bg-[#d97706] transition"
                    >
                        Sign Up
                    </button>
                </form>

                <p className="text-center text-sm text-gray-600 mt-4">
                    Already have an account?{" "}
                    <a
                        href="/"
                        className="text-[#F59E0B] font-medium hover:underline"
                    >
                        Click here
                    </a>
                </p>
            </div>
        </section>
    );
}

