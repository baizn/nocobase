import { AppstoreAddOutlined, SettingOutlined } from '@ant-design/icons';
import { Dropdown, Menu } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { PluginManager } from '../plugin-manager';
import { ActionContext } from '../schema-component';

export const PluginManagerLink = () => {
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation();
  const history = useHistory();
  return (
    <ActionContext.Provider value={{ visible, setVisible }}>
      <PluginManager.Toolbar.Item
        icon={<AppstoreAddOutlined />}
        title={t('Plugin manager')}
        onClick={() => {
          history.push('/admin/pm/list');
        }}
      />
    </ActionContext.Provider>
  );
};

export const SettingsCenterDropdown = () => {
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation();
  const history = useHistory();
  const items = [
    {
      title: t('Collections & Fields'),
      path: 'collection-manager/collections',
    },
    {
      title: t('Roles & Permissions'),
      path: 'acl/roles',
    },
    {
      title: t('File storages'),
      path: 'file-manager/storages',
    },
    {
      title: t('System settings'),
      path: 'system-settings/system-settings',
    },
  ];
  return (
    <ActionContext.Provider value={{ visible, setVisible }}>
      <Dropdown
        overlay={
          <Menu>
            <Menu.ItemGroup title={t('Bookmark')}>
              {items.map((item) => {
                return (
                  <Menu.Item
                    onClick={() => {
                      history.push('/admin/settings/' + item.path);
                    }}
                    key={item.path}
                  >
                    {item.title}
                  </Menu.Item>
                );
              })}
            </Menu.ItemGroup>
            <Menu.Divider></Menu.Divider>
            <Menu.Item
              onClick={() => {
                history.push('/admin/settings');
              }}
              key="/admin/settings"
            >
              {t('Settings center')}
            </Menu.Item>
          </Menu>
        }
      >
        <PluginManager.Toolbar.Item
          icon={<SettingOutlined />}
          // title={t('Settings center')}
        ></PluginManager.Toolbar.Item>
      </Dropdown>
    </ActionContext.Provider>
  );
};
