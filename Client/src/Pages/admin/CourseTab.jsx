import RichTextEditor from '@/components/RichTextEditor'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { setCourse } from '@/redux/courseSlice'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

const CourseTab = () => {
    const params = useParams()
    const id = params.courseId
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { course } = useSelector(store => store.course)
    console.log("Course from redux:", course);

    const selectCourse = Array.isArray(course)
  ? course.find(course => course._id === id)
  : null;

    const [selectedCourse, setSelectedCourse] = useState(selectCourse)
    const [loading, setLoading] = useState(false)
    const [publish, setPublish] = useState(false)

    // Initialize with empty strings to avoid controlled/uncontrolled input warning
    const [input, setInput] = useState({
        courseTitle: "",
        subTitle: "",
        description: "",
        category: "",
        courseLevel: "",
        coursePrice: "",
        courseThumbnail: null
    })

    const [previewThumbnail, setPreviewThumbnail] = useState("")

    const getCourseById = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/v1/course/${id}`, { withCredentials: true })
            if (res.data.success) {
                setSelectedCourse(res.data.course)
                setInput({
                    courseTitle: res.data.course.courseTitle || "",
                    subTitle: res.data.course.subTitle || "",
                    description: res.data.course.description || "",
                    category: res.data.course.category || "",
                    courseLevel: res.data.course.courseLevel || "",
                    coursePrice: res.data.course.coursePrice || "",
                    courseThumbnail: null
                })
                setPreviewThumbnail(res.data.course.courseThumbnail || "")
                setPublish(res.data.course.isPublished || false)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCourseById()
    }, [id])

    const changeEventHandler = (e) => {
        const { name, value } = e.target
        setInput(prev => ({ ...prev, [name]: value }))
    }

    const selectCategory = (value) => {
        setInput(prev => ({ ...prev, category: value }))
    }

    const selectCourseLevel = (value) => {
        setInput(prev => ({ ...prev, courseLevel: value }))
    }

    const selectThumbnail = (e) => {
        const file = e.target.files?.[0]
        if (file) {
            setInput(prev => ({ ...prev, courseThumbnail: file }))
            const fileReader = new FileReader()
            fileReader.onloadend = () => setPreviewThumbnail(fileReader.result)
            fileReader.readAsDataURL(file)
        }
    }

    // If your RichTextEditor expects value and onChange props:
    // update description in input state on editor change
    const onDescriptionChange = (value) => {
        setInput(prev => ({ ...prev, description: value }))
    }

    const updateCourseHandler = async () => {
        const formData = new FormData()
        formData.append("courseTitle", input.courseTitle)
        formData.append("subTitle", input.subTitle)
        formData.append("description", input.description)
        formData.append("category", input.category)
        formData.append("courseLevel", input.courseLevel)
        formData.append("coursePrice", input.coursePrice)
        if (input.courseThumbnail) {
            formData.append("file", input.courseThumbnail)
        }

        try {
            setLoading(true)
            const res = await axios.put(`http://localhost:5000/api/v1/course/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true
            })

            if (res.data.success) {
                navigate(`lecture`)
                toast.success(res.data.message)
                dispatch(setCourse[res.data.course])
            }
        } catch (error) {
            console.log(error)
            toast.error("Update failed!")
        } finally {
            setLoading(false)
        }
    }

    const togglePublishUnpublish = async (action) => {
        try {
            const res = await axios.patch(
                `http://localhost:5000/api/v1/course/${id}`,
                {},
                {
                    params: { action },
                    withCredentials: true
                }
            )
            if (res.data.success) {
                setPublish(prev => !prev)
                toast.success(res.data.message)
                // Optionally update selectedCourse to keep isPublished in sync
                setSelectedCourse(prev => ({ ...prev, isPublished: !prev.isPublished }))
            }
        } catch (error) {
            console.log(error)
            toast.error("Publish toggle failed!")
        }
    }

    return (
        <Card>
            <CardHeader className="flex md:flex-row justify-between">
                <div>
                    <CardTitle>Basic Course Information</CardTitle>
                    <CardDescription>
                        Make changes to your courses here. Click save when you're done.
                    </CardDescription>
                </div>
                <div className='space-x-2'>
                    <Button onClick={() => togglePublishUnpublish(selectedCourse?.isPublished ? "false" : "true")} className="bg-gray-800 hover:bg-gray-800">
                        {selectedCourse?.isPublished ? "UnPublish" : "Publish"}
                    </Button>
                    <Button variant="destructive">Remove Course</Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className='space-y-4 mt-5'>
                    <div>
                        <Label>Title</Label>
                        <Input value={input.courseTitle} onChange={changeEventHandler} type="text" name="courseTitle" placeholder="Ex. Fullstack developer" />
                    </div>
                    <div>
                        <Label>Subtitle</Label>
                        <Input value={input.subTitle} onChange={changeEventHandler} type="text" name="subTitle" placeholder="Ex. Become a Fullstack developer in 2 months" />
                    </div>
                    <div>
                        <Label>Description</Label>
                        <RichTextEditor value={input.description} onChange={onDescriptionChange} />
                    </div>
                    <div className='flex md:flex-row flex-wrap gap-1 items-center md:gap-5'>
                        <div>
                            <Label>Category</Label>
                            <Select value={input.category} onValueChange={selectCategory}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Category</SelectLabel>
                                        <SelectItem value="Next Js">Next Js</SelectItem>
                                        <SelectItem value="Data Science">Data Science</SelectItem>
                                        <SelectItem value="Frontend Development">Frontend Development</SelectItem>
                                        <SelectItem value="Backend Development">Backend Development</SelectItem>
                                        <SelectItem value="MernStack Development">MernStack Development</SelectItem>
                                        <SelectItem value="Javascript">Javascript</SelectItem>
                                        <SelectItem value="Python">Python</SelectItem>
                                        <SelectItem value="Docker">Docker</SelectItem>
                                        <SelectItem value="MongoDB">MongoDB</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label>Course Level</Label>
                            <Select value={input.courseLevel} onValueChange={selectCourseLevel}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select a course level" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Course Level</SelectLabel>
                                        <SelectItem value="Beginner">Beginner</SelectItem>
                                        <SelectItem value="Medium">Medium</SelectItem>
                                        <SelectItem value="Advance">Advance</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label>Price in (INR)</Label>
                            <Input
                                type="number"
                                name="coursePrice"
                                value={input.coursePrice}
                                onChange={changeEventHandler}
                                placeholder="199"
                                className="w-fit"
                            />
                        </div>
                    </div>
                    <div>
                        <Label>Course Thumbnail</Label>
                        <Input
                            type="file"
                            id="file"
                            onChange={selectThumbnail}
                            accept="image/*"
                            className="w-fit"
                        />
                        {
                            previewThumbnail && (
                                <img src={previewThumbnail} alt="Thumbnail" className='w-64 my-2' />
                            )
                        }
                    </div>
                    <div className='flex gap-2'>
                        <Button onClick={() => navigate('/admin/course')} variant="outline">Cancel</Button>
                        <Button className="bg-gray-800 hover:bg-gray-800" disabled={loading} onClick={updateCourseHandler}>
                            {
                                loading ? (
                                    <>
                                        <Loader2 className='mr-2 w-4 h-4 animate-spin' />
                                        Please wait
                                    </>
                                ) : ("Save")
                            }
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default CourseTab
