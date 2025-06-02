import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
// import { setCourse } from "@/redux/courseSlice";
// import axios from "axios";
import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CourseCard from "@/components/ui/CourseCard";
// bas itna hi rakho

export const coursesJson = [
    {
        id: 1,
        title: "Web Development Bootcamp",
        description: "Master HTML, CSS, JavaScript, and React to become a professional web developer.",
        image: "https://fsa2-assets.imgix.net/assets/badges/Course-Report-Best-Coding-Bootcamps-Badge-2025.png?auto=compress%2Cformat&crop=focalpoint&domain=fsa2-assets.imgix.net&fit=crop&fp-x=0.5&fp-y=0.5&h=614&ixlib=php-3.3.1&w=992./assets/Web_Devlopment_image.png",
    },
    {
        id: 2,
        title: "UI/UX Design Essentials",
        description: "Learn the art of designing intuitive and beautiful user interfaces and experiences.",
        image: "https://s3-alpha.figma.com/hub/file/2942566861/7e3aaade-4be8-47a8-aa6c-fe6f0c220316-cover.png",
    },
    {
        id: 3,
        title: "Data Science with Python",
        description: "Dive into data analysis, machine learning, and visualization using Python.",
        image: "https://thafd.bing.com/th/id/OIP.50Oa2rj6MA7MO8gp-koLJwHaEw?rs=1&pid=ImgDetMain",
    },
    {
        id: 4,
        title: "Digital Marketing Mastery",
        description: "Master SEO, social media, email marketing, and advertising strategies.",
        image: "https://thafd.bing.com/th/id/OIP.7j9tmtRADeNanW9v9IFo1wAAAA?rs=1&pid=ImgDetMain",
    },
    {
        id: 5,
        title: "Cloud Computing Basics",
        description: "Get started with AWS, Azure, and Google Cloud to understand the fundamentals of cloud computing.",
        image: "https://static.wixstatic.com/media/8edb05_0a52ce3110044a7a84a6d2f86e1577be~mv2.png/v1/fill/w_1280,h_720,al_c/8edb05_0a52ce3110044a7a84a6d2f86e1577be~mv2.png",
    },
    {
        id: 6,
        title: "Full-Stack Development",
        description: "Become proficient in building complete applications with MERN stack.",
        image: "https://thafd.bing.com/th/id/OIP.QLGhGO129YhxBCkOQ3vJAAHaE7?rs=1&pid=ImgDetMain",
    },
];

const Courses = () => {
    return (
        <div className="bg-gray-100 pt-14">
            <div className="min-h-screen max-w-7xl mx-auto py-10">
                <div className="px-4">
                    <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
                        Our Courses
                    </h1>
                    <p className="text-center text-gray-600 mb-12">
                        Explore our curated courses to boost your skills and career. Whether you're a beginner or an expert, we have something for everyone.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {
                            coursesJson.map((course) => (
                                <CourseCard key={course.id} course={course} />
                            ))
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Courses;