import { Button, List } from '@douyinfe/semi-ui';

export const Students = ({ students, selectedStudents }) => {
  return (
    <List
      dataSource={students}
      grid={{
        gutter: 12,
        span: 3,
      }}
      renderItem={(item, index) => {
        return (
          <List.Item>
            <Button style={{ width: 168 }} disabled={selectedStudents.some(s => s.id === item.id)}
            >
              {item.name} {item.points}
            </Button>
          </List.Item>
        );
      }}
    ></List>
  );
};