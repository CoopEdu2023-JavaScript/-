import { Button, Input } from '@douyinfe/semi-ui';
import { Typography } from '@douyinfe/semi-ui';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./index.module.scss";

const Register = () => {
  const navigate = useNavigate();
  const { Title, Text } = Typography;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const register = () => {
    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })
      .then(response => {
        if (response.ok) {
          console.log('注册成功，跳转至登录页面 /login');
          navigate('/login');
        } else {
          setError('注册失败，请稍后再试');
        }
      })
      .catch(err => {
        setError('注册失败，请稍后再试');
      });
  };

  return (
    <div className={styles.callroll}>
      <Title>注册新账号</Title>
      <Input
        autoFocus
        value={username}
        placeholder='请输入账号'
        onChange={(event) => {
          setUsername(event.target.value);
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
      {error && <Text type="danger">{error}</Text>}
      <Button onClick={register} theme='solid'>
        注册
      </Button>
      <Text>已有账号？ <a onClick={() => navigate('/login')}>登录</a></Text>
    </div>
  );
};

export default Register;
