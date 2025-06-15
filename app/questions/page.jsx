// app/upgrade/page.js
"use client";
import React from 'react';
import Header from '../dashboard/_component/Header';
const questions = [
  "Tell me about yourself.",
  "What are your strengths and weaknesses?",
  "Why do you want to work for our company?",
  "Tell me about a time you faced a challenge at work.",
  "Where do you see yourself in 5 years?",
  "What makes you a good fit for this role?",
  "Describe a time when you worked in a team.",
  "How do you handle stress and pressure?",
  "Why should we hire you?",
  "Describe a successful project you worked on.",
  "What is your greatest professional achievement?",
  "How do you prioritize your tasks?",
  "Tell me about a time you had a conflict at work.",
  "What motivates you to do your best?",
  "Do you have any questions for us?"
];

function QuestionsPage() {
  return (
    <div>
      <Header />
      <div className="p-8">
        <h1 className="text-3xl font-bold text-center mb-6">General Interview Questions</h1>
        <p className="mb-4 text-gray-700 text-center max-w-2xl mx-auto">
          Here are some common questions that are asked in most interviews. Reflect on your answers to build confidence and preparation for any role.
        </p>
        <ul className="bg-white p-6 rounded-lg shadow max-w-3xl mx-auto space-y-4 border">
          {questions.map((q, i) => (
            <li key={i} className="p-4 rounded border hover:bg-gray-50">
              <strong>Q{i + 1}:</strong> {q}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default QuestionsPage;
