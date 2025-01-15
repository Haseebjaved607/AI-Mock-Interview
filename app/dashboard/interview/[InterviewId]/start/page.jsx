"use client";

import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { use, useEffect, useState } from 'react';
import QuestionSection from './_components/QuestionSection';
import RecordAnswerSection from './_components/RecordAnswerSection';
import { Button } from '@/components/ui/button';
import Link from 'next/link';


function StartInterview({ params: paramsPromise }) {
    const params = use(paramsPromise);

    const [interviewData, setInterviewData] = useState(null);
    const [mockInterviewQuestion, setMockInterviewQuestion] = useState([]);
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

    useEffect(() => {
        if (params?.InterviewId) {
            GetInterviewDetails(params.InterviewId);
        }
    }, [params]);

    const GetInterviewDetails = async (interviewId) => {
        try {
            const result = await db
                .select()
                .from(MockInterview)
                .where(eq(MockInterview.mockId, interviewId));

            if (result.length > 0) {
                const jsonMockResp = JSON.parse(result[0]?.jsonMockResp || "{}");
                // console.log(jsonMockResp);
                setMockInterviewQuestion(jsonMockResp);
                setInterviewData(result[0]); // Set interview data here
            }
        } catch (error) {
            console.error("Error fetching interview details:", error);
        }
    };



    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
                <QuestionSection
                    mockInterviewQuestion={mockInterviewQuestion}
                    activeQuestionIndex={activeQuestionIndex}
                    setActiveQuestionIndex={setActiveQuestionIndex} // Pass this function
                />

                <RecordAnswerSection
                    mockInterviewQuestion={mockInterviewQuestion}
                    activeQuestionIndex={activeQuestionIndex}
                    interviewData={interviewData} // Pass interview data here
                />
            </div>
            <div className='flex flex-row justify-end gap-2 -my-5'>
                {activeQuestionIndex > 0 && <Button className='gap-2'
                    onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}>Previous Question
                </Button>}
                {activeQuestionIndex !== mockInterviewQuestion?.length + 1 && <Button
                    onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}>Next Question
                </Button>}
                {activeQuestionIndex == mockInterviewQuestion?.length - 1 && <Link href={"/dashboard/interview/" + interviewData?.mockId + "/feedback"}>
                    <Button>End Interview</Button>
                </Link>}
            </div>
        </div>
    )
}

export default StartInterview;
