import React, { useEffect, useState } from 'react'
import { Menu, Row, Col } from 'antd'
import AssetCard from './AssetCard'
import { queryAssetFolderList } from './service'

interface IAssetCardListProps {
	path: string;
}

const AssetCardList: React.FC<IAssetCardListProps> = ({ path }) => {
	const [state, setState] = useState({
		path,
		navList: [],
		menuPath: '',
		componentList: []
	})

	/**
	 * 查询左侧菜单列表
	 * @param assetPath 资产路径
	 */
	const queryGraphMenuList = async (assetPath: string) => {
		const currentList = await queryAssetFolderList(assetPath)
		setState({
			...state,
			navList: currentList,
			menuPath: currentList[0].path
		})
	}

	/**
	 * 查询具体菜单下组件的列表
	 * @param filepath 
	 */
	const queryComponentList = async (filepath: string) => {
		const currentList = await queryAssetFolderList(filepath)
		setState({
			...state,
			componentList: currentList,
			menuPath: filepath
		})
	}

	const { path: assetPath, navList, componentList, menuPath } = state

	useEffect(() => {
		queryGraphMenuList(assetPath)
	}, [assetPath])

	useEffect(() => {
		if (menuPath) {
			queryComponentList(menuPath)
		}
	}, [menuPath])

	const menuItems = navList.filter(d => d.type === 'tree').map(d => {
		return {
			label: d.name,
			key: d.path
		}
	})

	const handleMenuClick = ({ key }) => {
		if (!key) {
			return
		}

		setState({
			...state,
			menuPath: key
		})
	}

	return (
		<Row>
			<Col span={4}>
				<Menu items={menuItems} mode='inline' selectedKeys={[menuPath]} style={{ width: 220 }} onClick={handleMenuClick} />
			</Col>
			<Col span={20}>
				<Row>
					{
						componentList.map(d => {
							return <Col span={7} style={{ marginRight: 16 }}>
								<AssetCard infos={d} />
							</Col>
						})
					}
				</Row>
			</Col>
		</Row>
	)
}

export default AssetCardList