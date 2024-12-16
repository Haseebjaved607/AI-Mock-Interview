"use client"
import { useEffect, useState } from "react";
import Image from "next/image";  // Correct import for Image component
import { useRouter } from "next/navigation"; // For navigation

export default function Home() {
  const router = useRouter();  // Hook to handle navigation
  const [textIndex, setTextIndex] = useState(0);  // State for typing animation
  const [sentence, setSentence] = useState("");  // To store the current sentence

  const sentences = [
    "Mock I is an AI-driven web application designed to help you prepare for job interviews.",
    "It provides real-time feedback and ratings based on your interview responses.",
    "Mock I offers personalized interview simulations tailored to your needs.",
    "Get insightful, AI-powered analysis and improve your chances of success."
  ];

  useEffect(() => {
    // Immediately set the first sentence
    setSentence(sentences[textIndex]);

    const typingInterval = setInterval(() => {
      setSentence(sentences[textIndex]);
      setTextIndex((prevIndex) => (prevIndex + 1) % sentences.length);  // Loop through sentences
    }, 5000); // Update every 5 seconds for next sentence

    return () => clearInterval(typingInterval);  // Cleanup interval on component unmount
  }, [textIndex]);

  const goToDashboard = () => {
    router.push("/dashboard");  // Navigate to the dashboard on button click
  };

  return (
    <div className="relative h-screen bg-gradient-to-r from-[#000000] to-[#2a2a2a] text-white flex flex-col justify-center items-center">
      {/* Logo at the top left */}
      <div className="absolute top-5 left-5">
        <Image src="/mainlogo.png" alt="Mock I Logo" width={120} height={120} />
      </div>

      {/* Main Content */}
      <div className="flex flex-col justify-center items-center text-center z-20 space-y-6">
        {/* Welcome Text */}
        <h1 className="animate-fadeIn text-4xl md:text-5xl font-extrabold mb-4 mt-20 text-yellow-400">
          Welcome to Mock I
        </h1>

        {/* Typing Animation Description */}
        <div className="animate-typing-container text-lg mb-6 max-w-3xl mx-auto">
          <p className="animate-typing-sentence">{sentence}</p>
        </div>

        {/* Button to Dashboard */}
        <button
          onClick={goToDashboard}
          className="bg-gradient-to-r from-[#f0932b] to-[#f14d49] text-white px-6 py-3 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 hover:bg-gradient-to-r hover:from-[#f14d49] hover:to-[#f0932b]"
        >
          Go to Dashboard
        </button>
      </div>

      {/* Background Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black via-transparent to-black opacity-50 z-0"></div>

      {/* Keyframes for Animation */}
      <style jsx>{`
        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }

        .animate-fadeIn {
          animation: fadeIn 1s ease-out;
        }

        @keyframes typing {
          from { width: 0; }
          to { width: 100%; }
        }

        .animate-typing-container {
          position: relative;
          display: inline-block;
          max-width: 80%;
          white-space: nowrap;
          overflow: hidden;
          margin-bottom: 20px;
        }

        .animate-typing-sentence {
          display: inline-block;
          white-space: nowrap;
          overflow: hidden;
          width: 0;
          animation: typing 5s steps(30) 1s infinite;
        }

        /* Button fixed at the bottom */
        button.fixed {
          position: fixed;
          bottom: 20px;
        }
      `}</style>
    </div>
  );
}
