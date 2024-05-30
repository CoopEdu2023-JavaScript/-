import React, { useState } from 'react';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import CourseList from './Courselist/CourseList';
import CourseDetails from './Courselist/CourseDetails';
import Login from './login/login';
import CallrollTab from './pages/callroll/CallrollTab';
import './App.css';

const App = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);

  const courses = [
    { id: 1, name: '课程1', description: '这是课程1的描述', students: [{ id: 1, name: '学生1' }, { id: 2, name: '学生2' }] },
    { id: 2, name: '课程2', description: '这是课程2的描述', students: [{ id: 3, name: '学生3' }, { id: 4, name: '学生4' }] },
    { id: 3, name: '课程3', description: '这是课程3的描述', students: [{ id: 5, name: '学生5' }, { id: 6, name: '学生6' }] },
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
        <CourseDetails course={selectedCourse} />
      ),
    },
    { path: '/callroll', element: <CallrollTab /> },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
