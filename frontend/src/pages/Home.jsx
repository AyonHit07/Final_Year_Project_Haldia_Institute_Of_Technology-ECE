import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const userName = "Ayon"; // You can replace this with dynamic data from context or props

  const aiServices = [
    { name: "Chatbot Assistant", route: "/home/chatbot", emoji: "💬" },
    { name: "Image Generator", route: "/image-generator", emoji: "🎨" },
    { name: "Text Summarizer", route: "/text-summarizer", emoji: "🧠" },
    { name: "Code Assistant", route: "/code-assistant", emoji: "💻" },
    { name: "Speech to Text", route: "/speech-to-text", emoji: "🎤" },
    { name: "Text to Speech", route: "/text-to-speech", emoji: "🔊" },
    { name: "AI Translator", route: "/translator", emoji: "🌐" },
    { name: "Document Analyzer", route: "/document-analyzer", emoji: "📄" },
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white flex flex-col">
      {/* Header */}
      <header className="w-full px-6 py-4 flex justify-between items-center bg-white/10 backdrop-blur-md border-b border-white/20 shadow-sm">
        <h1 className="text-2xl font-bold tracking-wide">AI Services Dashboard ⚙️</h1>
        <div className="text-lg font-semibold">
          Welcome, <span className="text-pink-300">{userName}</span> 👋
        </div>
      </header>

      {/* Main Content */}
      <main className="grow p-6">
        <h2 className="text-xl font-semibold mb-6">Explore Our AI Services</h2>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {aiServices.map((service, index) => (
            <div
              key={index}
              onClick={() => navigate(service.route)}
              className="bg-white/10 hover:bg-white/20 cursor-pointer rounded-2xl p-6 flex flex-col items-center justify-center text-center transition-all duration-300 border border-white/20 hover:scale-105 shadow-lg"
            >
              <div className="text-5xl mb-3">{service.emoji}</div>
              <h3 className="text-lg font-semibold">{service.name}</h3>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-4 text-sm text-gray-200 bg-white/5 border-t border-white/10">
        © {new Date().getFullYear()} AI Hub — Built with 💙 by Ayon
      </footer>
    </div>
  );
}
