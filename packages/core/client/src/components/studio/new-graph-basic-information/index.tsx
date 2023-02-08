import React from 'react';
import { Col, Row, Switch, Form, Input, Select } from 'antd';
import './index.less'

const CreateGraph = () => {
    const isEdit = localStorage.getItem('name')
    return (
        <div className='graph_information'>
            <div>
                <Row>
                    <Col span={12}>
                        <Form.Item
                            label="Graph Type"
                            name="graphtype"
                            tooltip='Choose a Graph Type'
                            labelCol={{ span: 4 }}
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
                                        disabled: isEdit == '' ? true : false
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
                            labelCol={{ span: 3 }}
                            wrapperCol={{ span: 24 }}
                            rules={[{ required: true, message: 'Please input Name!' }]}
                        >
                            <Input disabled={isEdit == 'Schema' || isEdit == 'dataimport'} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Directed"
                            name="directed"
                            tooltip='Directed Graph or Undirected Graph'
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 24 }}
                            rules={[{ required: true, message: 'Please input Directed!' }]}
                        >
                            <Switch disabled={isEdit == 'Schema' || isEdit == 'dataimport'} />
                        </Form.Item>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default CreateGraph;