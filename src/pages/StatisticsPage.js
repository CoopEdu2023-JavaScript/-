import React from 'react';
import ScoresTable from '../components/ScoresTable'; // 确保 ScoresTable 组件存在并导入正确
import { fetchStudents } from './callroll/requests';
import useSWR from 'swr';

const StatisticsPage = () => {
  const { data: students, mutate } = useSWR('/students', fetchStudents);

  return (
    <div>
      <h2>成绩统计</h2>
      <ScoresTable students={students} />
    </div>
  );
};

export default StatisticsPage;