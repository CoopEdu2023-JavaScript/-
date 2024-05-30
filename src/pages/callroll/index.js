import { useEffect, useState } from 'react';
import axios from 'axios';
import { List, Button, Spin, Modal, Space } from '@douyinfe/semi-ui';
import './style.scss';
import { CallrollTab } from 'src/pages/callroll/index.js';
import useSWR from 'swr';

const Callroll = () => {
  const [currentStudent, setCurrentStudent] = useState({});
  const [groups, setGroups] = useState([]);
  const [groupSize, setGroupSize] = useState(2);
  const [visible, setVisible] = useState(false);
  const {
    data: students,
    mutate,
    error,
    loading,
  } = useSWR('http://localhost:3000/books', url =>
    axios.get(url).then(res => res.data)
  );

  if (loading) {
    return <Spin />;
  }

  if (error) {
    return <div>{error.message}</div>;
  }
  

  const handleCancel = () => {
    setVisible(false);
  };
  return(
    <Tabs type="line">
    <TabPane tab="点名"itemKey="1">
      <CallrollTab />
      </TabPane>
      <TabPane tab="分组"itemKey="2">
        <Group />
        </TabPane>
        </Tabs>
    )
   };


export default Callroll;