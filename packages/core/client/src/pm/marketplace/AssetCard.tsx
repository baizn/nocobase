import React, { useEffect, useState } from 'react'
import { Card, Tooltip, Avatar, Tag, Switch, Popconfirm, Spin } from 'antd'
import { EditOutlined, QuestionCircleOutlined, ProfileOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { queryFileDetailInfo, componentToPlugin } from './service'
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
	const [state, setState] = useState({
		used: loadedPluginList.map(d => d.name).includes(infos.name),
		loading: false
	})
	const { used, loading } = state
	const handleUsePlugin = async () => {
		setState({
			...state,
			loading: true
		})

		const { name } = infos // Skeleton
		const status = await componentToPlugin(name, packageName)
		if (status.success) {
			// 安装成功
			setState({
				used: true,
				loading: false
			})
		}
	}

	const queryFileDetailInfoByPath = async () => {
		const result = await queryFileDetailInfo(infos.path + '/index.ts', 'master')
		console.log(result)
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
						<Popconfirm 
							title='确定加载该组件吗？'
							icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
							onConfirm={handleUsePlugin}
							okText='确定'
							cancelText='取消'>
							<Switch
								checkedChildren={<CheckOutlined />}
								unCheckedChildren={<CloseOutlined />}
								checked={used}
								disabled={used}
							/>
						</Popconfirm>
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
		</Spin>
	)
}

export default AssetCard
