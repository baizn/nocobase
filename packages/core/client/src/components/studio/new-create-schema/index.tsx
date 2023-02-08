import React, { useEffect, useState } from 'react';
import { Col, Row, Button, Tabs, Space, Form } from 'antd';
import type { TabsProps } from 'antd';
import GraphBasicInformation from '@/components/studio/NewGraphBasicInformation'
import CollapseVertexTemplate from '@/components/studio/NewCollapseVertexEdgeTemplate'

import './index.less'

const CreateSchema = () => {
    const [form] = Form.useForm();
    const isEdit = localStorage.getItem('name')
    const [titleArr, setTitleArr] = useState([])
    const deleteNode = (i) => {
        let data = form.getFieldsValue()
        console.log(data);
        form.setFieldsValue({
            sights: data.sights.filter((key, index) => index !== i)
        })
    }
    const items: TabsProps['items'] = [
        {
            key: '1',
            label: `Vertex`,
            children: (
                <div>
                    <Row>
                        <Col span={24}>
                            <CollapseVertexTemplate type='Vertex' deleteNode={deleteNode} titleArr={titleArr} />
                        </Col>
                    </Row>
                </div>
            ),
        },
        {
            key: '2',
            label: `Edge`,
            children: <div>
                <Row>
                    <Col span={24}>
                        <CollapseVertexTemplate type='Edge' deleteNode={deleteNode} titleArr={titleArr} />
                    </Col>
                </Row>
            </div>,
        }
    ];
    const tabChange = (val: string) => {
        val == '2' ? localStorage.setItem('type', 'Edge') : localStorage.setItem('type', 'Vertex')
    }
    useEffect(() => {
        localStorage.setItem('type', 'Vertex')
    })
    useEffect(() => {
        form.setFieldsValue({
            graphtype: 'ArrowGraph',
            directed: false
        })
    }, [])
    const onFinish = () => {
        form.validateFields().then(values => {
            setTitleArr(values.sights)
            console.log(values);
        })
    };

    const onValuesChange = (all) => {
        console.log(all.sights);
        // setTitleArr(all.sights)
    }
    return (
        <div style={{ minWidth: '1500px' }}>
            <Form
                name="dynamic_form_nest_item"
                form={form}
                layout="vertical"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 24 }}
                labelAlign='right'
                onFinish={onFinish}
                onValuesChange={(e, all) => onValuesChange(all)}
            >
                <div className='schema_information'>
                    <div className='top_content'>
                        <Row>
                            <Col span={24}>
                                <h2 className='schema_information_title'>Graph Information</h2>
                            </Col>
                        </Row>
                    </div>
                    <div className='top_content'>
                        <Row>
                            <Col span={24}>
                                <GraphBasicInformation />
                            </Col>
                        </Row>
                    </div>

                </div>
                <div className='schema_information schema_tabs'>
                    <Tabs
                        items={items}
                        onChange={tabChange}
                    />
                </div>
                {isEdit == '' ?
                    <div className='save_list'>
                        <Row>
                            <Col span={24}>
                                <Form.Item>
                                    <Space>
                                        <Button style={{ width: '135px' }}>Cancel</Button>
                                        <Button className='btn' type='primary' onClick={onFinish}>Create</Button>
                                    </Space>
                                </Form.Item>
                            </Col>
                        </Row>
                    </div> : null
                }
            </Form>
        </div>
    )
};

export default CreateSchema;
