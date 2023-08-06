import { Button, Checkbox, Form, Input } from 'antd';

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
  confirm?: string;
  email?: string;
};

const SignUp = ({handleAdd}: {handleAdd : any}) => {
  
  const onFinish = (values: any) => {
    console.log('Success:', values);
    handleAdd(values);
  };
  
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };



  return (
  <div style={{width : '100%',display:'flex',justifyContent:'center'}}>
  <Form

  name="basic"
  labelCol={{ span: 8 }}
  wrapperCol={{ span: 16 }}

  initialValues={{ remember: true }}
  onFinish={onFinish}
  onFinishFailed={onFinishFailed}
  autoComplete="off"
  className='form-auth col-md-6 col-sm-9'
  >
    <Form.Item<FieldType>
      label="Username"
      name='username'
      rules={[{ required: true, message: 'Please input your username!' }]}
      // {...register("username")}
      hasFeedback 
    >
    
      <Input />
    </Form.Item>

    <Form.Item<FieldType>
      label="Email"
      name="email"
      rules={[{ required: true, message: 'Please input your email!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item<FieldType>
      label="Password"
      name="password"
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
      <Input.Password />
    </Form.Item>
    <Form.Item<FieldType>
      label="Confirm password"
      name="confirm"
      rules={[
        {
          required: true,
          message: 'Please confirm your password!',
        },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value || getFieldValue('password') === value) {
              return Promise.resolve();
            }
            return Promise.reject(new Error('The new password that you entered do not match!'));
          },
        }),
      ]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item<FieldType>
      name="remember"
      valuePropName="checked"
      wrapperCol={{ offset: 8, span: 16 }}
    >
      <Checkbox>Remember me</Checkbox>
    </Form.Item>

    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
  </div>
  )
  };

export default SignUp;