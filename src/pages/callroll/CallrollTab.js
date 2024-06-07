import React, { useState, useEffect } from 'react';
import { Button, Modal, Select, Table, Input } from '@douyinfe/semi-ui';
import useSWR from 'swr';
import { fetchStudents, updateStudent, updateStudentsBulk, addStudent } from './requests';
import './CallrollTab.css';

const CallrollTab = () => {
  const [visible, setVisible] = useState(false);
  const [currentStudent, setCurrentStudent] = useState({});
  const [groupCount, setGroupCount] = useState(2);
  const [attendance, setAttendance] = useState({});
  const [scoreModalVisible, setScoreModalVisible] = useState(false);
  const [groups, setGroups] = useState([]);
  const [addStudentVisible, setAddStudentVisible] = useState(false);
  const [newStudent, setNewStudent] = useState({ name: '', selected: false, currentPoints: 0, totalPoints: 0 });

  const { data: students, mutate } = useSWR("/students", fetchStudents);

  useEffect(() => {
    if (students) {
      const attendanceState = {};
      students.forEach(student => {
        attendanceState[student.id] = student.attendance || [];
      });
      setAttendance(attendanceState);
    }
  }, [students]);

  const showDialog = () => {
    const unselectedStudents = students.filter(student => !student.selected);
    let randomIndex = Math.floor(Math.random() * unselectedStudents.length);
    let randomPerson = unselectedStudents[randomIndex];
    setCurrentStudent(randomPerson);
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
    setScoreModalVisible(true);
  };

  const handleAddPoints = async (points) => {
    const updatedStudent = {
      ...currentStudent,
      currentPoints: (currentStudent.currentPoints || 0) + points,
      selected: true,
    };

    await updateStudent({ id: currentStudent.id, data: updatedStudent })
      .then(() => mutate());
    setCurrentStudent(updatedStudent);
    setScoreModalVisible(false);
  };

  const handleEndClass = async () => {
    const updatedStudents = students.map(student => ({
      ...student,
      totalPoints: (student.totalPoints || 0) + (student.currentPoints || 0),
      currentPoints: 0,
      selected: false
    }));
    await updateStudentsBulk(updatedStudents);
    mutate();
  };

  const handleCancel = () => {
    setVisible(false);
    setCurrentStudent({});
  };

  const handleScoreCancel = () => {
    setScoreModalVisible(false);
    setCurrentStudent({});
  };

  const handleGroupChange = value => {
    setGroupCount(value);
  };

  const handleAttendanceChange = (id, status) => {
    setAttendance(prev => ({
      ...prev,
      [id]: [...prev[id], { date: new Date().toLocaleDateString(), status }]
    }));
  };
  

  const handleSaveAttendance = async () => {
    const updatePromises = students.map(student =>
      updateStudent({
        id: student.id,
        data: { attendance: attendance[student.id] }
      })
    );
    await Promise.all(updatePromises);
    mutate();
  };

  const shuffleArray = array => {
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

  const showAddStudentDialog = () => {
    setAddStudentVisible(true);
  };

  const handleAddStudentOk = async () => {
    await addStudent(newStudent);
    mutate();
    setAddStudentVisible(false);
    setNewStudent({ name: '', selected: false, currentPoints: 0, totalPoints: 0 });
  };

  const handleAddStudentCancel = () => {
    setAddStudentVisible(false);
    setNewStudent({ name: '', selected: false, currentPoints: 0, totalPoints: 0 });
  };

  return (
    <div className="callroll">
      <h2>点名</h2>
      <ul>
        {students && students.map((student) => (
          <li key={student.id}>
            {student.name} {student.selected && '(已选中)'}
          </li>
        ))}
      </ul>
      <Button onClick={showDialog} className="answer" theme="solid">
        回答问题
      </Button>
      <Modal
        title="幸运儿"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        closeOnEsc={true}
      >
        {currentStudent ? currentStudent.name : "没有选中的学生"}
      </Modal>

      <Modal
        title="加减分"
        visible={scoreModalVisible}
        onCancel={handleScoreCancel}
        closeOnEsc={true}
        footer={null}
      >
        <div>
          <p>当前学生: {currentStudent.name}</p>
          <Button onClick={() => handleAddPoints(0)}>不加分</Button>
          <Button onClick={() => handleAddPoints(1)}>+1</Button>
          <Button onClick={() => handleAddPoints(2)}>+2</Button>
        </div>
      </Modal>

      <Button onClick={handleEndClass}>下课</Button>
      <Button onClick={showAddStudentDialog}>添加学生</Button>

      <Modal
        title="添加学生"
        visible={addStudentVisible}
        onOk={handleAddStudentOk}
        onCancel={handleAddStudentCancel}
        closeOnEsc={true}
      >
        <div>
          <p>学生姓名:</p>
          <Input
            value={newStudent.name}
            onChange={(value) => setNewStudent(prev => ({ ...prev, name: value }))}
            placeholder="输入学生姓名"
          />
        </div>
      </Modal>

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
              {group.map(student => (
                <li key={student.id}>{student.name}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <h2>考勤</h2>
<Table dataSource={students} columns={[
  {
    title: '姓名',
    dataIndex: 'name',
  },
  {
    title: '考勤',
    render: (text, record) => (
      <Select
        value={attendance[record.id]?.slice(-1)[0]?.status || '出席'}
        onChange={status => handleAttendanceChange(record.id, status)}
      >
        <Select.Option value="出席">出席</Select.Option>
        <Select.Option value="未出席">未出席</Select.Option>
        <Select.Option value="迟到">迟到</Select.Option>
      </Select>
    ),
  },
]} />
<Button onClick={handleSaveAttendance}>保存考勤</Button>

      <Button onClick={handleSaveAttendance}>保存考勤</Button>

      <h2>课堂表现分统计</h2>
      <Table dataSource={students} columns={[
        {
          title: '姓名',
          dataIndex: 'name',
        },
        {
          title: '当前课堂表现分',
          dataIndex: 'currentPoints',
        },
        {
          title: '总课堂表现分',
          dataIndex: 'totalPoints',
        },
      ]} />
    </div>
  );
};

export default CallrollTab;