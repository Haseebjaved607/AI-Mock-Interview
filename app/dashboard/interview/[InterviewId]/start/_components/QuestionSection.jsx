import { Lightbulb } from 'lucide-react';
import React from 'react';

function QuestionSection({ mockInterviewQuestion, activeQuestionIndex }) {
    console.log(mockInterviewQuestion);

    return mockInterviewQuestion && (
        <div className='p-5 border rounded-lg my-10'>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 '>
                {mockInterviewQuestion && mockInterviewQuestion.map((question, index) => (
                    <h2 key={index}
                        className={`my-1 p-2 bg-secondary rounded-full text-xs md:text-sm text-center cursor-pointer ${activeQuestionIndex === index && 'bg-blue-600 text-white'}`}>
                        Question # {index + 1}: {question.question}
                    </h2>
                ))}

            </div>
            <h2 className='my-5 text-md md:text-lg'>
                {mockInterviewQuestion[activeQuestionIndex]?.Question}
            </h2>
            <div className='border rounded-lg p-5 bg-blue-100'>
                <h2 className='flex gap-2 items-center text-blue-900'>
                    <Lightbulb />
                    <strong>NOTE:</strong>
                </h2>
                <h2 className='text-sm text-blue-900 my-2'>{process.env.NEXT_PUBLIC_QUESTION_NOTE}</h2>
                </div>
        </div>
    );
}

export default QuestionSection;
