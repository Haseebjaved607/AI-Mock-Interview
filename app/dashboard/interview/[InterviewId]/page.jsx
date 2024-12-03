"use client";
import { Button } from '@/components/ui/button';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { Lightbulb, Radius, WebcamIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import { useParams } from 'next/navigation'; // This hook should work directly in client-side components
import Link from 'next/link';

function Interview() {
    const params = useParams(); // This hook will give you the params directly

    const [interviewData, setInterviewData] = useState();
    const [webCamEnabled, setWebCamEnabled] = useState(false);

    useEffect(() => {
        // console.log("Params in Interview Component:", params);

        if (params?.InterviewId) {
            GetInterviewDetails(params.InterviewId); // Ensure the InterviewId is available
        } else {
            console.error("InterviewId is undefined in params.");
        }
    }, [params]); // Depend on params to refetch if it changes

    const GetInterviewDetails = async (interviewId) => {
        try {

            const result = await db
                .select()
                .from(MockInterview)
                .where(eq(MockInterview.mockId, interviewId));

            // console.log("Fetched Interview Data:", result);

            if (result.length > 0) {
                setInterviewData(result[0]);
            } else {
                console.warn("No interview data found for the provided ID.");
                setInterviewData(null); // No data found
            }
        } catch (error) {
            console.error("Error fetching interview details:", error);
        }
    };

    const handleDisableWebcam = () => {
        setWebCamEnabled(false); // Turn off the webcam
    };

    return (
        <div className=" ">
            <h2 className="font-bold text-2xl flex justify-center items-center my-4">Let's Get Started</h2>
            <div className='flex gap-20 '>

                <div className='flex flex-col my-5 gap-5   '>

                    <div className='flex flex-col gap-5 p-5 rounded-lg border'>
                        {interviewData ? (
                            <>
                                <h2>
                                    <strong>Job Role/Job Position:</strong>{" "}
                                    {interviewData.jobPosition}
                                </h2>
                                <h2>
                                    <strong>Job Description/Tech Stack:</strong>{" "}
                                    {interviewData.jobDesc}
                                </h2>
                                <h2>
                                    <strong>Year of Experience:</strong>{" "}
                                    {interviewData.jobExperience}
                                </h2>
                            </>
                        ) : interviewData === null ? (
                            <h2>No Interview Data Found</h2>
                        ) : (
                            <h2>Loading Job Details...</h2>
                        )}
                    </div>

                    <div className='border bg-yellow-100 rounded-lg  border-yellow-200 p-5 '>
                        <h2 className='flex gap-2 items-center text-yellow-500'>
                            <Lightbulb /><strong>Information</strong>
                        </h2>

                        <h2 className=" mt-3 text-yellow-700">
                            {process.env.NEXT_PUBLIC_INFORMATION}
                        </h2>
                    </div>

                </div>

                <div >
                    {webCamEnabled ? (
                        <div className="flex flex-col items-center mt-5">
                            <Webcam
                                mirrored={true}
                                style={{
                                    width: '60rem', // Matches `w-80` (80 x 4 = 320px)
                                    height: 'rem', // Matches `h-64` (64 x 4 = 256px)
                                    borderRadius: '14px',
                                }}
                            />
                            <Button className="mt-10 w-full"
                                onClick={handleDisableWebcam} >
                                Turn Off Camera
                            </Button>
                        </div>
                    ) : (
                        <>
                            <WebcamIcon className="h-64 w-80 my-6 p-20 bg-secondary rounded-lg border" />
                            <Button variant='ghost' className="w-full"
                                onClick={() => setWebCamEnabled(true)}>
                                Enable Webcam and Microphone
                            </Button>
                        </>
                    )}

                </div>

            </div>
            <div className='flex justify-end items-end '>
                <Link href={'/dashboard/interview/' + params.InterviewId + '/start'}>
                    <Button>Start Interview</Button>
                </Link>
            </div>
        </div>
    );
}

export default Interview;
