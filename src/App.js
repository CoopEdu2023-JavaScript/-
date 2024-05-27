import React, { useState } from 'react';
import { createBrowserRouter, RouterProvider, Route, Routes } from 'react-router-dom';
import CourseList from './Courselist/CourseList';
import CourseDetails from './Courselist/CourseDetails';
import Login from './login/login';
import { CallrollTab } from './pages/callroll/CallrollTab';
import './App.css';

const App = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);

  const courses = [
    { id: 1, name: '课程1', description: '这是课程1的描述' },
    { id: 2, name: '课程2', description: '这是课程2的描述' },
    { id: 3, name: '课程3', description: '这是课程3的描述' },
  ];

  const handleSelectCourse = (courseId) => {
    const course = courses.find((course) => course.id === courseId);
    setSelectedCourse(course);
  };

  const router = createBrowserRouter([
    { path: '/', element: <div>欢迎访问首页</div> },
    { path: '/login', element: <Login /> },
    {
      path: '/courses',
      element: <CourseList courses={courses} onSelectCourse={handleSelectCourse} />,
    },
    {
      path: '/courses/:courseId',
      element: (
        <CourseDetails course={selectedCourse} onStartRollCall={() => router.navigate('/callroll')} />
      ),
    },
    { path: '/callroll', element: <CallrollTab /> },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
