import React from 'react';
import { Button } from '@douyinfe/semi-ui';
import { useNavigate } from 'react-router-dom';

const CourseDetails = ({ course, onStartRollCall }) => {
  const navigate = useNavigate();

  const handleStartRollCall = () => {
    onStartRollCall();
    navigate('/callroll');
  };

  return (
    <div>
      <h2>课程详情</h2>
      <h3>{course.name}</h3>
      <p>{course.description}</p>
      <Button onClick={handleStartRollCall}>开始点名</Button>
    </div>
  );
};

export default CourseDetails;