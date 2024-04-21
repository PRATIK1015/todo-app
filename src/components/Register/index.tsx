import React, { useState } from 'react'
import { FormProps, Button, Image } from 'antd'
import { Form, Input } from "antd";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { useNavigate } from 'react-router-dom';
import { getApi } from '../../redux/apis';
import { registerAction } from '../../redux/slice/registerSlice';
import { toastText } from '../../utils/utils';

const RegisterComponent = () => {

    const [loading,setLoading]=useState(false)
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    type FieldType = {
        username?:string
        email?: string;
        password?: string;
        remember?: string;
    };


    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        setLoading(true)
            dispatch(registerAction(values) as any)
              .then((res: any) => {
                if (res?.payload?.statusCode === 200) {
                  toastText(
                    res?.payload?.message,
                    "success"
                  );
                  navigate("/login");
                }else{
                toastText(res?.payload?.message ?? "Fail to register", "error");
                }
              })
              .catch((error: any) => {
               
                navigate("/register");
              });
              setLoading(false)
          }
    


    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Success:', errorInfo);
    };
    return (<>
        <div className="container">
            <div className="left-div">
            <Image
                src={`./Register.jpg`}
                preview={false}
                alt='group'
                style={{maxHeight:'100vh',width:'100%'}}
              />            </div>
            <div className="right-div">
                <h3>Register Here..!</h3>
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
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
            ><Input />
            </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                  
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <Input   type="email"/>
                </Form.Item>

                <Form.Item<FieldType>
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Register
                    </Button>
                </Form.Item>
        </Form>
        <p style={{cursor:'pointer'}} onClick={()=>{navigate('/login')}}> <u>Already have account</u></p></div></div></>
    )
}

export default RegisterComponent