import React, { useState } from 'react'
import { Card, Tooltip, Tag, Switch, Spin, message } from 'antd'
import { EditOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { componentToPlugin, updatePluginFiled } from './service'
import { ILoadedPlugin } from './Marketplace';
import PluginModal from './PluginModal'
const { Meta } = Card;

export interface CardInfo {
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
	const [state, setState] = useState({
		used: loadedPluginList.map(d => d.name).includes(infos.name),
		loading: false,
		visible: false,
		options: []
	})

	const { used, loading } = state
	const handleUsePlugin = async (componentName: string, pname: string = packageName) => {		
		setState({
			...state,
			loading: true,
			visible: false
		})

		if (!componentName) {
			message.error('组件名称为空')
			return
		}
		const status = await componentToPlugin(componentName, pname)
		
		if (status.success) {
			// 安装成功以后，更新插件表
			const pluginName = componentName.replace(/\B([A-Z])/g, '-$1').toLowerCase()
			await updatePluginFiled(pluginName, {
				path: infos.path,
				packageName: pname
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
			{
				state.visible &&
				<PluginModal visible={state.visible} infos={infos} usePlugin={handleUsePlugin} cancel={handleCancel} packageName={packageName} />
			}
		</Spin>
	)
}

export default AssetCard
