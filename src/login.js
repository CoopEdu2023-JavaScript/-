import { Button, Input } from '@douyinfe/semi-ui';
import { Typography } from '@douyinfe/semi-ui';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const navigate = useNavigate();
  const { Title, Text } = Typography;
  const [accountName, setAccountName] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState({});
  const login = () => {
    new Promise((resolve, reject) => {
      let isSuccessful = Math.random() >= 0.5; // 随机成功或失败
      if (isSuccessful) {
        resolve({ success: true }); // 成功，调用resolve
      } else {
        reject({ msg: '密码错误', code: 1001 });
      }
    })
      .then(() => {
        console.log('跳转新页面');
        navigate('/success');
      })
      .catch(error => {
        setError(error);
      });
  };
  const a = useRef();
  useEffect(() => {
    a.current.focus();
  }, []);

  return (
    <>
      <Title>欢迎登录教师点名系统</Title>
      <Input
        ref={a}
        value={accountName}
        placeholder={'请输入账号'}
        onChange={changeValue => {
          setAccountName(changeValue);
        }}
      />
      <Input
        value={password}
        placeholder={'请输入密码'}
        onChange={changeValue => {
          setPassword(changeValue);
        }}
      />
      <div>{error.msg && <Text type="danger">{error.msg}</Text>}</div>
      <Button
        onClick={() => {
          login();
        }}
      >
        登录
      </Button>
      <Text>如果还没有账号请点击这里注册</Text>
    </>
  );
};

export default Login;
