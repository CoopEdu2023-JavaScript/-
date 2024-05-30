import { Students }from '@/pages/callroll/components';
import { Button, Card, InputNumber, Space } from '@douyinfe/semi-ui';
import Title from 'edouyinfe/semi-ui/lib/es/typography/title' ;
import {useState }from 'react';
import useSWR from'swr';
import axios from 'axios';
const getShuffledArr =arr =>{
const newArr=arr.slice();
for(leti=newArr.length-1;i>0;i--){
const rand =Math.floor(Math.random()*(i+1));
[newArr[i],newArr[rand]]= [newArr[rand], newArr[i]];
12
return newArr;
};
export const Group = ()=>{
  const rand = math
}




  const group = () => {
    const students_t = getShuffledArr(students);
    const totalPeople = students_t.length;
    let groupCount = Math.floor(totalPeople / groupSize);
    let remainder = totalPeople % groupSize
    if (remainder === 1) {
      remainder++;
      groupCount--;
    }
  
    const groups = [];
  
    let startIndex = 0;
    for (let i = 0; i < groupCount; i++) {
      const group = students_t.slice(startIndex, startIndex + groupSize);
      groups.push(group);
      startIndex += groupSize;
    }
  
    if (remainder > 0) {
      const lastGroup = students_t.slice(startIndex);
      groups.push(lastGroup);
    }
    setGroups(groups);
  }
  setGroups(groups);
  };

return(
  <>
  <Students students={students} selectedstudents={[]} />
  <Space className={'group-hint'}>
  <Title heading={4}>每组分成</Title>
  <InputNumber
  max={Math.ceil(students.length /2)}
  min={2}
  value={groupSize}
  onChange={v=>setGroupSize(v)}
  />
  <Title heading={4}>人</Title>
  </Space>
  <Button onClick={group} className={'group-button'} theme="solid">
  随机分组
  </Button>
  {groups.length>0&&(
  <Space spacing={[92,40]} className={'groups'} align={'start'}>
    {groups.map((group,index) => {
      return (
        <Card
          className={'group-card'}
          title={String.fromCharCode(index+65)}
  >
          <Space vertical spacing={[0, 18]}>
            {group.map(x=>(
              <Button className={'group-student'}>{x.name}</Button>
            ))}
          </Space>
       </Card>
  );
  })}
  </Space>
  )}
  </>
  );
};