import { Button, Input } from '@douyinfe/semi-ui';
import { Typography } from '@douyinfe/semi-ui';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./index.module.scss"

const Login = () => {
  const navigate = useNavigate();
  const { Title, Text } = Typography;
  const [accountName, setAccountName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({});

  const login = () => {
    new Promise((resolve, reject) => {
      let isSuccessful = Math.random() >= 0.5;
      setTimeout(() => {
        if (isSuccessful) {
          resolve({ success: true });
        } else {
          reject({ msg: '密码错误', code: 1001 });
        }
      }, 1000);
    })
      .then(() => {
        console.log('登录成功，跳转至课程选择页面 /courses');
        navigate('/courses');
      })
      .catch((error) => {
        setError(error);
      });
  };

  return (
    <div className={styles.callroll}>
      <Title>欢迎登录教师点名系统</Title>
      <Input
        autoFocus
        value={accountName}
        placeholder='请输入账号'
        onChange={(event) => {
          setAccountName(event.target.value);
        }}
      />
      <Input
        type="password"
        value={password}
        placeholder='请输入密码'
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      {error.msg && <Text type="danger">{error.msg}</Text>}
      <Button onClick={login} theme='solid'>
        登录
      </Button>
      <Text>如果还没有账号请点击这里注册</Text>
    </div>
  );
};

export default Login;