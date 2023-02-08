import React from 'react';
import { Button, Row, Col, Form, Select, Space, Popconfirm, message, DatePicker } from 'antd';
import type { DatePickerProps } from 'antd';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import './index.less'
interface TableListItem {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
}
const Jobs: React.FC = () => {
    const [form] = Form.useForm();
    const data = [
        {
            key: '1',
            name: 'job-grape_dev-yuansi-tes-192815-2022.10.28.05.26.24',
            age: 'Data Import',
            address: 'Succeed',
            tags: 'ingest',
        },
        {
            key: '2',
            name: 'job-grape_dev-yuansi-tes-192815-2022.10.28.05.26.24',
            age: 'Query',
            address: 'Cancelled',
            tags: '2022.11.27 14:00:00',
        },
        {
            key: '3',
            name: 'job-grape_dev-yuansi-tes-192815-2022.10.28.05.26.24',
            age: 'Analysis',
            address: 'Failed',
            tags: '2022.11.30 14:00:00 repeat every day',
        },
        {
            key: '4',
            name: 'job-grape_dev-yuansi-tes-192815-2022.10.28.05.26.24',
            age: 'Data Import',
            address: 'Running',
            tags: 'ingest',
        },
        {
            key: '5',
            name: 'job-grape_dev-yuansi-tes-192815-2022.10.28.05.26.24',
            age: 'Query',
            address: 'Cancelled',
            tags: '2022.11.27 14:00:00',
        },
        {
            key: '6',
            name: 'job-grape_dev-yuansi-tes-192815-2022.10.28.05.26.24',
            age: 'Analysis',
            address: 'Failed',
            tags: '2022.11.30 14:00:00 repeat every day',
        },
        {
            key: '7',
            name: 'job-grape_dev-yuansi-tes-192815-2022.10.28.05.26.24',
            age: 'Data Import',
            address: 'Running',
            tags: 'ingest',
        },
        {
            key: '8',
            name: 'job-grape_dev-yuansi-tes-192815-2022.10.28.05.26.24',
            age: 'Query',
            address: 'Cancelled',
            tags: '2022.11.27 14:00:00',
        },
        {
            key: '9',
            name: 'job-grape_dev-yuansi-tes-192815-2022.10.28.05.26.24',
            age: 'Analysis',
            address: 'Failed',
            tags: '2022.11.30 14:00:00 repeat every day',
        },
        {
            key: '10',
            name: 'job-grape_dev-yuansi-tes-192815-2022.10.28.05.26.24',
            age: 'Data Import',
            address: 'Running',
            tags: 'ingest',
        },
        {
            key: '11',
            name: 'job-grape_dev-yuansi-tes-192815-2022.10.28.05.26.24',
            age: 'Query',
            address: 'Cancelled',
            tags: '2022.11.27 14:00:00',
        },
        {
            key: '12',
            name: 'job-grape_dev-yuansi-tes-192815-2022.10.28.05.26.24',
            age: 'Analysis',
            address: 'Succeed',
            tags: '2022.11.30 14:00:00 repeat every day',
        },
    ];
    const confirm = () => {
        message.info('Clicked on Yes.');
    };
    const columns: ProColumns<TableListItem>[] = [
        {
            title: 'JobID',
            dataIndex: 'name',
            key: 'name',
            sorter: true,
        },
        {
            title: 'Job Type',
            dataIndex: 'age',
            key: 'age',
            sorter: true,
        },
        {
            title: 'Progress',
            dataIndex: 'address',
            key: 'address',
            sorter: true,
            render: (record) => {
                return (
                    <>
                        {
                            record == 'Running' ? <span style={{ color: '#1650FF' }}>{record}</span> : (record == 'Cancelled' ? <span style={{ color: 'rgba(106,107,113,1)' }}>{record}</span> : (
                                record == 'Succeed' ? <span style={{ color: '#2BCC62' }}>{record}</span> : (record == 'Schedule' ? <span style={{ color: '#00000' }}>{record}</span> : (record == 'Failed' ? <span style={{ color: 'red' }}>{record}</span> : null))
                            ))
                        }
                    </>
                )
            }
        },
        {
            title: 'Schedule',
            key: 'tags',
            dataIndex: 'tags',
        },
        {
            title: 'Actions',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a style={{ color: '#1650FF' }}>Detail</a>
                    <a style={{ color: '#1650FF' }}>View Log</a>
                    <Popconfirm
                        placement="bottomRight"
                        title='Sure to cancel ?'
                        onConfirm={confirm}
                        okText="Ok"
                        cancelText="cancel"
                        icon
                    >
                        <a style={{ color: '#1650FF' }}>Cancel</a>
                    </Popconfirm>
                </Space>
            ),
        },
    ];
    const formTable = () => {
        const onFinish = (values: any) => {
            console.log('Received values of form: ', values);
        };
        const onChange: DatePickerProps['onChange'] = (date, dateString) => {
            console.log(date, dateString);
        };
        const options = [
            { value: 'All', label: 'All' },
            { value: 'Running', label: 'Running' },
            { value: 'Cancelled', label: 'Cancelled' },
            { value: 'Failed', label: 'Failed' },
            { value: 'Succeed', label: 'Succeed' },
            { value: 'Schedule', label: 'Schedule' }]
        return (
            <Form
                onFinish={onFinish}
                labelCol={{ flex: '90px' }}
                labelAlign="right"
                wrapperCol={{ flex: 1 }}
                form={form}
            >
                <Row>
                    <Col span={8}>
                        <Form.Item
                            label="Label"
                            name="Lable"
                            rules={[{ required: true, message: 'Please input Lable!' }]}
                        >
                            <Select
                                // defaultValue="All"
                                options={options}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label="Type"
                            name="Type"
                            rules={[{ required: true, message: 'Please input Type!' }]}
                        >
                            <Select
                                // defaultValue="All"
                                options={options}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label="Job Status"
                            name="JobStatus"
                            rules={[{ required: true, message: 'Please input Job Status!' }]}
                        >
                            <Select
                                // defaultValue="All"
                                options={options}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <Form.Item
                            label="Start Date"
                            name="StartDate"
                            rules={[{ required: true, message: 'Please input Start Date!' }]}
                        >
                            <DatePicker onChange={onChange} style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label="End Date"
                            name="EndDate"
                            rules={[{ required: true, message: 'Please input End Date!' }]}
                        >
                            <DatePicker onChange={onChange} style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <div style={{ textAlign: 'right' }}>
                            <Space>
                                <Button style={{
                                    width: '135px',
                                    borderRadius: '6px'
                                }} onClick={() => form.resetFields()}>Reset </Button>
                                <Button className='btn'>Search </Button>
                            </Space>
                        </div>
                    </Col>
                </Row>
            </Form>
        )
    }
    return (
        <>
            <div className='job_list'>
                <div className='top_content'>
                    <Row>
                        <Col span={24}>
                            <h2 className='job_list_title'>Job List</h2>
                        </Col>
                    </Row>
                </div>
                <div className='bottom_content'>
                    {formTable()}
                </div>
            </div>
            <div className='job_list job_list_table'>
                <ProTable
                    columns={columns}
                    headerTitle={false}
                    search={false}
                    options={false}
                    dataSource={data}
                    size='middle'
                    pagination={{
                        defaultCurrent: 1,
                        defaultPageSize: 5,
                        showTotal: undefined,
                        showSizeChanger: false,
                    }}
                />
            </div>
        </>

    );
};
export default Jobs;