import React, { useState, useEffect } from "react";
import { Drawer } from "antd";
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from "@ant-design/pro-components";
import {
  getDomainAdminList,
  getDomainUserList,
} from "./service";
import { DomainListItem } from './list';
import Tooltip from 'antd/es/tooltip';


export type TableListItem = {
  key: number;
  name: string;
  containers: number;
  creator: string;
  status: string;
  createdAt: number;
  memo: string;
};

interface DomainUserListProps {
  type: "user" | "admin";
  record: DomainListItem;
  visible: boolean;
  onClose: () => void;
}
const DomainUserList: React.FC<DomainUserListProps> = ({
  type,
  record,
  visible,
  onClose
}) => {
  const [state, setState] = useState({
    originUserList: [],
    userList: [],
  });

  const getAdminList = async (owners: string) => {
    const result = await getDomainAdminList(JSON.parse(owners))
    setState({
      ...state,
      originUserList: result,
      userList: result
    })
  }

  const getUserList = async (domainCode: string) => {
    const result = await getDomainUserList(domainCode)
    setState({
      ...state,
      originUserList: result,
      userList: result
    })
  }

  useEffect(() => {
    if (type === 'user') {
      getUserList(record.domainCode)
    } else if (type === 'admin') {
      getAdminList(record.owners)
    }
  }, [type, record.domainCode, record.owners])

  const { userList } = state
  const columns: ProColumns<TableListItem>[] = [
    {
      title: "账号",
      width: 100,
      dataIndex: "account",
      align: "center",
    },
    {
      title: "姓名",
      dataIndex: "userName",
      align: "center",
      width: 100,
    },
    {
      title: "花名",
      width: 80,
      dataIndex: "nickName",      
      align: "center",
    }
  ];

  if (type === 'admin') {
    columns.push({
      title: "域列表",
      width: 200,
      align: "center",
      ellipsis: true,
      dataIndex: "domainCodes",
      render: (text) => {
        return <Tooltip title={text}>
          {text}
        </Tooltip>
      }
    })
  }

  return (
    <Drawer
      title={type === "user" ? "域用户" : "域管理员"}
      visible={visible}
      onClose={onClose}
      mask={false}
      width='100%'
      footerStyle={{ textAlign: "right" }}
      contentWrapperStyle={{width: 700 }}
    >
      <ProTable<TableListItem>
        dataSource={userList}
        rowKey="key"
        request={(params): any => {
          // 点击查询按钮，会执行到这里
          const { keyword } = params
          const list = state.originUserList.filter((d: any) => {
            return d.account.includes(keyword) || d.nickName.includes(keyword) || d.userName.includes(keyword)
          })
          setState({
            ...state,
            userList: list
          })
        }}
        pagination={{
          showQuickJumper: true
        }}
        options={{
          search: true,
          reload: false,
          setting: false,
          fullScreen: false,
          density: false
        }}
        columns={columns}
        search={false}
        dateFormatter="string"
        headerTitle={type === 'admin' ? '域管理员列表' : '域用户列表'}
      />
    </Drawer>
  );
};

export default DomainUserList;
