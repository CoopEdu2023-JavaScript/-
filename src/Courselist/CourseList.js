import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CourseList = ({ courses, onSelectCourse }) => {
  const navigate = useNavigate();

  const handleCourseClick = (courseId) => {
    onSelectCourse(courseId);
    navigate(`/courses/${courseId}`);
  };

  return (
    <div>
      <h2>课程列表</h2>
      <ul>
        {courses.map((course) => (
          <li key={course.id} onClick={() => handleCourseClick(course.id)}>
            {course.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseList;