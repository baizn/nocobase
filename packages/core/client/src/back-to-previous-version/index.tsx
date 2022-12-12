import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DownOutlined } from '@ant-design/icons';
import { ActionContext } from '../schema-component';
import { PluginManager } from '../plugin-manager';

export const BackToPreviousVersion = () => {
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation();
  return (
    <ActionContext.Provider value={{ visible, setVisible }}>
      <PluginManager.Toolbar.Item
        // icon={<DownOutlined />}
        title={t('Back To Previous Version')}
        showTitle={true}
        onClick={() => {
          window.location.href = 'https://geaflow-pre.alipay.com/instance/list';
        }}
      />
    </ActionContext.Provider>
  );
};
