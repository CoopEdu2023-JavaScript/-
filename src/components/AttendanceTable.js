import React from 'react';
import { Table, Button } from '@douyinfe/semi-ui';

const AttendanceTable = ({ students, handleAttendanceChange }) => {
  return (
    <Table dataSource={students} columns={[
      {
        title: '姓名',
        dataIndex: 'name',
      },
      {
        title: '考勤',
        render: (text, record) => (
          <Button
            onClick={() => handleAttendanceChange(record.id, '出席')}
            theme={record.attendance && record.attendance.slice(-1)[0]?.status === '出席' ? 'solid' : 'border'}
          >
            {record.attendance && record.attendance.slice(-1)[0]?.status === '出席' ? '出席' : '未出席'}
          </Button>
        ),
      },
    ]} />
  );
};

export default AttendanceTable;