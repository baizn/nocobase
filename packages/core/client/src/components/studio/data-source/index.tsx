import React, { useEffect, useState } from 'react'
import { Form, Input, Button, Space, Select, Switch, Table, InputNumber, Popconfirm, Checkbox, Row, Col, message } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import './index.less'
const DataSource = (props: { onClose: () => void; }) => {
    const [form] = Form.useForm()
    const [extraParametes, setExtraParametes] = useState(false)
    const [propertie, setPropertie] = useState(true)
    const onFinish = (type) => {
        form.validateFields().then((value) => {
            console.log(value);
            if (type == 'ImportNow') {
                props.onClose()
                form.resetFields()
                message.info('Submit job successfully !')
            } else if(type == 'Save'){
                localStorage.setItem('location', value?.location)
                message.info('Submit successfully !')
                props.onClose()
                form.resetFields()

            }
        })

    }
    const Option = [{
        value: 'gold', label: 'gold'
    }]
    let tableData = [
        {
            key: '1',
            name: 'person',
            type: 'LONG',
            source: '',
            primarykey: true
        },
        {
            key: '2',
            name: 'animal',
            type: 'STR',
            source: '',
            primarykey: true
        },
        {
            key: '3',
            name: 'Monkey',
            type: 'DOUBLE',
            source: null,
            primarykey: false
        },
    ]
    useEffect(() => {
        form.setFieldsValue({
            table: tableData,
            extraparametes: false,
            mapproperties: true
        })
        propertieChange(true)
    }, [])
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: '30%'
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            width: '30%'
        },
        {
            title: 'Primary Key',
            dataIndex: 'primarykey',
            key: 'primarykey',
            width: '10%',
            render: (record: boolean | undefined) => {
                return (
                    <Checkbox checked={record} disabled={true} />
                )
            }
        },
        {
            title: 'Column Index(Name)',
            dataIndex: 'source',
            key: 'source',
            width: '20%',
            render: (_text: any, _record: any, index: string | number) => {
                return (
                    <Form.Item name={['table', index, 'source']} rules={[
                        {
                            required: true,
                            message: 'Please input your ODPS',
                        },
                    ]}>
                        <InputNumber min={0} style={{ width: '150px' }} />
                    </Form.Item>
                )
            }
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            width: '30%',
            render: (record: { key: React.Key }) =>
                <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
                    <a style={{ color: '#1650FF' }}>Delete</a>
                </Popconfirm>

        }
    ]
    const handleDelete = (key: React.Key) => {
        let data = tableData.filter((item) => item.key !== key);
        form.setFieldsValue({
            table: data
        })
    };
    const parameteChange = (_e: boolean) => {
        setExtraParametes(_e)
    }
    const propertieChange = (_e: boolean) => {
        setPropertie(_e)
    }
    return (
        <div>
            <Form className='table-edit-form' form={form} onFinish={onFinish} initialValues={{
                tableForm: [{}]
            }}
                labelCol={{ flex: '185px' }}
                labelAlign="right"
                wrapperCol={{ flex: 1 }}>
                <Row>
                    <Col span={24}>
                        <Form.Item
                            label='Label'
                            name="label"
                            rules={[{ required: true, message: 'Please input your Label!' }]}
                            tooltip='label'
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item
                            label='Data Source'
                            name="sourceLabel"
                            rules={[{ required: true, message: 'Please input your Source Label!' }]}
                            tooltip='Source Label'
                        >
                            <Select
                                allowClear
                                options={Option}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item
                            label='Location'
                            name="location"
                            rules={[{ required: true, message: 'Please input your Location!' }]}
                            tooltip='Location'
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item
                            label='Header Row'
                            name="headerrow"
                            rules={[{ required: true, message: 'Please input your Header Row!' }]}
                            tooltip='Header Row'
                        >
                            <Select
                                allowClear
                                options={Option}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item
                            label='Delimiter'
                            name="delimiter"
                            rules={[{ required: true, message: 'Please input your Delimiter!' }]}
                            tooltip='Delimiter'
                        >
                            <Select
                                allowClear
                                options={Option}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item
                            label='Extra Parametes'
                            name="extraparametes"
                            rules={[{ required: true, message: 'Please input your Extra Parametes!' }]}
                            tooltip='Extra Parametes'
                        >
                            <Switch onChange={(e) => parameteChange(e)} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        {
                            extraParametes ? <Form.Item
                                label=' '
                                colon={false}
                            >
                                <Form.List name="users">
                                    {(fields, { add, remove }) => (
                                        <>
                                            {fields.map(({ key, name, ...restField }) => (
                                                <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'key']}
                                                        rules={[{ required: true, message: 'Missing key name' }]}
                                                    >
                                                        <Input placeholder="key Name" />
                                                    </Form.Item>
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'value']}
                                                        rules={[{ required: true, message: 'Missing value name' }]}
                                                    >
                                                        <Input placeholder="value Name" />
                                                    </Form.Item>
                                                    <MinusCircleOutlined onClick={() => remove(name)} />
                                                </Space>
                                            ))}
                                            <Form.Item>
                                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                                    Add Parameter
                                                </Button>
                                            </Form.Item>
                                        </>
                                    )}
                                </Form.List>
                            </Form.Item> : null
                        }


                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item
                            label='Mapping all Properties'
                            name="mapproperties"
                            rules={[{ required: true, message: 'Please input your Source Label!' }]}
                            tooltip='Source Label'
                        >
                            <Switch defaultChecked onChange={(e) => propertieChange(e)} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        {
                            propertie ?
                                <Form.Item
                                    label=' '
                                    name="table"
                                    valuePropName="dataSource"
                                    colon={false}
                                >
                                    <Table bordered columns={columns} pagination={false} />
                                </Form.Item> : null
                        }
                    </Col>
                </Row>
                <div style={{ textAlign: 'center' }}>
                    <Space>
                        <Button onClick={() => onFinish('ImportNow')} type='primary' style={{ backgroundColor: '#1650FF' }}>
                            Import Now
                        </Button>
                        <Button onClick={() => onFinish('Save')} type='primary' style={{ backgroundColor: '#1650FF' }}>
                            Save
                        </Button>
                    </Space>
                </div>
            </Form>
        </div>
    )
}
export default DataSource