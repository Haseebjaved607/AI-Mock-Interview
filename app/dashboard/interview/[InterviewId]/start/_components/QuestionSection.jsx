"use client"
import { Lightbulb, Volume2 } from 'lucide-react';
import React from 'react';

function QuestionSection({ mockInterviewQuestion, activeQuestionIndex, setActiveQuestionIndex }) {
    const textToSpeech = (text) => {
        if ("speechSynthesis" in window) {
            const speech = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(speech);
        } else {
            alert("Sorry, your browser does not support text-to-speech.");
        }
    };

    return (
        mockInterviewQuestion && (
            <div className="p-5 border rounded-lg my-10">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {mockInterviewQuestion.map((question, index) => (
                        <h2
                        key={index}
                        onClick={() => setActiveQuestionIndex(index)} // Update index on click
                        className={`my-1 p-2 rounded-full text-xs md:text-sm text-center cursor-pointer ${
                          activeQuestionIndex === index ? 'bg-blue-700 text-white' : 'bg-secondary'
                        }`}
                      >
                        Question # {index + 1}: {question.question}
                      </h2>
                      
                    ))}
                </div>
                <h2 className="my-5 text-md md:text-lg mb-2">
                    {mockInterviewQuestion[activeQuestionIndex]?.Question}
                </h2>

                <Volume2
                    className="cursor-pointer"
                    onClick={() => {
                        if (window.speechSynthesis.speaking) {
                            window.speechSynthesis.cancel();
                        } else {
                            const text = mockInterviewQuestion[activeQuestionIndex]?.Question;
                            if (text) {
                                const speech = new SpeechSynthesisUtterance(text);
                                window.speechSynthesis.speak(speech);
                            }
                        }
                    }}
                />

                <div className="border rounded-lg p-5 bg-blue-100 mt-6">
                    <h2 className="flex gap-2 items-center text-blue-900">
                        <Lightbulb />
                        <strong>NOTE:</strong>
                    </h2>
                    <h2 className="text-sm text-blue-900 my-2">
                        {process.env.NEXT_PUBLIC_QUESTION_NOTE}
                    </h2>
                </div>
            </div>
        )
    );
}


export default QuestionSection;
