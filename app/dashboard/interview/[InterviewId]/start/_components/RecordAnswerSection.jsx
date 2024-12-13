import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { Mic, StopCircleIcon } from 'lucide-react';
import { toast } from 'sonner';
import { chatSession } from '@/utils/GeminiAiModal';
import { db } from '@/utils/db';
import { UserAnswer } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import Link from 'next/link';

const Webcam = dynamic(() => import('react-webcam'), { ssr: false });
let useSpeechToText;

if (typeof window !== 'undefined') {
  useSpeechToText = require('react-hook-speech-to-text').default;
}

function RecordAnswerSection({ mockInterviewQuestion, activeQuestionIndex, interviewData }) {

  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [isWebcamEnabled, setIsWebcamEnabled] = useState(false);

  const {
    error,
    interimResult,
    isRecording,
    results,
    setResults,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText
      ? useSpeechToText({
        continuous: true,
        useLegacyResults: false,
      })
      : {
        error: '',
        interimResult: '',
        isRecording: false,
        results: [],
        setResults: [],
        startSpeechToText: () => console.warn('Speech-to-text not available'),
        stopSpeechToText: () => console.warn('Speech-to-text not available'),
      };

  useEffect(() => {
    if (results && results.length > 0) {
      const latestResult = results[results.length - 1];
      if (latestResult && latestResult.transcript) {
        setUserAnswer(latestResult.transcript);
      }
    }
  }, [results]);

  // Log userAnswer before saving it to the database
  // console.log('User Answer:', userAnswer);


  const toggleWebcam = () => {
    setIsWebcamEnabled(!isWebcamEnabled);
  };

  const saveUserAnswer = async () => {
    // console.log("mockId from interviewData:", interviewData?.mockId); // Added console log for mockId

    if (!interviewData?.mockId) {
      toast('Error: Missing mockId. Please check the interview data.');
      return;
    }

    if (isRecording) {
      setLoading(true);
      stopSpeechToText();
      if (userAnswer?.length < 4) {
        setLoading(false);
        toast('Error while saving your answer, please record again.');
        return;
      }

      const feedbackPrompt = `Question: ${mockInterviewQuestion[activeQuestionIndex]?.Question}, 
        User Answer: ${userAnswer}, 
        Depends upon user answer and question for given interview question 
        please give us rating for answer and feedback in JSON format.`;

      const result = await chatSession.sendMessage(feedbackPrompt);
      let mockJsonResp = (await result.response.text())
        .replace('```json', '') // Remove the ```json part
        .replace('```', '') // Remove closing ``` if present
        .replace('\n', '') // Remove newlines
        .trim(); // Remove unnecessary spaces or characters

      // console.log("Cleaned Response:", mockJsonResp);
      try {
        const JsonFeedbackResp = JSON.parse(mockJsonResp);

        const resp = await db.insert(UserAnswer).values({
          mockIdRef: interviewData.mockId,
          question: mockInterviewQuestion[activeQuestionIndex]?.Question,
          correctAns: mockInterviewQuestion[activeQuestionIndex]?.Answer,
          userAns: userAnswer,
          feedback: JsonFeedbackResp?.feedback,
          rating: JsonFeedbackResp?.rating,
          userEmail: user?.primaryEmailAddress.emailAddress,
          createdAt: moment().format('DD-MM-yyyy'),
        });

        if (resp) {
          toast('User answer recorded successfully');
          setResults([])
        }
      } catch (err) {
        console.error('Error parsing JSON response:', err);
        toast('Error while saving the answer. Please try again.');
      }

      setUserAnswer('');
      setLoading(false);
      setResults([])

    } else {
      startSpeechToText();
    }
  };

  // useEffect(() => {
  //   // console.log("Full Interview Data:", interviewData); // Added console log to check full interview data
  // }, [interviewData]);

  return (
    <div className="flex flex-col justify-center items-center -mt-3">
      <div
        className="relative flex flex-col mt-20 justify-center items-center p-5 bg-black border border-gray-300 rounded-lg overflow-hidden"
        style={{ width: 450, height: 280 }}
      >
        <div className="absolute inset-0 bg-black z-0"></div>
        {isWebcamEnabled ? (
          <Webcam
            mirrored={true}
            className="absolute z-10 rounded-lg"
            style={{ width: '100%', height: '100%' }}
          />
        ) : (
          <Image
            src="/webcamImg.png"
            alt="Webcam Placeholder"
            width={100}
            height={100}
            className="z-20"
          />
        )}
      </div>
      <div className="flex gap-4 my-5">
        <Button variant="outline" onClick={toggleWebcam}>
          {isWebcamEnabled ? 'Turn OFF Webcam' : 'Turn ON Webcam'}
        </Button>
        <Button disabled={loading} variant="outline" onClick={saveUserAnswer}>
          {isRecording ? (
            <div className="flex items-center gap-2 text-red-600">
              <StopCircleIcon /> Stop Recording
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Mic /> Record Answer
            </div>
          )}
        </Button>
      </div>

      {/* <Button
        onClick={() => {
          console.log(userAnswer);
        }}
      >
        Show User Answer
      </Button> */}
      
      {error && <p className="text-red-600">Error: {error.message}</p>}
      {interimResult && <p className="text-gray-600">Interim: {interimResult}</p>}
    </div>
  );
}

export default RecordAnswerSection;
