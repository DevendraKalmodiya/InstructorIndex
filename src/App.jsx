import React from 'react'
import Navbar from './components/ui/Navbar'
import Footer from './components/ui/Footer'
import Courses from './Pages/Courses'
import './index.css'
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home'
import Login from './Pages/auth/Login';
import Signup from './pages/auth/Signup';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import { Toaster } from "sonner"
// import Dashboard from './components/Dashboard';
// import CreateCourse from './components/CreateCourse';
// import UpdateCourse from './components/UpdateCourse';
// import CreateLecture from './components/CreateLecture';
// import EditLecture from './components/EditLecture';
// import CourseDetails from './components/CourseDetails';


const router = createBrowserRouter([
  {
    path: "/admin",
    element: <><Navbar /><Admin /></>,
    // children: [
    //   {
    //     path: "dashboard",
    //     element: <Dashboard />
    //   },
    //   { 
    //     path: "course",
    //     element: <Courses />
    //   },
    //   {
    //     path: "course/create",
    //     element: <CreateCourse />
    //   },
    //   {
    //     path: "course/:courseId",
    //     element: <UpdateCourse />
    //   },
    //   {
    //     path: "course/:courseId/lecture",
    //     element: <CreateLecture />
    //   },
    //   {
    //     path: "course/:courseId/lecture/:lectureId",
    //     element: <EditLecture />
    //   },
    // ]
  },
  {
    path: "/",
    element: <><Navbar /><Home /></>
  },
  {
    path: "/signup",
    element: <><Navbar /><Signup /></>
  },
  {
    path: "/login",
    element: <><Navbar /><Login /></>
  },
  {
    path: "/courses",
    element: <><Navbar /><Courses /></>
  },
  // {
  //   path: "/courses/:courseId",
  //   element: <><Navbar /><CourseDetails /></>
  // },
  {
    path: "/profile",
    element: <><Navbar /><Profile /></>
  },
])

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      {/* <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/admin" element={<Admin />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="create/course" element={<CreateCourse/>} />
        </Route>
        <Route path="/profile" element={<Profile />} />
      </Routes> */}
      <Footer />
      <Toaster/>
    </>
  )
}

export default App