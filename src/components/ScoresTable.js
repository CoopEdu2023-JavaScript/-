import React from 'react';
import { Table } from '@douyinfe/semi-ui';

const ScoresTable = ({ students }) => {
  return (
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
  );
};

export default ScoresTable;