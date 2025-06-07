import CourseCard from '@/components/CourseCard'
import { setCourse } from '@/redux/courseSlice'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export const coursesJson = [
    {
        _id: "mock-1", // Changed from id to _id
        courseTitle: "Web Development Bootcamp", // Changed from title
        subTitle: "Master HTML, CSS, JavaScript, and React to become a professional web developer.", // Changed from description
        courseThumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&h=300&fit=crop&crop=entropy&auto=compress&cs=tinysrgb", // Changed from image
    },
    {
        _id: "mock-2",
        courseTitle: "UI/UX Design Essentials",
        subTitle: "Learn the art of designing intuitive and beautiful user interfaces and experiences.",
        courseThumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=300&fit=crop&crop=entropy&auto=compress&cs=tinysrgb",
    },
    {
        _id: "mock-3",
        courseTitle: "Data Science with Python",
        subTitle: "Dive into data analysis, machine learning, and visualization using Python.",
        courseThumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop&crop=entropy&auto=compress&cs=tinysrgb",
    },
    {
        _id: "mock-4",
        courseTitle: "Digital Marketing Mastery",
        subTitle: "Master SEO, social media, email marketing, and advertising strategies.",
        courseThumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop&crop=entropy&auto=compress&cs=tinysrgb",
    },
    {
        _id: "mock-5",
        courseTitle: "Cloud Computing Basics",
        subTitle: "Get started with AWS, Azure, and Google Cloud to understand the fundamentals of cloud computing.",
        courseThumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&h=300&fit=crop&crop=entropy&auto=compress&cs=tinysrgb",
    },
    {
        _id: "mock-6",
        courseTitle: "Full-Stack Development",
        subTitle: "Become proficient in building complete applications with MERN stack.",
        courseThumbnail: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=500&h=300&fit=crop&crop=entropy&auto=compress&cs=tinysrgb",
    },
]

const Courses = () => {
  const dispatch = useDispatch()
  const { course } = useSelector(store => store.course)

  useEffect(() => {
    const getAllPublishedCourse = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/v1/course/published-courses`, { withCredentials: true })
        if (res.data.success) {
          dispatch(setCourse(res.data.courses))
        }
      } catch (error) {
        console.log(error);
      }
    }
    getAllPublishedCourse()
  }, [])

  return (
    <div className='bg-gray-100 pt-14'>
      <div className='min-h-screen max-w-7xl mx-auto py-10'>
        <div className='px-4'>
          <h1 className='text-4xl font-bold text-center text-gray-800 mb-4'>Our Courses</h1>
          <p className='text-center text-gray-600 mb-12'>Explore our curated courses to boost your skills and career. Whether you're a beginner or an expert, we have something for everyone.</p>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {course?.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12'>
            {coursesJson.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}

export default Courses
