import React from 'react'
import { Card } from './card'
import { Button } from "@/components/ui/button";
const CourseCard = ({course}) => {
  return (
    <Card classname=" bg-white shadow-lg">
        <img src={course.image} alt="" className='w-full h-48 object-cover'/>
        <div classname='p-6'>
            <h2 classname='text-xl font-semibold text-gray-800 mb-3'>{course.title}</h2>
            <p className='text-gray-600 mb-4'></p>
        <Button>Learn More</Button>
        </div>
    </Card>
  )
}

export default CourseCard