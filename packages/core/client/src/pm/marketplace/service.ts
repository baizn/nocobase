import request from 'axios'
import { OPENPIECE_SERVER_URL, PROJECT_NAMESPACE } from '@tugraph/openpiece-client'

/**
 * 通过资产路径获取组件列表
 * @param assetPath 资产路径
 * @param branchName 分支名称
 * @returns 
 */
export const queryAssetFolderList = async (assetPath: string, branchName: string = 'master') => {
	const result = await request.get(`${OPENPIECE_SERVER_URL}/api/asset/list/${PROJECT_NAMESPACE}?path=${assetPath}&branchName=${branchName}`, {
		responseType: 'json',
		headers: {
			'Access-Control-Allow-Origin': '*',
		},
		withCredentials: true
	}).then(res => res.data)

	const currentList = result.data.filter(d => d.type === 'tree')

	return currentList
}

/**
 * 通过文件路径获取文件内容
 * @param filePath 文件路径
 * @param branchName 分支名称
 */
export const queryFileDetailInfo = async (filePath: string, branchName: string = 'master') => {
	const result = await request.get(`${OPENPIECE_SERVER_URL}/api/asset/sourcecode/${PROJECT_NAMESPACE}?path=${filePath}&branchName=${branchName}`, {
		responseType: 'json',
		headers: {
			'Access-Control-Allow-Origin': '*',
		},
		withCredentials: true
	}).then(res => res.data)

	console.log(result)
}
