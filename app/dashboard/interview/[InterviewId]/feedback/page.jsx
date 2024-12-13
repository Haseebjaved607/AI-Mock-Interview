"use client";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

function Feedback({ params }) {
  const router = useRouter();
  const [feedbackList, setFeedbackList] = useState([]);
  const [overallRating, setOverallRating] = useState(0); // State for overall rating
  const interviewId = React.use(params).InterviewId;

  useEffect(() => {
    if (interviewId) {
      GetFeedback(interviewId);
    }
  }, [interviewId]);

  const GetFeedback = async (id) => {
    try {
      const result = await db
        .select()
        .from(UserAnswer)
        .where(eq(UserAnswer.mockIdRef, id))
        .orderBy(UserAnswer.id);

      console.log(result);

      setFeedbackList(result);

      // Calculate overall rating only if ratings are valid numbers
      const validRatings = result
        .map((item) => parseFloat(item.rating)) // Convert ratings to numbers
        .filter((rating) => !isNaN(rating)); // Filter out invalid ratings

      const totalRating = validRatings.reduce((sum, rating) => sum + rating, 0);
      const averageRating = validRatings.length ? totalRating / validRatings.length : 0;

      setOverallRating(parseFloat(averageRating.toFixed(1))); // Round to 1 decimal
    } catch (error) {
      console.error("Error fetching feedback:", error);
    }
  };

  return (
    <div className="p-10">


      {feedbackList?.length == 0 ?
        <h2 className="font-bold text-gray-500">No Interview Feedback Record found</h2>
        :
        <>
          <h2 className="text-4xl font-bold text-green-500">Congratulation!</h2>
          <h2 className="font-bold text-2xl my-2">Here is your Interview Feedback</h2>
          <h2 className="text-primary text-lg text-blue-800 my-3">
            Your overall rating: <strong>{overallRating}/10</strong>
          </h2>
          <h2 className="text-sm text-gray-500">
            Find below the interview questions with correct answers. Your answer
            and feedback for improvement.
          </h2>
          {feedbackList.map((item, index) => (
            <Collapsible key={index} className="mt-7">
              <CollapsibleTrigger className="p-6 flex justify-between-between bg-secondary rounded-lg my-2 text-left gap-7 w-full">
                {item.question} <ChevronsUpDown className="h-5 w-5" />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="flex flex-col gap-2">
                  <h2 className="text-red-500 p-2 border rounded-lg">
                    <strong>Rating:</strong>
                    {item.rating}
                  </h2>
                  <h2 className="bg-red-50 text-red-900 text-sm p-2 border rounded-lg">
                    <strong> Your Answer: </strong>
                    {item.userAns}
                  </h2>
                  <h2 className="bg-green-50 text-green-900 text-sm p-2 border rounded-lg">
                    <strong> Correct Answer: </strong>
                    {item.correctAns}
                  </h2>
                  <h2 className="bg-blue-50 text-blue-900 text-sm p-2 border rounded-lg">
                    <strong> Feedback: </strong>
                    {item.feedback}
                  </h2>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </>
      }
      <Button onClick={() => router.replace("/dashboard")} className="my-2">
        Go Home
      </Button>
    </div>
  );
}

export default Feedback;
