import { Form, Input, message, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import type { SelectProps } from 'antd';
import { useEngineList } from '../useEngineList'
import type {
  AddInstanceProps,
  ApplyOwnerProps,
  AddOwnerProps,
} from "../interface";
import { autoCompleteUser, createInstance, updateInstance } from '../service'

const { TextArea } = Input;

export const AddInstanceModal: React.FC<AddInstanceProps> = ({
  isAddInstance,
  setIsAddInstance,
  itemtData,
  form,
  updateList
}) => {

  const domainCode = 'test_123'
  const [engineList] = useEngineList()
  const [loading, setLoading] = useState(false)


  const handleCreateInstance = async () => {
    const values = await form.validateFields()
    console.log(values)
    setLoading(true)
    const { instanceName, engineVersion, description } = values
    const createParams = {
      instanceName,
      engineVersion,
      description,
      domainCode
    }

    let result = null
    if (itemtData) {
      // 更新
      result = await updateInstance({
        id: itemtData.id,
        engineVersion,
        description,
      })
      if (result) {
        message.success('更新实例成功')
      }
    } else {
      result = await createInstance(createParams)
      if (result) {
        message.success('创建实例成功')
      }
    }
    setLoading(false)
    if (result) {
      setIsAddInstance(false);
      updateList()
    }
  }

  useEffect(() => {
    if (itemtData) {
      form.setFieldsValue(itemtData);
    }
    // 查询引擎版本列表
  }, [itemtData]);

  return (
    <Modal
      title={itemtData ? "编辑实例" : "新增实例"}
      open={isAddInstance}
      onOk={handleCreateInstance}
      onCancel={() => {
        setIsAddInstance(false);
        form.resetFields(["description", "engineVersion", "instanceName"]);
      }}
      confirmLoading={loading}
      okText="保存"
      cancelText="取消"
    >
      <p>所属业务域：{domainCode}</p>

      <Form.Item
        name="instanceName"
        label="实例名称"
        rules={[{ required: true, message: "请输入实例名称" }]}
      >
        <Input
          placeholder="请输入实例名称"
          disabled={!!itemtData}
        />
      </Form.Item>
      <Form.Item
        name="engineVersion"
        label="引擎版本"
        rules={[{ required: true, message: "请选择一个引擎版本" }]}
      >
        <Select
          showSearch
          placeholder="请选择一个引擎版本"
          filterOption={(input, option) =>
            (option?.label ?? "").includes(input)
          }
          options={engineList}
        />
      </Form.Item>
      <Form.Item
        name="description"
        label="描述"
        rules={[{ required: true, message: "请输入描述" }]}
      >
        <TextArea rows={4} />
      </Form.Item>
    </Modal>
  );
};

export const ApplyOwnerModal: React.FC<ApplyOwnerProps> = ({
  isApplyOwner,
  setIsApplyOwner
}) => {
  const domainCode = 'test_123'
  const [engineList] = useEngineList()

  return (
    <Modal
      title="申请owner"
      open={isApplyOwner}
      onOk={() => {
        setIsApplyOwner(false);
      }}
      onCancel={() => {
        setIsApplyOwner(false);
      }}
      okText="保存"
      cancelText="取消"
    >
      <p>所属业务域：{domainCode}</p>

      <Form.Item
        name="version"
        label="引擎版本"
        rules={[{ required: true, message: "请选择一个引擎版本" }]}
      >
        <Select
          showSearch
          placeholder="请选择一个引擎版本"
          filterOption={(input, option) =>
            (option?.label ?? "").includes(input)
          }
          options={engineList}
        />
      </Form.Item>
    </Modal>
  );
};

let timeout: ReturnType<typeof setTimeout> | null;
let currentValue: string;

const findUserByKeyword = async (keyword: string, fun: Function) => {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  currentValue = keyword;

  const fake = async () => {
    const result = await autoCompleteUser(currentValue)
    console.log(result)
    const userList = result.map(d => {
      return {
        value: d.account,
        text: <><span>{d.nickName}</span><span style={{ display: 'inline-block', marginLeft: 8, fontSize: 12, color: '#ccc' }}>{d.userName}/{d.account}</span></>
      }
    })
    fun(userList)
  }

  timeout = setTimeout(fake, 300);
}

export const AddOwnerModal: React.FC<AddOwnerProps> = ({
  isAddOwner,
  setIsAddInOwner,
}) => {
  const [data, setData] = useState<SelectProps['options']>([]);
  const [value, setValue] = useState<string>();

  const handleSearch = (newValue: string) => {
    if (newValue) {
      findUserByKeyword(newValue, setData);
    } else {
      setData([]);
    }
  };

  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  
  return (
    <Modal
      title="新增owner"
      open={isAddOwner}
      onOk={() => {
        setIsAddInOwner(false);
      }}
      onCancel={() => {
        setIsAddInOwner(false);
      }}
      okText="确认"
      cancelText="取消"
    >
      <p>所属业务域：</p>
      <Form.Item
        name="user"
        label=" 选择用户"
        rules={[{ required: true, message: "请选择用户" }]}
      >
        <Select
          showSearch
          value={value}
          placeholder='请选择用户'
          defaultActiveFirstOption={false}
          showArrow={false}
          filterOption={false}
          onSearch={handleSearch}
          onChange={handleChange}
          notFoundContent={null}
          options={(data || []).map(d => ({
            value: d.value,
            label: d.text,
          }))}
        />
      </Form.Item>
    </Modal>
  );
};

