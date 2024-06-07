import React from 'react';
import { Button } from '@douyinfe/semi-ui';
import AttendanceTable from '../components/AttendanceTable';
import { fetchStudents, updateStudent } from './callroll/requests';
import useSWR from 'swr';

const AttendancePage = () => {
  const { data: students, mutate } = useSWR('/students', fetchStudents);

  const handleAttendanceChange = async (id, status) => {
    const student = students.find((student) => student.id === id);
    const updatedAttendance = [
      ...student.attendance,
      { date: new Date().toLocaleDateString(), status }
    ];
    await updateStudent({ id, data: { attendance: updatedAttendance } });
    mutate();
  };

  return (
    <div>
      <h2>考勤记录</h2>
      <AttendanceTable students={students} handleAttendanceChange={handleAttendanceChange} />
    </div>
  );
};

export default AttendancePage;