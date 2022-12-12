import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dropdown, Menu } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { ActionContext } from '../schema-component';
import { PluginManager } from '../plugin-manager';

export const HelpCenter = () => {
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation();
  // const history = useHistory();
  const items = [
    {
      title: t('Product Docs'),
    },
    {
      title: t('Create Issue'),
    },
  ];
  return (
    <ActionContext.Provider value={{ visible, setVisible }}>
      <Dropdown
        overlay={
          <Menu>
            <Menu.ItemGroup title={t('Help Center')}>
              {items.map(item => {
                return (
                  <Menu.Item
                    onClick={() => {
                      // history.push('/admin/settings/' + item.path);
                    }}
                    key={item.title}
                  >
                    {item.title}
                  </Menu.Item>
                );
              })}
            </Menu.ItemGroup>
            {/* <Menu.Divider></Menu.Divider>
            <Menu.Item
              onClick={() => {
                history.push('/admin/settings');
              }}
              key="/admin/settings"
            >
              {t('Settings center')}
            </Menu.Item> */}
          </Menu>
        }
      >
        <PluginManager.Toolbar.Item icon={<QuestionCircleOutlined />}></PluginManager.Toolbar.Item>
      </Dropdown>
    </ActionContext.Provider>
  );
};
