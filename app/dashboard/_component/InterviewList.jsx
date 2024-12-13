"use client"
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { desc, eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import InterviewItemCard from './InterviewItemCard'

function InterviewList() {

    const { user } = useUser()

    const [interviewList, setInterviewList] = useState([])

    useEffect(() => {
        if (user) {
            GetInterviewList()
        }
    }, [user])

    const GetInterviewList = async () => {
        const result = await db.select()
            .from(MockInterview)
            .where(eq(MockInterview.createdBy, user?.primaryEmailAddress?.emailAddress))
            .orderBy(desc(MockInterview.id))

        console.log("Database query result:", result);

        setInterviewList(result)
    }

    return (
        <div>
            <h2 className='font-bold text-2xl'>Previous Interview Details</h2>
            <div className='grid grid-cols-1 md: gir-cols-2 lg:grid-cols-3 gap-5 my-2'>
                {interviewList && interviewList.map((interview, index) => {  // fixed this line
                    return (  // Added return here
                        <InterviewItemCard key={index} interview={interview} />
                    )
                })}
            </div>
        </div>
    )
}

export default InterviewList
 