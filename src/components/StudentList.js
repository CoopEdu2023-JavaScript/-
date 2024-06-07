import React from 'react';
import { Table } from '@douyinfe/semi-ui';

const StudentList = ({ students }) => {
  return (
    <Table dataSource={students} columns={[
      {
        title: '姓名',
        dataIndex: 'name',
      },
    ]} />
  );
};

export default StudentList;