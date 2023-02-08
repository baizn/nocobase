import React, { useEffect, useImperativeHandle, forwardRef } from 'react';
import { Col, Row, Switch, Form, Input, Select } from 'antd';
import { history } from 'umi'
// import { LeftOutlined } from '@ant-design/icons'
import './index.less'

const CreateGraph = (props: {
    [x: string]: any; getBasicInformation: (arg0: any) => void; 
}, ref: React.Ref<unknown> | undefined) => {
    const [form] = Form.useForm()
    const isEdit = localStorage.getItem('name')
    useEffect(() => {
        console.log(history.location)

        form.setFieldsValue({
            directed: false,
            type: 'ArrowGraph',
            name:localStorage.getItem('label')
        })
        console.log(history);

    })
    useImperativeHandle(ref, () => ({
        changeBasicInformation: () => {
            form
                .validateFields()
                .then(values => {
                    // 调用父组件方法，设置父组件的值
                    props.getBasicInformation(values)
                })
                .catch(errorInfo => {
                    return false
                })
        }
    }));
    return (
        <div className='graph_information'>
            <div style={{ marginTop: '16px' }}>
                <Form
                    name="basic"
                    layout="vertical"
                    form={form}
                >
                    <Row>
                        <Col span={12}>
                            <Form.Item
                                label="Graph Type"
                                name="type"
                                tooltip='Choose a Graph Type'
                                wrapperCol={{ span: 23 }}
                                rules={[{ required: true, message: 'Please input Name!' }]}
                            >
                                <Select
                                    disabled={isEdit == 'Schema' || isEdit == 'dataimport'}
                                    options={[
                                        {
                                            value: 'ArrowGraph',
                                            label: 'ArrowGraph',
                                        },
                                        {
                                            value: 'GrootGraph',
                                            label: 'GrootGraph',
                                            disabled: isEdit== '' ? true :false
                                        }
                                    ]}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Name"
                                name="name"
                                tooltip='Graph Name'
                                rules={[{ required: true, message: 'Please input Name!' }]}
                            >
                                <Input disabled={isEdit == 'Schema' || isEdit == 'dataimport'}/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Directed"
                                name="directed"
                                tooltip='Directed Graph or Undirected Graph'
                                rules={[{ required: true, message: 'Please input Directed!' }]}
                            >
                                <Switch disabled={isEdit == 'Schema' || isEdit == 'dataimport'}/>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>
    )
}

export default forwardRef(CreateGraph);