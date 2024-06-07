import React, { useState } from 'react';
import { Button, Modal, Select } from '@douyinfe/semi-ui';
import StudentList from '../components/StudentList';
import LuckyStudentModal from '../components/LuckyStudentModal';
import { fetchStudents, updateStudent, updateStudentsBulk } from './callroll/requests';
import useSWR from 'swr';

const CallrollPage = () => {
  const { data: students, mutate } = useSWR('/students', fetchStudents);
  const [visible, setVisible] = useState(false);
  const [currentStudent, setCurrentStudent] = useState({});
  const [groupCount, setGroupCount] = useState(2);
  const [groups, setGroups] = useState([]);

  const showDialog = () => {
    const unselectedStudents = students.filter((student) => !student.selected);
    const randomIndex = Math.floor(Math.random() * unselectedStudents.length);
    setCurrentStudent(unselectedStudents[randomIndex]);
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleGroupChange = (value) => {
    setGroupCount(value);
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const startGrouping = () => {
    const shuffledStudents = shuffleArray([...students]);
    const newGroups = Array.from({ length: groupCount }, () => []);
    shuffledStudents.forEach((student, index) => {
      newGroups[index % groupCount].push(student);
    });
    setGroups(newGroups);
  };

  return (
    <div>
      <h2>上课操作</h2>
      <StudentList students={students} />
      <Button onClick={showDialog} className="answer" theme="solid">
        抽取学生
      </Button>
      <LuckyStudentModal
        visible={visible}
        currentStudent={currentStudent}
        handleOk={handleOk}
        handleCancel={() => setVisible(false)}
      />
      <h2>分组</h2>
      <Select value={groupCount} onChange={handleGroupChange}>
        <Select.Option value={2}>2组</Select.Option>
        <Select.Option value={3}>3组</Select.Option>
        <Select.Option value={4}>4组</Select.Option>
      </Select>
      <Button onClick={startGrouping}>开始分组</Button>
      <div>
        {groups.map((group, index) => (
          <div key={index}>
            <h3>组 {index + 1}</h3>
            <ul>
              {group.map((student) => (
                <li key={student.id}>{student.name}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CallrollPage;