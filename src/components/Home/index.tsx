import { DeleteOutlined, EditOutlined, LogoutOutlined } from '@ant-design/icons';
import { FormProps, Button, Layout, Space } from 'antd'
import { Form, Input } from "antd";
import { Table, Tooltip, Tag, Modal } from 'antd';
import { Header, Content } from 'antd/es/layout/layout';
import Column from 'antd/es/table/Column';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../redux/store';
import { fetchtask } from '../../redux/actions/taskAction';
import { deleteApi, postApi, putApi } from '../../redux/apis';
import { toastText } from '../../utils/utils';
import './home.css'

type FieldType = {
  title?: string;
  description?: string;
};
const layoutStyle = {
  overflow: 'hidden',
};
const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  height: 64,
  paddingInline: 48,
  lineHeight: '64px',
  backgroundColor: '#4096ff',
  display: 'flex', justifyContent: 'space-between', alignItems: 'center'
};

const HomeComponent = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate()
  const { data,isLoading } = useSelector((state: any) => state?.task);
  const { data: userData } = useSelector((state: any) => state?.profile);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [addtaskLoading, setAddtaskLoading] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  const [selectedTask, setSelectedTask] = useState<any>();
  const showModal = () => {
    setSelectedTask(undefined)
    setIsModalOpen(true);
  };

  useEffect(() => {
    form.resetFields();
    form.setFieldsValue(selectedTask); // Set form values when editFormValue changes
  }, [selectedTask, form])
  useEffect(() => {
    dispatch(fetchtask())
  }, [])
  const handleOk = () => {
    setSelectedTask(undefined)
    setIsModalOpen(false);
  };

  const handleDelete = async (data: any) => {
    await deleteApi(`/task/deletetask/${data?.id}`).then(async (res: any) => {
      if (res?.status === 200) {
        dispatch(fetchtask());
        toastText(res?.data?.message ?? "task deleted successfully", "success");
      }
    })
      .catch((error: any) => {
        toastText(error?.response?.data?.error?.message ?? "Fail to delete task", "error");
      });
  }
  const handleCancel = () => {
    setSelectedTask(undefined)
    setIsModalOpen(false);
  };
  const handleLogOut = () => {
    Cookies.remove('accessToken');
    navigate("/login")
  }
  const handleEdit = (data: any) => {

    setSelectedTask(data)
    setIsModalOpen(true)
  }
  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    setAddtaskLoading(true)
    if (selectedTask) {
      await putApi('/task/edittask', { ...values, id: selectedTask.id }).then(async (res: any) => {
        if (res?.status === 200) {
          dispatch(fetchtask());
          toastText(res?.data?.message ?? "task updated successfully", "success");
        }
      })
        .catch((error: any) => {
          toastText(error?.response?.data?.error?.message ?? "Fail to update task", "error");
        });

    } else {
      await postApi('/task/addtask', values).then(async (res: any) => {
        if (res?.status === 200) {
          dispatch(fetchtask());
          toastText(res?.data?.message ?? "task created successfully", "success");
        }
      })
        .catch((error: any) => {
          toastText(error?.response?.data?.error?.message ?? "Fail to create task", "error");
        });
    }
    setAddtaskLoading(false)
    handleCancel()
    // };
  }
  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div>

      <Layout style={layoutStyle}>
        <Header style={headerStyle}> <Tooltip placement='bottom' title={`Username`}><h3>{userData?.username}</h3></Tooltip>
          <Tooltip placement='bottom' title={`Log out`}><LogoutOutlined style={{ marginLeft: '10px' }} onClick={handleLogOut} /></Tooltip></Header>
        <Content style={{paddingLeft:25,paddingRight:25,backgroundColor:'rgb(221, 224, 224)',minHeight:' calc(100vh - 64px)'}} >
          <div className="container-titlw">
            <div className="row">
              <h1>Tasks</h1>
              {userData?.role === "ADMIN" && <Button type="primary" onClick={showModal}>Add Task</Button>}
            </div>
          </div>
          <Table
            dataSource={data}
            pagination={false}
            loading={isLoading}
            className="table-global"
          >
            <Column

              title={() => {
                return <>Task Name</>;
              }}
              dataIndex="title"
              key="title"
              width={"25%"}
              align='center'
              className="bg-white"
            />
            <Column
              title="Description"
              dataIndex="description"
              key="description"
              width={"30%"}
              align='center'
              className="bg-white"
            />
            <Column
              title="Status"
              dataIndex="completed"
              key="completed"
              align='center'
              className="bg-white"
              width={"20%"}
              render={(value, data: any) => {
                return <Space size={20}>
                  <Tag color={data?.completed ? 'green' : 'orange'}>{data?.completed ? "completed" : "pending"}</Tag>
                </Space>

              }}
            />

            {userData?.role === "ADMIN" && <Column
              title="Action"
              dataIndex="action"
              key="action"
              className="bg-white"
              align='center'
              width={"25%"}
              render={(value, data: any) => (
                <Space size={20}>
                  <div><DeleteOutlined onClick={() => {
                    Modal.confirm({
                      title: 'Are you sure??',
                      centered: true,
                      onOk: (...args) => {
                        handleDelete(data)
                      },
                      footer: (_, { OkBtn, CancelBtn }) => (
                        <>
                          <CancelBtn />
                          <OkBtn/>
                        </>
                      ),
                    });
                  }} /></div>
                  <div><EditOutlined onClick={() => { handleEdit(data) }} /> </div>
                </Space>
              )}
            />}
          </Table>
        </Content>
      </Layout>
      <Modal
        title={selectedTask ? "Updated Task Details" : "Add Task Details"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => {
          handleCancel();
        }}
        centered={true}
        width={500}
        footer={null}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          // style={{ maxWidth: 600 }}
          // initialValues={ selectedTask}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: 'Please input your title!' }]}
          // initialValue={selectedTask?.title} // Set initial value directly
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please input your description!' }]}
          // initialValue={selectedTask?.description} // Set initial value directly
          >
            <Input />
          </Form.Item>



          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" loading={addtaskLoading}>
              {selectedTask ? "Update Task" : "Create Task"}
            </Button>
          </Form.Item>
        </Form>

      </Modal>
    </div>
  )
}

export default HomeComponent