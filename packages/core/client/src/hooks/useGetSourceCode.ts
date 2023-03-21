import { useRequest } from 'ahooks';
import { message } from 'antd';
import { HOST } from '../constant/host';
import { querySourceCode } from '../services/AppExportController';
import { downloadRemoteFile } from '../utils/downloadFile';

export const useGetSourceCode = () => {
  const { run: runGetSourceCode, loading: getSourceCodeLoading } = useRequest(querySourceCode, {
    manual: true,
    onSuccess: (res) => {
      if (res?.data) {
        downloadRemoteFile(`${HOST}${res?.data?.path}`, 'openpiece.tar.gz');
      }
    },
    onError: (err) => {
      console.error(err);
      message.error(err);
    },
  });

  return { runGetSourceCode, getSourceCodeLoading };
};
