import request from 'umi-request'
import { OPENPIECE_SERVER_URL, PROJECT_NAMESPACE } from '../../Constants'

/**
 * 通过资产路径获取组件列表
 * @param assetPath 资产路径
 * @param branchName 分支名称
 * @returns 
 */
export const queryAssetFolderList = async (assetPath: string, projectName: string = PROJECT_NAMESPACE, branchName: string = 'master') => {
	const result = await request(`${OPENPIECE_SERVER_URL}/api/asset/list/${projectName}?path=${assetPath}&branchName=${branchName}`, {
		method: 'GET',
		responseType: 'json',
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
		},
		credentials: 'include',
		withCredentials: true
	})

	const currentList = result.data.filter(d => d.type === 'tree')

	return currentList
}

/**
 * 通过文件路径获取文件内容
 * @param filePath 文件路径
 * @param branchName 分支名称
 */
export const queryFileDetailInfo = async (filePath: string, branchName: string = 'master') => {
	const result = await request(`${OPENPIECE_SERVER_URL}/api/asset/sourcecode/${PROJECT_NAMESPACE}?path=${filePath}&branchName=${branchName}`, {
		method: 'GET',
		responseType: 'json',
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
		},
		credentials: 'include',
		withCredentials: true
	})

	return result
}

/**
 * 将组件转成为 Openpiece 平台可消费的插件
 * @param name 组件名称
 * @param packageName 组件包名称
 * @returns 
 */
export const componentToPlugin = async (name: string, packageName: string = '@tugraph/components') => {
	const result = await request(`${OPENPIECE_SERVER_URL}/api/asset/plugin`, {
		method: 'GET',
		responseType: 'json',
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
		},
		params: {
			name,
			packageName
		},
		credentials: 'include',
		withCredentials: true
	})

	return result
}

/**
 * 所有 Openpiece 平台已加载的组件
 * @param name 组件名称
 * @returns 
 */
export const loadedPlugins = async () => {
	const result = await request(`${OPENPIECE_SERVER_URL}/api/asset/plugin/loaded`, {
		method: 'GET',
		responseType: 'json',
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
		},
		credentials: 'include',
		withCredentials: true
	})

	return result.data
}


export const updatePluginFiled = async (pluginName: string, options) => {
	const result = await request(`${OPENPIECE_SERVER_URL}/api/asset/plugin`, {
		method: 'PUT',
		responseType: 'json',
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
		},
		data: {
			pluginName,
			options
		},
		credentials: 'include',
    withCredentials: true,
	})

	return result
}
