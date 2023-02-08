import { message } from 'antd';
import { request, HTTP_SERVICE_URL } from '@nocobase/client';

export const getDomainList = async () => {
  try {
    const response = await request(`${HTTP_SERVICE_URL}/domain`, {
      method: 'get',
    });
  
    if (!response.success) {
      message.error(`查询域列表失败: ${response.message}`);
      if (response.buserviceErrorCode === 'USER_NOT_LOGIN') {
        // 用户没有登录
        window.location.href = response.buserviceErrorMsg;
        return;
      }
      return [];
    }
    return response.data;
  } catch (error) {
    console.log('request error', error)
    return []
  }
  
};

/**
 * 查询域管理员列表
 * @param admins 域管理员名称列表
 */
export const getDomainAdminList = async (admins: string[]) => {
  const response = await request(`${HTTP_SERVICE_URL}/user/accounts`, {
    method: 'post',
    data: admins,
  });

  if (!response.success) {
    message.error(`查询域管理员列表失败: ${response.message}`);
    return [];
  }
  return response.data;
};

/**
 * 获取域用户列表
 * @param domainCode 域代码
 */
export const getDomainUserList = async (domainCode: string) => {
  const response = await request(`${HTTP_SERVICE_URL}/user/query`, {
    method: 'get',
    params: {
      domainCode,
    },
  });

  if (!response.success) {
    message.error(`查询域用户列表失败: ${response.message}`);
    return [];
  }
  return response.data;
};

/**
 * 申请加入域或成为域管理员
 * @param domainCode 域代码
 * @param type 申请类型
 * @param description 描述信息
 */
export const applyJoinDomain = async (domainCode: string, type: 'user' | 'admin', description: string) => {
  const response = await request(`${HTTP_SERVICE_URL}/domain/apply`, {
    method: 'post',
    params: {
      domainCode,
      action: type === 'user' ? 'applyDomainJoin' : 'applyDomainAdmin',
      processMemo: description,
    },
  });

  if (!response.success) {
    message.error(`申请失败: ${response.message}`);
    return null;
  }

  return response.data;
};

/**
 * 删除域
 * @param domainCode 域代码
 */
export const deleteDomainByCode = async (domainCode: string) => {
  const response = await request(`${HTTP_SERVICE_URL}/admin/domain/delete`, {
    method: 'post',
    params: {
      domainCode,
    },
  });

  if (!response.success) {
    message.error(`删除域失败: ${response.message}`);
    return null;
  }
  return response;
};

interface CreateDomainProps {
  domainCode: string;
  domainName: string;
}

/**
 * 创建新的域
 * @param params 创建域的参数
 */
export const createDomain = async (params: CreateDomainProps) => {
  const response = await request(`${HTTP_SERVICE_URL}/admin/domain/create`, {
    method: 'post',
    params,
  });

  if (!response.success) {
    message.error(`创建域失败: ${response.message}`);
    return null;
  }
  return response;
};
