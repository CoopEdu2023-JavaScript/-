import React, { useState } from 'react';
import { Button, Modal, Input } from '@douyinfe/semi-ui';
import StudentList from '../components/StudentList';
import { addStudent, fetchStudents } from './callroll/requests';
import useSWR from 'swr';

const MainPage = ({ courses, onSelectCourse }) => {
  const { data: students, mutate } = useSWR('/students', fetchStudents);
  const [newStudent, setNewStudent] = useState({ name: '' });
  const [modalVisible, setModalVisible] = useState(false);

  const handleAddStudent = async () => {
    await addStudent(newStudent);
    mutate();
    setModalVisible(false);
    setNewStudent({ name: '' });
  };

  const handleInputChange = (value) => {
    setNewStudent({ name: value });
  };

  return (
    <div>
      <h2>学生管理</h2>
      <StudentList students={students} />
      <Button onClick={() => setModalVisible(true)}>添加学生</Button>
      <Modal
        title="添加学生"
        visible={modalVisible}
        onOk={handleAddStudent}
        onCancel={() => setModalVisible(false)}
      >
        <Input
          value={newStudent.name}
          onChange={e => handleInputChange(e.target.value)}
          placeholder="输入学生姓名"
        />
      </Modal>
    </div>
  );
};

export default MainPage;