import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock } from "lucide-react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-linear-to-tr from-indigo-600 via-purple-600 to-pink-500 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-[90%] max-w-md backdrop-blur-lg bg-white/10 rounded-3xl shadow-2xl p-8 border border-white/20"
      >
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          {isLogin ? "Welcome Back 👋" : "Create an Account ✨"}
        </h1>

        <div className="flex justify-center mb-8">
          <button
            onClick={() => setIsLogin(true)}
            className={`px-6 py-2 rounded-l-full cursor-pointer ${isLogin
                ? "bg-white text-indigo-600 font-semibold"
                : "bg-transparent text-white hover:bg-white/20"
              }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`px-6 py-2 rounded-r-full cursor-pointer ${!isLogin
                ? "bg-white text-indigo-600 font-semibold"
                : "bg-transparent text-white hover:bg-white/20"
              }`}
          >
            Signup
          </button>
        </div>

        <form className="space-y-5">
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-white/70" size={20} />
            <input
              type="email"
              placeholder="Email"
              className="w-full bg-white/20 text-white placeholder-white/60 pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3 text-white/70" size={20} />
            <input
              type="password"
              placeholder="Password"
              className="w-full bg-white/20 text-white placeholder-white/60 pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          {!isLogin && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full bg-white/20 text-white placeholder-white/60 pl-4 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </motion.div>
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="w-full bg-linear-to-r from-pink-500 to-indigo-500 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer"
          >
            {isLogin ? "Login" : "Sign Up"}
          </motion.button>
        </form>

        <p className="text-center text-white/70 mt-6 text-sm">
          {isLogin
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-pink-300 hover:underline font-medium cursor-pointer"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </motion.div>
    </div>
  );
}
