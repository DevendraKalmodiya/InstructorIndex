import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setCourse } from '@/redux/courseSlice'
import { Badge } from '@/components/ui/badge'
import { Edit, Plus, AlertCircle } from 'lucide-react'

const Course = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { course } = useSelector(store => store.course)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    // Ensure course is always an array
    const courses = Array.isArray(course) ? course : []

    useEffect(() => {
        const getCreatorCourse = async () => {
            try {
                setLoading(true)
                setError(null)
                
                const res = await axios.get('http://localhost:5000/api/v1/course/', { 
                    withCredentials: true 
                })
                
                console.log('API Response:', res.data) // Debug log
                
                if (res.data.success) {
                    // Ensure we're dispatching an array
                    const coursesData = res.data.courses || []
                    console.log('Courses data:', coursesData) // Debug log
                    dispatch(setCourse(coursesData))
                } else {
                    setError('Failed to fetch courses: ' + (res.data.message || 'Unknown error'))
                }
            } catch (error) {
                console.error('Error fetching courses:', error)
                const errorMessage = error.response?.data?.message || error.message || 'Failed to load courses. Please try again.'
                setError(errorMessage)
            } finally {
                setLoading(false)
            }
        }

        getCreatorCourse()
    }, [dispatch])

    const handleEditCourse = (courseId) => {
        navigate(`/admin/course/${courseId}`)
    }

    const handleCreateCourse = () => {
        navigate('create')
    }

    const formatPrice = (price) => {
        if (!price || price === 0) return 'Free'
        return `$${price}`
    }

    if (loading) {
        return (
            <div className='md:p-10 p-4 w-full h-screen flex items-center justify-center'>
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
                    <p>Loading courses...</p>
                </div>
            </div>
        )
    }

    return (
        <div className='md:p-10 p-4 w-full min-h-screen'>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">My Courses</h1>
                <Button 
                    className="bg-blue-500 hover:bg-blue-600" 
                    onClick={handleCreateCourse}
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Create Course
                </Button>
            </div>

            {error && (
                <div className="mb-6 p-4 border border-red-200 bg-red-50 rounded-md flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-red-600 flex-shrink-0" />
                    <p className="text-red-800 text-sm">{error}</p>
                </div>
            )}

            <Table className="mt-6">
                <TableCaption>
                    {courses?.length > 0 
                        ? `A list of your ${courses.length} course${courses.length !== 1 ? 's' : ''}.`
                        : "You haven't created any courses yet."
                    }
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[300px]">Course</TableHead>
                        <TableHead className='text-right'>Price</TableHead>
                        <TableHead className='text-center'>Status</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {courses?.length > 0 ? (
                        courses.map((courseItem) => (
                            <TableRow key={courseItem._id} className="hover:bg-gray-50">
                                <TableCell className="flex items-center gap-3 py-4">
                                    <img 
                                        src={courseItem?.courseThumbnail || '/placeholder-course.jpg'} 
                                        alt={`${courseItem.courseTitle} thumbnail`}
                                        className='w-16 h-12 hidden md:block rounded-md object-cover border'
                                        onError={(e) => {
                                            e.target.src = '/placeholder-course.jpg'
                                        }}
                                    />
                                    <div>
                                        <p className="font-medium">{courseItem.courseTitle}</p>
                                        {courseItem.courseDescription && (
                                            <p className="text-sm text-gray-500 truncate max-w-[200px]">
                                                {courseItem.courseDescription}
                                            </p>
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell className="font-medium text-right">
                                    {formatPrice(courseItem.coursePrice)}
                                </TableCell>
                                <TableCell className="text-center">
                                    <Badge 
                                        variant={courseItem.isPublished ? "default" : "secondary"}
                                        className={
                                            courseItem.isPublished 
                                                ? "bg-green-100 text-green-800 hover:bg-green-200" 
                                                : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                                        }
                                    >
                                        {courseItem.isPublished ? "Published" : "Draft"}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button 
                                        variant='ghost' 
                                        size="sm"
                                        onClick={() => handleEditCourse(courseItem._id)}
                                        className="hover:bg-gray-100"
                                    >
                                        <Edit className="w-4 h-4" />
                                        <span className="sr-only">Edit {courseItem.courseTitle}</span>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center py-8">
                                <div className="flex flex-col items-center gap-2">
                                    <p className="text-gray-500">No courses found</p>
                                    <Button 
                                        variant="outline" 
                                        onClick={handleCreateCourse}
                                        size="sm"
                                    >
                                        <Plus className="w-4 h-4 mr-2" />
                                        Create your first course
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default Course