import React, { useEffect, useState } from 'react'
import { Menu, Row, Col, Spin } from 'antd'
import AssetCard from './AssetCard'
import { ILoadedPlugin } from './Marketplace'
import { loadedPlugins, queryAssetFolderList } from './service'

interface IAssetCardListProps {
	path: string;
	projectName?: string;
	packageName?: string;
	loadedPluginList: ILoadedPlugin[];
	respLoadingStatus?: (status: boolean) => void;
	official?: boolean;
}

const AssetCardList: React.FC<IAssetCardListProps> = ({ path, loadedPluginList, projectName, respLoadingStatus, packageName, official }) => {
	const [state, setState] = useState({
		navList: [],
		menuPath: '',
		componentList: [],
		loading: false
	})

	/**
	 * 查询左侧菜单列表
	 * @param assetPath 资产路径
	 */
	const queryGraphMenuList = async (assetPath: string) => {
		setState({
			...state,
			loading: true
		})

		if (respLoadingStatus) {
			respLoadingStatus(true)
		}

		const currentList = await queryAssetFolderList(assetPath, projectName)

		if (respLoadingStatus) {
			respLoadingStatus(false)
		}

		setState({
			...state,
			navList: currentList,
			menuPath: currentList[0].path,
			loading: false
		})
	}

	/**
	 * 查询具体菜单下组件的列表
	 * @param filepath 
	 */
	const queryComponentList = async (filepath: string) => {
		setState({
			...state,
			loading: true
		})

		if (respLoadingStatus) {
			respLoadingStatus(true)
		}

		const currentList = await queryAssetFolderList(filepath, projectName)

		if (respLoadingStatus) {
			respLoadingStatus(false)
		}

		setState({
			...state,
			componentList: currentList,
			menuPath: filepath,
			loading: false
		})
	}

	const { navList, componentList, menuPath, loading } = state

	useEffect(() => {
		queryGraphMenuList(path)
	}, [path])

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
		<Spin tip='请稍等，正在努力加载组件列表中……' spinning={loading} >
			<Row>
				<Col span={4}>
					<Menu items={menuItems} mode='inline' selectedKeys={[menuPath]} style={{ width: 220 }} onClick={handleMenuClick} />
				</Col>
				<Col span={20}>
					<Row>
						{
							componentList.map(d => {
								return <Col span={7} style={{ marginRight: 16, marginBottom: 16 }}>
									<AssetCard infos={d} loadedPluginList={loadedPluginList} packageName={packageName} official={official} />
								</Col>
							})
						}
					</Row>
				</Col>
			</Row>
		</Spin>
	)
}

export default AssetCardList
