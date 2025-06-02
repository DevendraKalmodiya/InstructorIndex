import React from 'react'
import Hero from '@/components/ui/Hero'
// import Courses, { courses } from './Courses'
import { coursesJson } from "./Courses";
import CourseCard from "@/components/ui/CourseCard";
import {Button} from "@/components/ui/button";


const Home = () => {
    return (
        <div>
            <Hero />
            <div className='py-10'>
                <h1 className='text-4xl font-bold text-centre text-gray-800 mb-4'>Our Courses</h1>
                <p className='text-ccentre text-gray-600 mb-12'>Explore our curated coourses to boost your skills and carrer.
                    Whether you're a beginner or an expert, we have something for everyone.</p>
                <div className='max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {
                        coursesJson.slice(0, 6).map((course) => {
                            return <CourseCard course={course} />
                        })
                    }

                </div>
            </div>
        </div>
    )
}

export default Home