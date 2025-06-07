import Hero from '@/components/Hero'
import React from 'react'
import { coursesJson } from './Courses'
import CourseCard from '@/components/CourseCard'
import { useSelector } from 'react-redux'

const Home = () => {
  const { course } = useSelector((store) => store.course)
  console.log("Home.jsx - course from redux:", course);
  
// Handle all possible data structures
  let coursesToDisplay = [];
  
  if (course && Array.isArray(course)) {
    coursesToDisplay = course;
  } else if (course && typeof course === 'object') {
    coursesToDisplay = [course];
  } else {
    coursesToDisplay = coursesJson || [];
  }

  return (
    <div>
      <Hero />
      <div className='py-10'>
        <h1 className='text-4xl font-bold text-center text-gray-800 mb-4'>Our Courses</h1>
        <p className='text-center text-gray-600 mb-12'>Explore our curated courses to boost your skills and career. Whether you're a beginner or an expert, we have something for everyone.</p>
        <div className='max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {
            coursesToDisplay?.slice(0, 6).map((courseItem, index) => {
              return <CourseCard key={courseItem._id || courseItem.id || index} course={courseItem} />
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Home