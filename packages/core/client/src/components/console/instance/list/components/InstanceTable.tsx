import React, { useEffect, useState, useRef } from "react";
import { Table, Button, Dropdown, Popconfirm, message, Space } from "antd";
import { EllipsisOutlined, PlusOutlined } from "@ant-design/icons";
import type { ActionType } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { getInstanceAllList, getInstanceListByDomainCode, deleteInstance } from "../service";
import {
  AddInstanceModal,
  ApplyOwnerModal,
  AddOwnerModal,
} from "./InstanceModals";
import type { InstanceTableProps } from "../interface";
import styles from "../list.module.less";


const mockData = {
  creator: "wb-whq906489",
  creatorName: "",
  description: "111",
  domainCode: "test_123",
  domainName: "test_123",
  engineVersion: "0.9-relation-nray",
  gmtCreate: 1670393289000,
  gmtModified: 1670393289000,
  graphView: "g",
  graphViewName: "g",
  graphViewType: "g",
  id: "1600371566140448770",
  instanceName: "whq_123-1",
  modifier: "wb-whq906489",
  modifierName: "",
  owners: '["wb-whq906489"]',
}

export const InstanceTable: React.FC<InstanceTableProps> = ({ form, type, domainCode }) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isAddOwner, setIsAddInOwner] = useState<boolean>(false);
  const [isApplyOwner, setIsApplyOwner] = useState<boolean>(false);
  const [itemData, setItemData] = useState(null);
  const [instanceData, setInstanceData] = useState({
    list: [],
    // 用于前端筛选
    originList: []
  });
  const actionRef = useRef<ActionType>();

  const getInstanceList = async () => {
    let result = null
    if (type === 'all') {
      result = await getInstanceAllList();

    } else if (type === 'admin') {
      result = await getInstanceListByDomainCode(domainCode);
    }
    console.log('instance result', result)
    setInstanceData({
      list: result,
      originList: result
    })
  }

  const handleDelete = async (record: any) => {
    setItemData(record);
    const result = await deleteInstance(record.id)
    if (result) {
      message.success('删除实例成功')
      getInstanceList()
    }
  }

  const batchDelete = (evt) => {
    console.log(evt)
  }

  const showCreateModal = () => {
    setIsEdit(true)
    setItemData(null)
  }

  useEffect(() => {
    getInstanceList();
  }, [type]);

  const columns = [
    {
      title: "实例名称",
      dataIndex: "instanceName",
      key: "instanceName",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "引擎版本",
      dataIndex: "engineVersion",
      key: "engineVersion",
    },
    {
      title: "创建人",
      dataIndex: "creator",
      key: "creator",
    },
    {
      title: "Owner",
      dataIndex: "owners",
      key: "owners",
      hideInSearch: true,
      render: (text) => JSON.parse(text).join(',')
    },
    {
      title: "创建时间",
      dataIndex: "gmtCreate",
      key: "gmtCreate",
      hideInSearch: true
    },
    {
      title: "描述",
      dataIndex: "description",
      key: "description",
      hideInSearch: true
    },

    {
      title: "操作",
      key: "action",
      hideInSearch: true,
      render: (_, record) => (
        <div className={styles["example-action"]}>
          <a
            onClick={() => {
              setIsEdit(true);
              setItemData(record);
            }}
          >
            编辑
          </a>
          <Popconfirm 
            title='确认删除该实例？该操作也将删除实例中的所有GraphView。' 
            onConfirm={() => handleDelete(record)}
            okText='确定'
            cancelText='取消'>
            <a>
              删除
            </a>
          </Popconfirm>

          <Dropdown
            trigger={["click"]}
            menu={{
              items: [
                {
                  key: "1",
                  label: (
                    <Button
                      type="link"
                      onClick={() => {
                        setIsApplyOwner(true);
                        setItemData(record);
                      }}
                    >
                      申请owner
                    </Button>
                  ),
                },
                {
                  key: "3",
                  label: (
                    <Button
                      type="link"
                      onClick={() => {
                        setIsAddInOwner(true);
                        setItemData(record);
                      }}
                    >
                      添加owner
                    </Button>
                  ),
                },
              ],
            }}
          >
            <EllipsisOutlined />
          </Dropdown>
        </div>
      ),
    },
  ];
  return (
    <div className={styles["example-table"]}>
      <ProTable
        columns={columns}
        actionRef={actionRef}
        cardBordered
        dataSource={instanceData.list}
        request={(params, sorter, filter) => {
          // 点击查询按钮，会执行到这里
          console.log(params, sorter, filter)
          const { engineVersion, instanceName, creator } = params
          const list = instanceData.originList.filter((d: any) => {
            return d.engineVersion.includes(engineVersion) || d.instanceName.includes(instanceName) || d.creator.includes(creator)
          })
          setInstanceData({
            ...instanceData,
            list
          })
          // console.log(list)
        }}
        editable={{
          type: 'multiple',
        }}
        rowSelection={{
          // 自定义选择项参考: https://ant.design/components/table-cn/#components-table-demo-row-selection-custom
          // 注释该行则默认不显示下拉选项
          selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
          defaultSelectedRowKeys: [],
        }}
        tableAlertRender={({ selectedRowKeys, selectedRows, onCleanSelected }) => (
          <Space size={24}>
            <span>
              已选 {selectedRowKeys.length} 项
              <a style={{ marginInlineStart: 8 }} onClick={onCleanSelected}>
                取消选择
              </a>
            </span>
          </Space>
        )}
        tableAlertOptionRender={(evt) => {
          return (
            <Space size={16}>
              <Popconfirm
                title="确定删除选中的记录?"
                onConfirm={() => batchDelete(evt)}
                okText="删除"
                cancelText="取消"
              >
                <a href="#">批量删除</a>
              </Popconfirm>
            </Space>
          );
        }}
        rowKey="key"
        search={{
          labelWidth: 'auto',
        }}
        options={false}
        pagination={{
          pageSize: 10,
          onChange: (page) => console.log(page),
        }}
        dateFormatter="string"
        headerTitle="实例列表"
        toolBarRender={() => [
          <Button key="button" icon={<PlusOutlined />} type="primary" onClick={showCreateModal}>
            新建
          </Button>
        ]}
      />

      {/* 编辑 */}
      <AddInstanceModal
        setIsAddInstance={setIsEdit}
        isAddInstance={isEdit}
        itemtData={itemData}
        form={form}
        updateList={getInstanceList}
      />
      {/* 申请owner */}
      <ApplyOwnerModal
        setIsApplyOwner={setIsApplyOwner}
        isApplyOwner={isApplyOwner}
      />
      {/* 添加owner */}
      <AddOwnerModal
        setIsAddInOwner={setIsAddInOwner}
        isAddOwner={isAddOwner}
      />
    </div>
  );
};
