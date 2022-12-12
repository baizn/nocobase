import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import type { ProColumns, ActionType } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Popconfirm, Space, Tag, DatePicker, Table, Tooltip, message } from 'antd';
import React, { useRef, useState, useEffect } from 'react';
import { CreateDomain } from '../create'
import ApplyDomain from './applyDomain'
import DomainUserList from './domainUserList'
import { getDomainList, createDomain, getDomainAdminList, getDomainUserList, applyJoinDomain, deleteDomainByCode } from './service'
const { RangePicker } = DatePicker;

export type DomainListItem = {
  creator: string;
  modifier: string;
  gmtCreate: string;
  gmtModified: string;
  formatGmtCreate: string;
  formatGmtModified: string;
  id: number;
  domainName: string;
  domainCode: string;
  owners: string;
  fromApp: string;
  domainConfig: string;
  creatorName: string;
  modifierName: string;
};

export const DomainList = () => {
  const actionRef = useRef<ActionType>();

  const [state, setState] = useState<{
    allDomainList: DomainListItem[];
    domainList: DomainListItem[];
    applyVisible: boolean;
    applyType: 'user' | 'admin';
    createVisible: boolean;
    listVisible: boolean;
    currentRecord: DomainListItem | null;
    queryType: 'user' | 'admin'
  }>({
    allDomainList: [],
    domainList: [],
    applyVisible: false,
    applyType: 'user',
    createVisible: false,
    listVisible: false,
    queryType: 'user',
    currentRecord: null
  })

  // 查询域列表
  const queryDomainList = async () => {
    const result = await getDomainList()
    const domainList = result.map((d: any) => {
      return {
        key: d.id,
        ...d
      }
    })

    domainList.sort((a: DomainListItem, b: DomainListItem) => {
      return parseInt(a.gmtCreate, 10) - parseInt(b.gmtCreate, 10) > 0 ? -1 : 1
    })
    setState({
      ...state,
      createVisible: false,
      domainList,
      allDomainList: domainList
    })
  }

  useEffect(() => {
    queryDomainList()
  }, [])

  const showApplyModal = (record: any, type: 'user' | 'admin') => {
    setState({
      ...state,
      currentRecord: record,
      applyVisible: true,
      applyType: type
    })
  }

  const hiddleApplyModal = () => {
    setState({
      ...state,
      applyVisible: false,
    })
  }

  const showListModal = (record: DomainListItem, type: 'user' | 'admin') => {
    setState({
      ...state,
      currentRecord: record,
      listVisible: true,
      queryType: type
    })
  }

  const hiddleListModal = () => {
    setState({
      ...state,
      listVisible: false,
    })
  }

  const deleteRecord = async (record: DomainListItem) => {
    const result = await deleteDomainByCode(record.domainCode)
    if (result) {
      message.success('删除成功')
      queryDomainList()
    }
  }

  const actionOperation = (key: any, record: any) => {
    console.log(key, record)
    if (key === 'administrator') {
      // 申请管理员
      showApplyModal(record, 'admin')
    } else if (key === 'getAdmin') {
      showListModal(record, 'admin')
    } else if (key === 'getUser') {
      showListModal(record, 'user')
    }
  }

  const handleCreate = async (params: any) => {
    const result = await createDomain(params)
    
    if (result) {
      message.success('新建域成功')
      await queryDomainList()
    }
  }

  const showCreateModal = () => {
    setState({
      ...state,
      createVisible: true,
    })
  }

  const handleCloseCreateModal = () => {
    setState({
      ...state,
      createVisible: false,
    })
  }

  // 批量删除
  const batchDelete = (params: any) => {
    const { selectedRows } = params
    const deleteCodes = selectedRows.map(d => {
      return d.domainCode
    })
    
    // console.log(params, deleteCodes)
    const deletePromose = deleteCodes.map((d: string) =>{
      return deleteDomainByCode(d)
    })
    // console.log(deletePromose)
    Promise.all(deletePromose).then(values => {
      console.log(values)
      const failedList = values.filter(d => !d)
      if (failedList.length === 0) {
        // 全部删除成功
        message.success('批量删除成功')
      }
      queryDomainList()
    })
  }

  const columns: ProColumns<DomainListItem>[] = [
    {
      title: '域名称',
      width: 120,
      dataIndex: 'domainName',
      fixed: 'left',
      align: 'center',
      ellipsis: true,
      render: (text) => <Tooltip title={text}>{text}</Tooltip>,
    },
    {
      title: '域编码',
      width: 120,
      dataIndex: 'domainCode',
      align: 'center',
      // search: false,
      // sorter: (a, b) => a.containers - b.containers,
    },
    {
      title: '创建者',
      width: 120,
      align: 'center',
      dataIndex: 'creatorName',
    },
    {
      title: '修改时间',
      dataIndex: 'gmtModified',
      valueType: 'dateTime',
      align: 'center',
      width: 120,
      search: false
    },
    {
      title: '操作',
      width: 180,
      key: 'option',
      valueType: 'option',
      align: 'center',
      render: (text, record) => [
        <a key="join" onClick={() => showApplyModal(record, 'user')}>申请加入</a>,
        <Popconfirm
          title="确定删除该条记录?"
          onConfirm={() => deleteRecord(record)}
          // onCancel={cancel}
          okText="删除"
          cancelText="取消"
        >
          <a href="#">删除</a>
        </Popconfirm>,
        <TableDropdown
          key="actionGroup"
          onSelect={(e) => actionOperation(e, record)}
          menus={[
            { key: 'administrator', name: '申请管理员' },
            { key: 'getAdmin', name: '查看管理员' },
            { key: 'getUser', name: '查看用户' },
          ]}
        />,
      ],
    },
  ];  
  
  const { applyVisible, createVisible, applyType, currentRecord, listVisible, queryType } = state
  return (
    <>
      <ProTable
        columns={columns}
        actionRef={actionRef}
        cardBordered
        dataSource={state.domainList}
        request={(params, sorter, filter) => {
          // 点击查询按钮，会执行到这里
          console.log(params, sorter, filter)
          const { domainCode, domainName, creatorName } = params
          const list = state.allDomainList.filter(d => {
            return d.domainCode.includes(domainCode) || d.domainCode.includes(domainName) || d.creatorName.includes(creatorName)
          })
          setState({
            ...state,
            domainList: list
          })
          console.log(list)
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
        headerTitle="域列表"
        toolBarRender={() => [
          <Button key="button" icon={<PlusOutlined />} type="primary" onClick={showCreateModal}>
            新建
          </Button>
        ]}
      />
      <CreateDomain visible={createVisible} onCreate={handleCreate} onClose={handleCloseCreateModal} />
      {/* {
        currentRecord &&
      } */}
      <ApplyDomain visible={applyVisible} onClose={hiddleApplyModal} domainCode={currentRecord?.domainCode} type={applyType} />
      {
        currentRecord &&
        <DomainUserList visible={listVisible} onClose={hiddleListModal} record={currentRecord} type={queryType} />
      }
    </>
  );
};