import React from 'react';
import { useNavigate } from 'react-router-dom';

const CourseList = ({ courses, onSelectCourse }) => {
  const navigate = useNavigate();

  const handleCourseClick = (courseId) => {
    onSelectCourse(courseId);
    navigate(`/courses/${courseId}`);
  };

  return (
    <div>
      <h2>课程列表</h2>

      {/* 广告部分 */}
      <div className="ad-section">
        <a href="https://moonshotacademy.cn" target="_blank" rel="noopener noreferrer">
          <video width="320" height="240" controls>
            <source src="https://s.moonshotacademy.cn/public/8/3/9d5074-68b76f-3f22c2.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </a>
        <p>This domain is for use in illustrative examples in documents. You may use this domain in literature without prior coordination or asking for permission.</p>
      </div>

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