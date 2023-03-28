import React, { useEffect, useRef, useState } from 'react'
import { Input, Alert, Modal, Row, Col, Select, Divider, Space, InputRef, Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import { queryFileDetailInfo } from './service'
import { CardInfo } from './AssetCard';

export interface IProps {
  infos: CardInfo;
  visible: boolean;
  packageName: string;
  usePlugin: (cname: string, pname: string) => void;
  cancel: () => void;
}

let index = 0
const PluginModal: React.FC<IProps> = ({ infos, usePlugin, cancel, visible, packageName }) => {
  const defaultComponentName = `${infos.name[0].toUpperCase()}${infos.name.substring(1)}`
	const [state, setState] = useState({
		componentName: defaultComponentName,
    customName: defaultComponentName,
		options: [],
    packageName
	})
	const inputRef = useRef<InputRef>(null);

	const { options, componentName, customName } = state

  const getComponentListByPath = async () => {
		const result = await queryFileDetailInfo(infos.path + '/index.ts', 'master')
		console.log(result)
		const reg = /(?<={).*?(?=})/g
		
		if (!result.success) {
			return []
		}
		const resp = result.data.match(reg)
		setState({
			...state,
			options: resp
		})
	}

  const handleCustomNameChange = (evt) => {
		setState({
			...state,
			customName: evt.target.value
		})
	}

  const handleChangePackageName = (evt) => {
		setState({
			...state,
			packageName: evt.target.value
		})
	}

  const addItem = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
		setState({
			...state,
			options: [...options, customName || `New item ${index++}`],
			customName: defaultComponentName
		})
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handleUsePlugin = () => {
    if (usePlugin) {
      usePlugin(componentName, state.packageName)
    }
  }

  const handleSelectChange = (value) => {
    console.log(value)
    setState({
			...state,
			componentName: value
		})
  }

	useEffect(() => {
		getComponentListByPath()
	}, [infos.path])

  return (
    <Modal title='加载组件' open={visible} onOk={handleUsePlugin} onCancel={cancel}>
      <Row>
        <Alert message="请确保包名称和组件名称的正确性，支持修改包名和组件名称" type="warning" showIcon />
      </Row>
      <Row style={{ margin: '24px 0' }}>
        <Col span={4}>包名称：</Col>
        <Col span={20}>
          <Input
            style={{ width: 300 }}
            placeholder="请输入组件名称，组件名称以大驼峰方式命名"
            ref={inputRef}
            value={state.packageName}
            onChange={handleChangePackageName}
          />
        </Col>
      </Row>
      <Row> 
        <Col span={4}>组件名称：</Col>
        <Col span={20}>
          <Select
            style={{ width: 300 }}
            placeholder="请选择正确的组件名称"
            value={componentName}
            onChange={handleSelectChange}
            dropdownRender={menu => (
              <>
                {menu}
                <Divider style={{ margin: '8px 0' }} />
                <Space style={{ padding: '0 8px 4px' }}>
                  <Input
                    placeholder="没有对应的组件，请输入组件名称，组件名称以大驼峰方式命名"
                    ref={inputRef}
                    value={customName}
                    onChange={handleCustomNameChange}
                  />
                  <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                    添加
                  </Button>
                </Space>
              </>
            )}
            options={options.map(item => ({ label: item.trim(), value: item.trim() }))}
          />
        </Col>
      </Row>
    </Modal>
  )
}

export default PluginModal
