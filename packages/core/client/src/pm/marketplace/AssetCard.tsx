import React, { useState } from 'react'
import { Card, Tooltip, Avatar, Tag, Switch, Popconfirm } from 'antd'
import { EditOutlined, QuestionCircleOutlined, ProfileOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { queryFileDetailInfo } from './service'
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
}

const AssetCard: React.FC<IAssetCardProps> = ({ infos }) => {
	const [state, setState] = useState({
		used: false
	})
	const { used } = state
	const handleUsePlugin = () => {
		setState({
			...state,
			used: !used
		})
	}

	const queryFileDetailInfoByPath = async () => {
		const result = await queryFileDetailInfo(infos.path + '/index.ts', 'master')
		console.log(result)
	}

	return (
		<Card bordered={false}
			actions={[
				<Tooltip title='预览资产详细信息'>
					<ProfileOutlined key="overview" onClick={queryFileDetailInfoByPath} />
				</Tooltip>,
				<Tooltip title='在线编辑资产，敬请期待……'>
					<EditOutlined key="edit" />
				</Tooltip>,
				<Tooltip title='加载或卸载组件'>
					<Popconfirm 
						title={used ? '确定卸载该组件吗？' : '确定使用该组件吗？'}
						icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
						onConfirm={handleUsePlugin}
						okText='确定'
						cancelText='取消'>
						<Switch
							checkedChildren={<CheckOutlined />}
							unCheckedChildren={<CloseOutlined />}
							checked={used}
						/>
					</Popconfirm>
				</Tooltip>
			]}
			>
			<Meta
				avatar={<Avatar src="https://avatars.githubusercontent.com/u/9443867?s=40&v=4" />}
				title={
					<>
						{infos.name}
						<Tag style={{ position: 'absolute', right: 10 }} color='green'>1.0.0</Tag>
					</>
				}
				description={infos.description || infos.path}
			/>
		</Card>		
	)
}

export default AssetCard
