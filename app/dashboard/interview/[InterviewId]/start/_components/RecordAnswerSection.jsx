import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React, { useState } from 'react';
import Webcam from 'react-webcam';

function RecordAnswerSection() {
  const [isWebcamEnabled, setIsWebcamEnabled] = useState(false); // State to enable/disable webcam

  const toggleWebcam = () => {
    setIsWebcamEnabled(!isWebcamEnabled);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div
        className="relative flex flex-col mt-20 justify-center items-center p-5 bg-black border border-gray-300 rounded-lg overflow-hidden"
        style={{ width: 450, height: 280 }} // Updated height and width
      >
        <div className="absolute inset-0 bg-black z-0"></div> {/* Black background */}
        {isWebcamEnabled ? (
          <Webcam
            mirrored={true}
            className="absolute z-10 rounded-lg"
            style={{ width: "100%", height: "100%" }}
          />
        ) : (
          <Image
            src="/webcamImg.png"
            alt="Webcam Placeholder"
            width={100} // Adjusted image size for better fit
            height={100}
            className="z-20"
          />
        )}
      </div>
      <div className="flex gap-4 my-10">
        <Button variant="outline" onClick={toggleWebcam}>
          {isWebcamEnabled ? 'Disable Webcam' : 'Enable Webcam'}
        </Button>
        <Button variant="outline">Record Answer</Button>
      </div>
    </div>
  );
}

export default RecordAnswerSection;
