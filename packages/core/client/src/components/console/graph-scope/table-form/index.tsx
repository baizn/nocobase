import React, { useEffect, useState } from "react";
import { Col, Row, Space, Modal, Select, Tag, Button } from 'antd';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { history } from "umi";
import Tools from '@/components/console/graph-scope/Tools'
import './index.less'

export type TableListItem = {
  key: string;
  name: string;
  type: string;
  address: string;
  width: string;
};

const TableForm = (props: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    let data = []
    var arr1 = new Array(20);
    for (var i = 1; i < arr1.length; i++) {
      data.push({
        key: i,
        name: `g${i}`,
        type: 'GrootGraph',
        address: 'Schema',
        createdtime: '2023-01-05'
      })
    }
    data.push({
      key: '26',
      name: 'g26',
      type: 'ArrowGraph',
      address: 'Schema',
      createdtime: '2023-01-05'
    },
      {
        key: '27',
        name: 'g27',
        type: 'ArrowGraph',
        address: 'Data Import',
        createdtime: '2023-01-06'
      },
      {
        key: '28',
        name: 'g28',
        type: 'ArrowGraph',
        address: 'Schema',
        createdtime: '2023-01-05'
      },
      {
        key: '29',
        name: 'g29',
        type: 'ArrowGraph',
        address: 'Data Import',
        createdtime: '2023-01-06'
      },
      {
        key: '30',
        name: 'g30',
        type: 'ArrowGraph',
        address: 'Schema',
        createdtime: '2023-01-05'
      })
    setDataSource(data)
  }, [])
  const columns: ProColumns<TableListItem>[] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: true,
      width: '10%'
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      sorter: true,
      width: '10%'
    },
    {
      title: 'Created Time',
      dataIndex: 'createdtime',
      key: 'createdtime',
      sorter: true,
      width: '15%'
    },
    {
      title: 'Schema and Data Import',
      key: 'address',
      width: '15%',
      render: (record: any) => {
        return (
          <Space>
            <Button size='small' style={{ color: '#1650FF' }} onClick={() => junpInstance(record, 'Schema')}>Schema</Button>
            {
              record.type == 'ArrowGraph' ? null : <Button size='small' style={{ color: '#1650FF' }} onClick={() => junpInstance(record, 'dataimport')}>Data Import</Button>
            }
          </Space>
        )
      }
    },
    {
      title: 'Tools',
      dataIndex: 'tools',
      key: 'tools',
      width: '30%',
      render: () => {
        return (
          <Tools />
        )
      }
    },
    {
      title: 'Actions',
      key: 'action',
      width: '20%',
      render: (_, record) => (
        <Button danger size='small' onClick={() => {
          setDataSource(dataSource.filter((item) => item.name !== record.name));
        }}>Delete</Button>
      ),
    },
  ];

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const junpInstance = (record: { name: string; type: string;}, name: string) => {
    localStorage.setItem('name', name)
    localStorage.setItem('label', record.name)
    localStorage.setItem('labelType', record.type)
    history.push('/createschema')
  }
  return (
    <div >
      <Row>
        <Col span={24}>
          <ProTable
            style={{ marginTop: '8px' }}
            columns={columns}
            headerTitle={false}
            search={false}
            options={false}
            dataSource={dataSource}
            size='middle'
            pagination={{
              defaultCurrent: 1,
              defaultPageSize: 10,
              showTotal: undefined,
              showSizeChanger: false,
            }}
          />
        </Col>
      </Row>
      <Modal title="Choose a Graph Type" open={isModalOpen} onOk={() => history.push('/creategraph')} onCancel={handleCancel} okText='Create'>
        <Select
          defaultValue="ArrowGraph"
          style={{ width: 279 }}
          options={[
            {
              value: 'ArrowGraph',
              label: 'ArrowGraph',
            },
            {
              value: 'GrootGraph',
              label: 'GrootGraph',
            }
          ]}
        />
      </Modal>
    </div>
  )
};

export default TableForm;