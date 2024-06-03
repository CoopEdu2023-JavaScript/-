import { Button, Input } from '@douyinfe/semi-ui';
import { Typography } from '@douyinfe/semi-ui';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./index.module.scss";

const Login = () => {
  const navigate = useNavigate();
  const { Title, Text } = Typography;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const login = () => {
    fetch('http://localhost:3000/users')
      .then(response => response.json())
      .then(users => {
        const user = users.find(user => {console.log(user,username,password);return user.username === username && user.password === password});
        if (user) {
          console.log('登录成功，跳转至课程选择页面 /courses');
          navigate('/courses');
        } else {
          setError('用户名或密码错误');
        }
      })
      .catch(err => {
        setError('登录失败，请稍后再试');
      });
  };

  return (
    <div className={styles.callroll}>
      <Title>欢迎登录教师点名系统</Title>
      <Input
        autoFocus
        value={username}
        placeholder='请输入账号'
        onChange={(event) => {
          console.log(event)
          setUsername(event);
        }}
      />
      <Input
        type="password"
        value={password}
        placeholder='请输入密码'
        onChange={(event) => {
          setPassword(event);
        }}
      />
      {error && <Text type="danger">{error}</Text>}
      <Button onClick={login} theme='solid'>
        登录
      </Button>
      <Text>如果还没有账号请点击这里注册</Text>
    </div>
  );
};

export default Login;
