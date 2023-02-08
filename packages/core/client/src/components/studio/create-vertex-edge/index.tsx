import React, { useImperativeHandle, forwardRef } from 'react'
import { Form, Input, Button, Table, Select, Checkbox, Tooltip, Row, Col } from 'antd'
import { PlusOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import './index.less'

const TableEditForm = (props: { getBasicInformation: (arg0: any) => void; }, ref: React.Ref<unknown> | undefined) => {
    const [form] = Form.useForm()
    useImperativeHandle(ref, () => ({
        changeVertexEdge: () => {
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
    const CheckboxComponent = (field: { value: boolean | undefined; onChange: (arg0: boolean) => void; }) => {
        console.log(field);
        return (
            <Checkbox
                defaultChecked={field.value}
                onChange={(e) => {
                    field.onChange(e.target.checked);
                }}
            />
        );
    };
    const title = (N: string, T: string) => {
        return (
            <div><span style={{ color: 'red', marginRight: '5px' }}>*</span><Tooltip title={T}><span style={{ marginRight: '5px' }}>{N}</span><QuestionCircleOutlined /></Tooltip></div>
        )
    }
    const getColumns = (remove: { (index: number | number[]): void; (arg0: any): void; }) => {
        return [
            {
                title: title('Name', 'Property Name'),
                dataIndex: 'name',
                width: '20%',
                render(text: any, field: { name: string | number; fieldKey: React.Key; }) {
                    return <Form.Item
                        rules={[{ required: true, message: 'Please input Name!' }]}
                        name={[field.name, 'name']}
                        fieldKey={[field.fieldKey, 'name']}
                    >
                        <Input placeholder='Please input Name!' allowClear style={{ width: '100%' }} />
                    </Form.Item>
                }
            },
            {
                title: title('Type', 'Property Type'),
                dataIndex: 'type',
                width: '25%',
                render(text: any, field: { name: string | number; fieldKey: React.Key; }) {
                    return <Form.Item
                        name={[field.name, 'type']}
                        fieldKey={[field.fieldKey, 'type']}
                        rules={[{ required: true, message: 'Please input Type!' }]}
                    >
                        <Select
                            style={{ width: '100%' }}
                            options={[
                                {
                                    value: 'long',
                                    label: 'LONG',
                                },
                                {
                                    value: 'double',
                                    label: 'DOUBLE',
                                },
                                {
                                    value: 'str',
                                    label: 'STRING',
                                }
                            ]}
                        />
                    </Form.Item>
                }
            },
            {
                title: title('Primary Key', 'Only one property can be used as the primary key'),
                dataIndex: 'primaryKey',
                width: '15%',
                render(text: any, field: { name: string | number; fieldKey: React.Key; }) {
                    return <Form.Item
                        rules={[{ required: false, message: '请输入主键' }]}
                        name={[field.name, 'primaryKey']}
                        fieldKey={[field.fieldKey, 'primaryKey']}
                    >
                        <CheckboxComponent field={field} />
                    </Form.Item>
                }
            },
            {
                title: 'Comment',
                dataIndex: 'comments',
                width: '20%',
                render(text: any, field: { name: string | number; fieldKey: React.Key; }) {
                    return <Form.Item
                        name={[field.name, 'comments']}
                        fieldKey={[field.fieldKey, 'comments']}
                    >
                        <Input placeholder='请输入comments' allowClear style={{ width: '100%' }} />
                    </Form.Item>
                }
            },
            {
                title: 'Operation',
                dataIndex: 'operate',
                className: 'operate',
                width: '30%',
                render(text: any, field: { name: any; }) {
                    return (
                        <a style={{ position: 'absolute', top: '22px', color: '#1650FF' }} onClick={() => remove(field.name)} >Delete</a>
                    )
                }
            }
        ]
    }
    const Option = [{
        value: 'gold', label: 'gold'
    }]
    return (
        <>
            <Form className='table-edit-form' form={form} initialValues={{
                tableForm: [{}]
            }}
                layout="vertical"
            >
                <Row>
                    <Col span={12}>
                        <Form.Item
                            label='Label'
                            name="Label"
                            rules={[{ required: true, message: 'Please input Label!' }]}
                            tooltip={props.type == 'Vertex' ? 'Vertex Label' : 'Edge Label '}
                            wrapperCol={{ span: 23 }}
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    {
                        props.type !== 'Vertex' ?
                            (
                                <>
                                    <Col span={12}>
                                        <Form.Item
                                            label='Source Label'
                                            name="SourceLabel"
                                            rules={[{ required: true, message: 'Please input Source Label!' }]}
                                            tooltip='Source Vertex Label'
                                        >
                                            <Select
                                                placeholder="Select a option and change input text above"
                                                allowClear
                                                options={Option}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            label='Destination Label'
                                            name="DestinationLabel"
                                            rules={[{ required: true, message: 'Please input Destination Label!' }]}
                                            tooltip='Destination Vertex Label'
                                            wrapperCol={{ span: 23 }}
                                        >
                                            <Select
                                                placeholder="Select a option and change input text above"
                                                allowClear
                                                options={Option}
                                            />
                                        </Form.Item>
                                    </Col>
                                </>
                            ) : null
                    }
                </Row>
                <Form.Item
                    tooltip={props.type == 'Vertex' ? 'Vertex Properties' : 'Edge Properties'}
                    label={<div><svg width="16px" height="16.00px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#f84f32" d="M534.869333 490.496a1403.306667 1403.306667 0 0 0 50.858667-25.813333c16.042667-8.618667 29.013333-15.061333 38.570667-19.029334 9.557333-3.925333 17.066667-6.058667 22.869333-6.058666 9.557333 0 17.749333 3.2 24.917333 10.026666 6.826667 6.826667 10.581333 15.061333 10.581334 25.088 0 5.76-1.706667 11.818667-5.12 17.92-3.413333 6.101333-7.168 10.069333-10.922667 11.861334-35.157333 14.677333-74.410667 25.429333-116.736 31.872 7.850667 7.168 17.066667 17.237333 28.330667 29.781333 11.264 12.544 17.066667 18.986667 17.749333 20.053333 4.096 6.101333 9.898667 13.653333 17.408 22.613334 7.509333 8.96 12.629333 15.786667 15.36 20.778666 2.730667 5.034667 4.437333 11.093333 4.437333 18.304a33.706667 33.706667 0 0 1-9.898666 24.021334 33.834667 33.834667 0 0 1-25.6 10.410666c-10.24 0-22.186667-8.618667-35.157334-25.472-12.970667-16.512-30.037333-46.933333-50.517333-91.050666-20.821333 39.424-34.816 65.962667-41.642667 78.506666-7.168 12.544-13.994667 22.186667-20.48 28.672a30.976 30.976 0 0 1-22.528 9.685334 32.256 32.256 0 0 1-25.258666-11.093334 35.413333 35.413333 0 0 1-9.898667-23.68c0-7.893333 1.365333-13.653333 4.096-17.578666 25.258667-35.84 51.541333-67.413333 78.848-93.568a756.650667 756.650667 0 0 1-61.44-12.544 383.061333 383.061333 0 0 1-57.685333-20.48c-3.413333-1.749333-6.485333-5.717333-9.557334-11.818667a30.208 30.208 0 0 1-5.12-16.853333 32.426667 32.426667 0 0 1 10.581334-25.088 33.152 33.152 0 0 1 24.234666-10.026667c6.485333 0 14.677333 2.133333 24.576 6.101333 9.898667 4.266667 22.186667 10.026667 37.546667 18.261334 15.36 7.893333 32.426667 16.853333 51.882667 26.538666-3.413333-18.261333-6.485333-39.082667-8.874667-62.378666-2.389333-23.296-3.413333-39.424-3.413333-48.042667 0-10.752 3.072-19.712 9.557333-27.264A30.677333 30.677333 0 0 1 512.341333 341.333333c9.898667 0 18.090667 3.925333 24.576 11.477334 6.485333 7.893333 9.557333 17.92 9.557334 30.464 0 3.584-0.682667 10.410667-1.365334 20.48-0.682667 10.368-2.389333 22.570667-4.096 36.906666-2.048 14.677333-4.096 31.146667-6.144 49.834667z" /></svg>Properties</div>}
                >
                    <Form.List name='tableForm'>
                        {(fields, { add, remove }) => {
                            // 将Table视为 Form.List 中循环的 Form.Item
                            return (
                                <>
                                    <Table
                                        dataSource={fields}
                                        columns={getColumns(remove)}
                                        rowKey='key'
                                        bordered
                                        pagination={false}
                                    />
                                    <Form.Item>
                                        <Button style={{ width: '100%' }} type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                            Add Property
                                        </Button>
                                    </Form.Item>
                                </>
                            )
                        }}

                    </Form.List>
                </Form.Item>
                {/* <div className='save_list'>

                    <Button style={{ marginRight: '20px', width: '135px', borderRadius: '6px' }} onClick={() => history.go(-1)}>
                        Cancel
                    </Button>

                    <Button htmlType='submit' type='primary' style={{ backgroundColor: '#1650FF', width: '135px', borderRadius: '6px' }}>
                        Create
                    </Button>
                </div> */}
            </Form>
        </>
    )
}
export default forwardRef(TableEditForm)