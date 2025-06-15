// app/how-it-works/page.js
"use client";
import React from 'react';
import Header from '../dashboard/_component/Header';
import { Lightbulb } from 'lucide-react';

function HowItWorksPage() {
  return (
    <div>
      <Header />
      <div className="p-8 max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold mb-2 flex justify-center items-center gap-2 text-purple-600">
            <Lightbulb className="h-7 w-7" /> How It Works
          </h1>
          <p className="text-gray-600">Follow these simple steps to get started with your mock interview experience.</p>
        </div>

        <ol className="list-decimal space-y-6 p-16 bg-white rounded-lg shadow-md border">
          <li>
            <strong>Visit the Website:</strong> Go to the homepage of the mock interview application.
          </li>
          <li>
            <strong>Sign In / Sign Up:</strong> Log in using Google, Facebook, or email through Clerk authentication.
          </li>
          <li>
            <strong>Access Dashboard:</strong> After signing in, you'll land on your personalized dashboard.
          </li>
          <li>
            <strong>Start an Interview:</strong> Click the "Start Interview" button.
          </li>
          <li>
            <strong>Fill Interview Details:</strong> Select your <em>Job Role</em>, <em>Job Description</em>, and <em>Years of Experience</em>.
          </li>
          <li>
            <strong>Enable Webcam & Mic:</strong> Allow access to your webcam and microphone for a real interview experience.
          </li>
          <li>
            <strong>Begin Interview:</strong> The system will display questions one by one. Speak your answers aloud.
          </li>
          <li>
            <strong>AI Feedback:</strong> Your answers are analyzed using AI and feedback is provided based on confidence, clarity, and accuracy.
          </li>
          <li>
            <strong>Review Results:</strong> At the end, you'll get a score and personalized tips for improvement.
          </li>
        </ol>
      </div>
    </div>
  );
}

export default HowItWorksPage;
