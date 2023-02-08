import React, { useState } from "react";
import { Card, Divider, Space, Button, Popconfirm, message, Modal, Form, Alert, Input } from 'antd'
import './index.less'
const Actions = () => {
    const [form] = Form.useForm();
    const confirm = (val: string) => {
        if (val == 'restart') {
            message.success('Restart Successfully');
        } else {
            message.success('Stop Successfully');
        }
    };

    const cancel = (e: any) => {
        console.log(e);
    };
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [instanceName, setInstanceName] = useState('')
    const showModal = () => {
        setIsModalOpen(true)
        setInstanceName('onecompgraph')
    };
    //销毁确认
    const handleOk = async (val: any) => {
        if (val.instanceName == instanceName) {
            // let params = {
            //     instanceName: instanceName,
            // }
            //销毁请求
            // await stopClick(params, true)
            //关闭弹框
            // await updataSate((draft) => {
            //   draft.isModalOpen = false
            // })
        } else {
            message.error('请输入正确的InstanceName');
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false)
    };
    const onClose = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        console.log(e, 'I was closed.');
    };
    return (
        <div className="action">
            <h2 className="action_title">Deployment Actions</h2>
            <Divider />
            <Space>
                <Popconfirm
                    title="Sure to restart"
                    onConfirm={() => confirm('restart')}
                    onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button>Restart</Button>
                </Popconfirm>
                <Popconfirm
                    title="Sure to stop"
                    onConfirm={() => confirm('stop')}
                    onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button danger>Stop</Button>
                </Popconfirm>
                <Button type="primary" danger onClick={() => showModal()}>Destory</Button>
            </Space>
            <Modal title="销毁" open={isModalOpen} footer={null} closable={false}>
                <Form
                    name="basic"
                    form={form}
                    onFinish={handleOk}
                >
                    <Form.Item>

                        <div className='font'>确定销毁{instanceName}实例</div>
                        <Alert
                            message="销毁操作不可逆"
                            description="销毁操作会永久删除pvc持久化存储数据，请谨慎操作"
                            type="error"
                            closable
                            onClose={onClose}
                        />
                        <div className='font'>请输入instanceName</div>
                    </Form.Item>
                    <Form.Item
                        className='font'
                        label="InstanceName"
                        name="instanceName"
                        rules={[{ required: true, message: 'Please input your instanceName!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Space>
                            <Button onClick={handleCancel}>
                                取消
                            </Button>
                            <Button type="primary" htmlType="submit" >
                                确认
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal >
        </div>
    )
}
export default Actions