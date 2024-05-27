import { Button, Modal, TabPane } from '@douyinfe/semi-ui';
import useSWR from 'swr';
import axios from 'axios';
import { updateStudent } from './requests';
import { Students } from './components';
import { useEffect, useState } from 'react';

export const CallrollTab = () => {
  const [visible, setVisible] = useState(false);
  const [currentStudent, setCurrentStudent] = useState({});

  const { data: students, mutate } = useSWR(
    "http://localhost:3000/books",
    url => axios.get(url).then(res => res.data)
  );

  useEffect(() => {
    if (students) {
      const unselectStudents = students.filter(dataItem => !dataItem.selected);
      if (unselectStudents.length !== 0) {
        const updatePromises = students.map(student =>
          updateStudent({
            id: student.id,
            data: { selected: false },
          })
        );
        // 等待所有更新请求完成
        Promise.all(updatePromises).then(() => {
          mutate();
        });
      }
    }
  }, [students]);

  const showDialog = () => {
    const unselectStudents = students.filter(dataItem => !dataItem.selected);
    let randomIndex = Math.floor(Math.random() * unselectStudents.length);
    let randomPerson = unselectStudents[randomIndex];
    setCurrentStudent(randomPerson);
    setVisible(true);
  };

  const handleOk = async () => {
    setVisible(false);
    await updateStudent({
      id: currentStudent.id,
      data: { points: currentStudent.points + 1, selected: true },
    }).then(() => mutate());
    setCurrentStudent({});
  };

  const handleCancel = async () => {
    setVisible(false);
  };

  return (
    <div className="callroll">
      <Students
        students={students} // 所有学生
        selectedStudents={students && students.filter(s => s.selected)} // 被选中的学生
      />
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
    </div>
  );
};