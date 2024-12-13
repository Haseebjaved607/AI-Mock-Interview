import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import React from 'react'

function InterviewItemCard({ interview }) {
  // console.log(interview);

  const router = useRouter()
  const onStart = () => {
    router.push('/dashboard/interview/' + interview?.mockId)
  }
  const onFeedbackPush = () => {
    router.push('/dashboard/interview/' + interview?.mockId + '/feedback')
  }


  return (
    <div className=' border rounded-lg shadow-sm p-3'>
      <h2 className=' font-bold text-blue-700 text-xl '>{interview?.jobPosition}</h2>
      <h2 className='text-md text-gray-500'>{interview?.jobDesc}</h2>
      <h2 className='font-bold  text-primary'>{interview?.jobExperience}</h2>
      <div className='flex justify-between mt-2 gap-5'>

        <Button size="sm" variant="outline" className="w-full"
          onClick={onFeedbackPush}>Feedback</Button>

        <Button size="sm" className="w-full"
          onClick={onStart}>
          Start</Button>
      </div>
    </div>
  )
}

export default InterviewItemCard