import React, { useState } from 'react'
import { Card, Tooltip, Input, Tag, Switch, Spin, Modal, Row, Col, message } from 'antd'
import { EditOutlined, QuestionCircleOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { queryFileDetailInfo, componentToPlugin, updatePluginFiled } from './service'
import { ILoadedPlugin } from './Marketplace';
const { Meta } = Card;

interface CardInfo {
	name: string;
	version: string;
	path: string;
	avatar: string;
	// 预览图
	description: string;
}

interface IAssetCardProps {
	infos: CardInfo;
	loadedPluginList: ILoadedPlugin[];
	packageName?: string;
}

const AssetCard: React.FC<IAssetCardProps> = ({ infos, loadedPluginList, packageName }) => {
	const defaultComponentName = `${infos.name[0].toUpperCase()}${infos.name.substring(1)}`
	const [state, setState] = useState({
		used: loadedPluginList.map(d => d.name).includes(infos.name),
		loading: false,
		visible: false,
		componentName: defaultComponentName
	})
	const { used, loading } = state
	const handleUsePlugin = async () => {
		setState({
			...state,
			loading: true,
			visible: false
		})

		if (!state.componentName) {
			message.error('组件名称为空')
			return
		}
		const status = await componentToPlugin(state.componentName, packageName)
		
		if (status.success) {
			// 安装成功以后，更新插件表
			const pluginName = state.componentName.replace(/\B([A-Z])/g, '-$1').toLowerCase()
			await updatePluginFiled(pluginName, {
				path: infos.path,
				packageName
			})

			message.success('加载成功')

			// 安装成功
			setState({
				...state,
				used: true,
				loading: false,
				visible: false
			})
		}
	}

	const queryFileDetailInfoByPath = async () => {
		const result = await queryFileDetailInfo(infos.path + '/index.ts', 'master')
		console.log(result)
	}

	const handleCancel = () => {
		setState({
			...state,
			visible: false
		})
	}

	const handleChangeSwitch = (checked: boolean) => {
		setState({
			...state,
			visible: checked
		})
	}

	const handleComponentNameChange = (evt) => {
		setState({
			...state,
			componentName: evt.target.value
		})
	}

	return (
		<Spin tip='正在努力加载中，请稍等片刻……' spinning={loading}>
			<Card bordered={false}
				actions={[
					<Tooltip title='在线编辑资产，敬请期待……'>
						<EditOutlined key="edit" />
					</Tooltip>,
					!used ? 
					<Tooltip title='将远程组件加载到平台中使用'>
						<Switch
							checkedChildren={<CheckOutlined />}
							unCheckedChildren={<CloseOutlined />}
							checked={used}
							disabled={used}
							onChange={handleChangeSwitch}
						/>
					</Tooltip>
					:
					<Tooltip title='要卸载组件请到本地资产中卸载'>
						<Switch
								checkedChildren={<CheckOutlined />}
								unCheckedChildren={<CloseOutlined />}
								checked={used}
								disabled={used}
							/>
					</Tooltip>
				]}
				>
				<Meta
					title={
						<>
							{infos.name}
							<>{used && <Tag style={{ position: 'absolute', right: 80 }} color='green'>已加载</Tag>}</>
							<Tag style={{ position: 'absolute', right: 10 }} color='green'>1.0.0</Tag>
						</>
					}
					description={infos.description || infos.path}
				/>
			</Card>		
			<Modal title={<><QuestionCircleOutlined style={{ color: 'red', marginRight: 8 }} />加载组件</>} open={state.visible} onOk={handleUsePlugin} onCancel={handleCancel}>
				<Row>
					<Col>导出的组件的默认名称为：{defaultComponentName}，请确认是否正确。</Col>
					<Col span={24} style={{ margin: '16px 0' }}>如果不正确，请在下面的输入框中重新输入组件名称。</Col>
					<Col span={4}>组件名称：</Col>
					<Col span={20}><Input style={{ width: 350 }} placeholder="请输入组件名称，组件名称以大驼峰方式命名" onChange={handleComponentNameChange} /></Col>
				</Row>
			</Modal>
		</Spin>
	)
}

export default AssetCard
