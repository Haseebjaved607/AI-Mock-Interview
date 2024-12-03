'use client';

import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { use, useEffect, useState } from 'react';
import QuestionSection from './_components/QuestionSection';
import RecordAnswerSection from './_components/RecordAnswerSection';

function StartInterview({ params: paramsPromise }) {
    const params = use(paramsPromise); // Unwrap the params Promise

    const [interviewData, setInterviewData] = useState();
    const [mockInterviewQuestion, setMockInterviewQuestion] = useState();
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0)

    useEffect(() => {
        if (params?.InterviewId) {
            GetInterviewDetails(params.InterviewId); // Use unwrapped InterviewId
        }
    }, [params]);

    const GetInterviewDetails = async (interviewId) => {
        try {
            const result = await db
                .select()
                .from(MockInterview)
                .where(eq(MockInterview.mockId, interviewId));

            if (result.length > 0) {
                const jsonMockResp = JSON.parse(result[0]?.jsonMockResp || "{}"); // Safely parse JSON
                console.log(jsonMockResp);
                setMockInterviewQuestion(jsonMockResp);
                setInterviewData(result[0]);
            }
        } catch (error) {
            console.error("Error fetching interview details:", error);
        }
    };

    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
                {/* QuestionSection */}
                <QuestionSection mockInterviewQuestion=
                    {mockInterviewQuestion}
                    activeQuestionIndex={activeQuestionIndex}
                />

                {/* video/audio recording */}
                <RecordAnswerSection />

            </div>
        </div>
    )
}

export default StartInterview;
