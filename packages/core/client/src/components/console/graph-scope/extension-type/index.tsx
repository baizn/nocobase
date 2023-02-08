import React from "react";
import { Row, Col, Button, Input, Space, Popconfirm } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import './index.less'

const { Search } = Input;
interface TableListItem {
    key: string;
    name: string;
    filename: string;
    type: string;
}
const ExtensionType = () => {
    const onSearch = (value: string) => console.log(value);
    const data = [
        {
            key: '1',
            name: 'sssp',
            filename: 'sssp.gar',
            type: 'CPP_PIE',
        },
        {
            key: '2',
            name: 'pagerank',
            filename: 'demo.gar',
            type: 'PYTHON_PREGEL',
        },
        {
            key: '3',
            name: 'louvain',
            filename: 'my_algorithm.gar',
            type: 'PYTHON_PIE',
        },
        {
            key: '4',
            name: 'lpa',
            filename: 'lpa.gar',
            type: 'JAVA_PREGEL',
        },
    ];
    const columns: ProColumns<TableListItem>[] = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: true,
        },
        {
            title: 'FileName',
            dataIndex: 'filename',
            key: 'filename',
            sorter: true,
        },
        {
            title: 'Type',
            key: 'type',
            dataIndex: 'type',
        },
        {
            title: 'Actions',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a style={{ color: '#1650FF' }}>Edit  </a>
                    <a style={{ color: '#1650FF' }}>Detail</a>
                    <a style={{ color: '#1650FF' }}>Download</a>
                    <Popconfirm
                        placement="bottomRight"
                        title='Sure to cancel ?'
                        okText="Ok"
                        cancelText="cancel"
                        icon
                    >
                        <a style={{ color: '#1650FF' }}>Delete</a>
                    </Popconfirm>
                </Space>
            ),
        },
    ];
    return (
        <div className='extensions_list'>
            <Row>
                <Col span={24}>
                    <div className="title_">
                        <h2 className='extensions_list_title'>Extensions</h2>
                            <Space>
                                <Search placeholder="input search text" onSearch={onSearch} style={{ width: 300 }} />
                                <Button style={{ backgroundColor: '#1650FF'}} type="primary" icon={<PlusOutlined />} >Create</Button>
                                <Button style={{ backgroundColor: '#1650FF'}} type="primary" icon={<PlusOutlined />} >Upload</Button>
                            </Space>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <ProTable
                        columns={columns}
                        headerTitle={false}
                        search={false}
                        options={false}
                        dataSource={data}
                        pagination={{
                            defaultCurrent: 1,
                            defaultPageSize: 5,
                            showTotal: undefined,
                            showSizeChanger: false,
                        }}
                    />
                </Col>
            </Row>
        </div>
    )
}
export default ExtensionType