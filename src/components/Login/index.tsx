import React from 'react'
import { FormProps, Button, Checkbox, Image } from 'antd'
import { Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { loginAction } from '../../redux/actions/loginAction';
import { fetchtask } from '../../redux/actions/taskAction';
import { useNavigate } from 'react-router-dom';
import { fetchprofile } from '../../redux/actions/fetchprofile';
import './index.css'

const LogInComponent = () => {
const dispatch = useDispatch<AppDispatch>();
const navigate = useNavigate();
type FieldType = {
    email?: string;
    password?: string;
    remember?: string;
};
const state = useSelector((state: any) => state?.auth);
const onFinish: FormProps<FieldType>['onFinish'] = (values) => {

        dispatch(loginAction(values) as any)
          .unwrap()
          .then((res: any) => {
            dispatch(fetchprofile())
            dispatch(fetchtask() as any).then(() => {
              navigate("/");
            });
         
          })
          .catch((error: any) => {
            navigate("/login");
          });
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Success:', errorInfo);
};
    return (<>
        <div className="container">
            <div className="left-div">
            <Image
                src={`./Login.jpg`}
                preview={false}
                alt='group'
                style={{maxHeight:'100vh'}}
              />
            </div>
            <div className="right-div">
                <h3>Log in</h3>
            <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input />
                    </Form.Item>
    
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>
    
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit" loading={state?.loading}>
                            log in
                        </Button>
                    </Form.Item>
                </Form>
                <p style={{cursor:'pointer'}} onClick={()=>{navigate('/register')}}> <u>Don't have account</u></p>
            </div>
        </div>
    </>
    
    )
}

export default LogInComponent