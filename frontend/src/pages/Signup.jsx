import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast"
import { axiosInstance } from "../lib/axios.js"
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

    return true;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = validateForm()
    if (success === true) {
      try {
        const res = await axiosInstance.post("/auth/signup", formData)
        if (res.status !== 201) {
          return toast.error(res.message)
        }
        toast.success("Account created successfully")
        navigate('/login')
      } catch (error) {
        toast.error(error.response.data.message)
      }
      finally {
        setFormData({
          email: "",
          password: ""
        })
      }
    }
    // console.log(formData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 animate-gradient overflow-hidden">
      {/* Signup Card */}
      <div className="w-[90%] max-w-sm bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg p-6 sm:p-8">
        <h1 className="text-3xl font-extrabold text-center text-white mb-2">
          Create Account ✨
        </h1>
        <p className="text-center text-gray-200 mb-8">
          Join our community and start exploring!
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-gray-100 mb-2 text-sm font-medium">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-white/20 text-white placeholder-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-pink-400 transition-all"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-100 mb-2 text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-white/20 text-white placeholder-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-pink-400 transition-all"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 text-lg font-semibold rounded-lg text-white bg-linear-to-r from-pink-500 to-indigo-500 hover:opacity-90 transition-all duration-300 shadow-lg cursor-pointer"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-200 text-sm mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-pink-300 hover:underline font-semibold">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
