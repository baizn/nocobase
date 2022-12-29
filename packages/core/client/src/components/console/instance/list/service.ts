import { request, HTTP_SERVICE_URL } from "@nocobase/client";
import { message } from "antd";

/**
 * 获取所有实例的列表
 */
export const getInstanceAllList = async () => {
  const response = await request(`${HTTP_SERVICE_URL}/instance/all`, {
    method: "get"
  });

  if (!response.success) {
    message.error(`查询所有域列表失败: ${response.message}`);
    return [];
  }
  return response.data;
};

/**
 * 根据域编码获取实例列表
 * @param domainCode 域编码
 */
export const getInstanceListByDomainCode = async (domainCode: string) => {
  const response = await request(`${HTTP_SERVICE_URL}/instance`, {
    method: "get",
    params: {
      domainCode
    }
  });

  if (!response.success) {
    message.error(`查询域用户列表失败: ${response.message}`);
    return [];
  }
  return response.data;
};

/**
 * 根据 ID 删除实例
 * @param instanceId 实例 ID
 */
export const deleteInstance = async (instanceId: string) => {
  const response = await request(`${HTTP_SERVICE_URL}/instance/delete`, {
    method: "post",
    params: {
      instanceId
    }
  });

  if (!response.success) {
    message.error(`删除实例失败: ${response.message}`);
    return null;
  }
  return response;
};

/**
 * 给指定实例添加 owner
 * @param instanceId 实例 ID
 * @param account owner 列表
 */
export const addOwner = async (instanceId: string, account: string) => {
  const response = await request(`${HTTP_SERVICE_URL}/instance/delete`, {
    method: "post",
    params: {
      instanceId,
      account
    }
  });

  if (!response.success) {
    message.error(`添加owner失败: ${response.message}`);
    return null;
  }
  return response;
};

interface CreateInstanceProps {
  domainCode: string;
  instanceName: string;
  engineVersion: string;
  description?: string;
  creator: string;
  owners: string;
}

interface UpdateInstanceProps {
  id: string;
  engineVersion?: string;
  description?: string;
}

/**
 * 新增实例
 * @param params 创建实例的参数
 */
export const createInstance = async (params: CreateInstanceProps) => {
  const response = await request(`${HTTP_SERVICE_URL}/instance/create`, {
    method: "post",
    data: params
  });

  if (!response.success) {
    message.error(`新增实例失败: ${response.message}`);
    return null;
  }
  return response;
};

/**
 * 更新实例
 * @param params 创建实例的参数
 */
export const updateInstance = async (params: UpdateInstanceProps) => {
  const response = await request(`${HTTP_SERVICE_URL}/instance/update`, {
    method: "post",
    data: params
  });

  if (!response.success) {
    message.error(`更新实例失败: ${response.message}`);
    return null;
  }
  return response;
};

/**
 * 查询引擎版本列表
 */
export const getEngineVersionList = async () => {
  const response = await request(
    `${HTTP_SERVICE_URL}/engine/version/query/non/admin`,
    {
      method: "post"
    }
  );

  if (!response.success) {
    message.error(`新增实例失败: ${response.message}`);
    return null;
  }
  return response.data;
};

/**
 * 根据关键词匹配用户
 * @param keyword 搜索关键词
 */
export const autoCompleteUser = async (keyword: string) => {
  const response = await request(`${HTTP_SERVICE_URL}/user/keyword`, {
    method: "get",
    params: {
      keyword
    }
  });

  if (!response.success) {
    // message.error(`新增实例失败: ${response.message}`);
    return null;
  }
  return response.data;
};
