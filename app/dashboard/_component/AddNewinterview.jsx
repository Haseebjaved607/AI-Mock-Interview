"use client";
import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"
import { chatSession } from "@/utils/GeminiAiModal";
import { LoaderCircle } from "lucide-react";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { v4 as uuidv4 } from 'uuid';
import { useUser } from "@clerk/nextjs";
import moment from "moment/moment";
import { useRouter } from "next/navigation";



function AddNewInterview() {
    const [openDialogue, setOpenDialogue] = useState(false);
    const [jobPosition, setJobPosition] = useState();
    const [jobDesc, setJobDesc] = useState();
    const [jobExperience, setJobExperience] = useState();
    const [loading, setLoading] = useState(false);
    const [jsonResponce, setJsonResponce] = useState([]);
    const { user } = useUser();
    const router = useRouter()

    const onSubmit = async (event) => {
        setLoading(true);
        event.preventDefault();
        console.log(jobPosition, jobDesc, jobExperience);

        const InputPrompt = `Job Position: ${jobPosition}, Job Description: ${jobDesc}, Years of Experience: ${jobExperience}, 6, Depends on this information please give me ${process.env.NEXT_PUBLIC_INNTERVIEW_QUESTION_COUNT} Interview question with Answered in JSON Format. Give Question and Answer as fields in JSON.`;

        try {
            const result = await chatSession.sendMessage(InputPrompt);
            const MockJsonRespText = await result.response.text(); // Await text response
            let MockJsonResp;

            try {
                MockJsonResp = MockJsonRespText.replace(/```json|```/g, ''); // Remove Markdown fences
                const parsedJson = JSON.parse(MockJsonResp); // Parse JSON
                console.log(parsedJson);
                setJsonResponce(parsedJson);
            } catch (error) {
                console.error("Failed to parse JSON:", error);
                setLoading(false);
                return;
            }

            const resp = await db.insert(MockInterview)
                .values({
                    mockId: uuidv4(),
                    jsonMockResp: MockJsonResp,
                    jobPosition,
                    jobDesc,
                    jobExperience,
                    createdBy: user?.primaryEmailAddress?.emailAddress,
                    createdAt: moment().format("DD-MM-yyyy"),
                })
                .returning({ mockId: MockInterview.mockId });

            if (resp) {
                setOpenDialogue(false);
                router.push(`/dashboard/interview/${resp[0]?.mockId}`);
            }

            console.log("Inserted Id", resp);
        } catch (error) {
            console.error("Error in AI response or DB insertion:", error);
        }

        setLoading(false);
    };

    return (
        <div>
            <div
                className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
                onClick={() => setOpenDialogue(true)}
            >
                <h2 className="text-lg text-center">+ Add New</h2>
            </div>
            <Dialog open={openDialogue}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl">Tell us more about job  interviewing</DialogTitle>
                        {/* Render DialogDescription as a div */}
                        <DialogDescription asChild>
                            <form onSubmit={onSubmit}>
                                <div>
                                    <div >
                                        <h2 >
                                            Add details about your job position/role , Job discription and year of experience
                                        </h2>

                                        <div className='mt-3 my-2 '>
                                            <label className="text-black">Job Role/Job Position</label>
                                            <Input className="mt-1" placeholder="Ex. React , Next.js Developer" required
                                                onChange={(event) => setJobPosition(event.target.value)}
                                            />
                                        </div>
                                        <div className='mt-2 my-2'>
                                            <label className="text-black">Job Descripiton/Tech Stack</label>
                                            <Textarea className="mt-1" placeholder="React, Angular, Next.js" required
                                                onChange={(event) => setJobDesc(event.target.value)}
                                            />
                                        </div>
                                        <div className='mt-3 my-2 '>
                                            <label className="text-black">Year of experience</label>
                                            <Input className="mt-1" placeholder="5" type="number" max="30" required
                                                onChange={(event) => setJobExperience(event.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex gap-5 justify-end">
                                        <Button type="button" variant="ghost" onClick={() => setOpenDialogue(false)}>
                                            Cancel
                                        </Button>
                                        <Button type="submit" disabled={loading}>
                                            {loading ?
                                                <>
                                                    <LoaderCircle className="animate-spin" />'Generating from AI'
                                                </> : 'Start Interviewing'

                                            }
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default AddNewInterview;
