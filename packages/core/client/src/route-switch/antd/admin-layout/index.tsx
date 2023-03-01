import { css } from '@emotion/css';
import { Layout, Spin } from 'antd';
import React, { createContext, useContext, useMemo, useRef } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import {
  ACLAllowConfigure,
  ACLRolesCheckProvider,
  CurrentUser,
  CurrentUserProvider,
  CurrentAppInfoProvider,
  findByUid,
  findMenuItem,
  RemoteCollectionManagerProvider,
  RemotePluginManagerToolbar,
  RemoteSchemaTemplateManagerProvider,
  SchemaComponent,
  useACLRoleContext,
  useDocumentTitle,
  useRequest,
  useRoute,
  useSystemSettings,
} from '../../../';
import { useCollectionManager } from '../../../collection-manager';
import { PoweredBy } from '../../../powered-by';

const filterByACL = (schema, options) => {
  const { allowAll, allowConfigure, allowMenuItemIds = [] } = options;
  if (allowAll || allowConfigure) {
    return schema;
  }
  const filterSchema = (s) => {
    if (!s) {
      return;
    }
    for (const key in s.properties) {
      if (Object.prototype.hasOwnProperty.call(s.properties, key)) {
        const element = s.properties[key];
        if (element['x-uid'] && !allowMenuItemIds.includes(element['x-uid'])) {
          delete s.properties[key];
        }
        if (element['x-uid']) {
          filterSchema(element);
        }
      }
    }
  };
  filterSchema(schema);
  return schema;
};

const SchemaIdContext = createContext(null);
const useMenuProps = () => {
  const defaultSelectedUid = useContext(SchemaIdContext);
  return {
    selectedUid: defaultSelectedUid,
    defaultSelectedUid,
  };
};
const MenuEditor = (props) => {
  const { setTitle } = useDocumentTitle();
  const history = useHistory();
  const match = useRouteMatch<any>();
  const defaultSelectedUid = match.params.name;
  const { sideMenuRef } = props;
  const ctx = useACLRoleContext();
  const route = useRoute();
  const onSelect = ({ item }) => {
    const schema = item.props.schema;
    setTitle(schema.title);
    history.push(`/admin/${schema['x-uid']}`);
  };
  const { data, loading } = useRequest(
    {
      url: `/uiSchemas:getJsonSchema/${route.uiSchemaUid}`,
    },
    {
      refreshDeps: [route.uiSchemaUid],
      onSuccess(data) {
        const schema = filterByACL(data?.data, ctx);
        if (defaultSelectedUid) {
          if (defaultSelectedUid.includes('/')) {
            return;
          }
          const s = findByUid(schema, defaultSelectedUid);
          if (s) {
            setTitle(s.title);
          } else {
            const s = findMenuItem(schema);
            if (s) {
              history.push(`/admin/${s['x-uid']}`);
              setTitle(s.title);
            } else {
              history.push(`/admin/`);
            }
          }
        } else {
          const s = findMenuItem(schema);
          if (s) {
            history.push(`/admin/${s['x-uid']}`);
            setTitle(s.title);
          } else {
            history.push(`/admin/`);
          }
        }
      },
    },
  );
  const schema = useMemo(() => {
    const s = filterByACL(data?.data, ctx);
    if (s?.['x-component-props']) {
      s['x-component-props']['useProps'] = useMenuProps;
    }
    return s;
  }, [data?.data]);
  if (loading) {
    return <Spin />;
  }
  return (
    <SchemaIdContext.Provider value={defaultSelectedUid}>
      <SchemaComponent memoized scope={{ useMenuProps, onSelect, sideMenuRef, defaultSelectedUid }} schema={schema} />
    </SchemaIdContext.Provider>
  );
};

const InternalAdminLayout = (props: any) => {
  const route = useRoute();
  const history = useHistory();
  const match = useRouteMatch<any>();
  const { setTitle } = useDocumentTitle();
  const sideMenuRef = useRef();

  const result = useSystemSettings();
  const { service } = useCollectionManager();
  return (
    <Layout>
      <Layout.Header
        className={css`
        .ant-menu-dark .ant-menu-item, .ant-menu-dark .ant-menu-item-group-title, .ant-menu-dark .ant-menu-item > a, .ant-menu-dark .ant-menu-item > span > a {
          color: rgba(26,27,37,0.65);
        }
        .ant-menu.ant-menu-dark .ant-menu-item-selected,
        .ant-menu-submenu-popup.ant-menu-dark .ant-menu-item-selected {
          height: 46px;
          background-color: rgba(255, 255, 255, 0.1);
          color: rgba(54,55,64,1);
          border-bottom: 2px solid rgba(54,55,64,1);
        }
        .ant-menu-dark.ant-menu-horizontal > .ant-menu-item:hover {
          background-color: rgba(255, 255, 255, 0.1);
        }
        .ant-menu.ant-menu-dark, .ant-menu-dark .ant-menu-sub, .ant-menu.ant-menu-dark .ant-menu-sub {
          background: #e4ebff;
        }
        .ant-menu-dark .ant-menu-item-selected .ant-menu-item-icon, .ant-menu-dark .ant-menu-item-selected .anticon {
          color: rgba(54,55,64,1);
        }
        .ant-menu-dark .ant-menu-item-selected .ant-menu-item-icon + span, .ant-menu-dark .ant-menu-item-selected .anticon + span {
          color: rgba(54,55,64,1);
        }
      `}
        style={{ height: 47, lineHeight: '46px', position: 'relative', paddingLeft: 0, background: '#e4ebff', borderBottom: '1px solid rgba(22,80,255,0.08)' }}
      >
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', height: '100%', width: 'calc(100vw - 300px)' }}>
          <div style={{ width: 200, display: 'inline-flex', color: '#fff', padding: '0', alignItems: 'center' }}>
            <img
              className={css`
                padding: 0 16px;
                object-fit: contain;
                width: 100%;
                height: 100%;
              `}
              src={result?.data?.data?.logo?.url}
            />
            {/* {result?.data?.data?.title} */}
          </div>
          <div
            style={{
              width: 'calc(100% - 590px)',
            }}
          >
            <MenuEditor sideMenuRef={sideMenuRef} />
          </div>
        </div>
        <div style={{ position: 'absolute', zIndex: 10, top: 0, right: 0 }}>
          <ACLAllowConfigure>
            <RemotePluginManagerToolbar />
          </ACLAllowConfigure>
          <CurrentUser />
        </div>
      </Layout.Header>
      <Layout style={{ background: '#e4ebff' }}>
        <Layout.Sider style={{ display: 'none' }} theme={'light'} ref={sideMenuRef}
          className={
            css`
              .ant-layout-sider-children {
                padding: 8px;
                background: rgb(228, 235, 255);
                border-right: 1px solid rgba(26,27,37,0.06);
              }
              .ant-menu-root.ant-menu-vertical, .ant-menu-root.ant-menu-vertical-left, .ant-menu-root.ant-menu-vertical-right, .ant-menu-root.ant-menu-inline {
                background: rgb(228, 235, 255);
              }
              .ant-menu-vertical .ant-menu-item::after, .ant-menu-vertical-left .ant-menu-item::after, .ant-menu-vertical-right .ant-menu-item::after, .ant-menu-inline .ant-menu-item::after {
                border-right: none;
              }
              .ant-menu-inline, .ant-menu-vertical, .ant-menu-vertical-left {
                border-right: none;
              }
              .ant-menu-inline.ant-menu-root .ant-menu-item, .ant-menu-inline.ant-menu-root .ant-menu-submenu-title {
                color: rgba(26,27,37,0.65);
              }
              .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
                background-color: rgba(26,27,37,0.04);
                color: rgba(54,55,64,1);
              }
            `
          }></Layout.Sider>
        <Layout.Content
          className={css`
            min-height: calc(100vh - 46px);
            padding-bottom: 42px;
            position: relative;
            // padding-bottom: 70px;
            > div {
              position: relative;
              // z-index: 1;
            }
            .ant-layout-footer {
              position: absolute;
              bottom: 0;
              text-align: center;
              width: 100%;
              z-index: 0;
              padding: 0px 50px;
            }
          `}
        >
          {service.contentLoading ? <Spin /> : props.children}
          <Layout.Footer>
            <PoweredBy />
          </Layout.Footer>
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export const AdminLayout = (props) => {
  return (
    <CurrentAppInfoProvider>
      <CurrentUserProvider>
        <RemoteSchemaTemplateManagerProvider>
          <RemoteCollectionManagerProvider>
            <ACLRolesCheckProvider>
              <InternalAdminLayout {...props} />
            </ACLRolesCheckProvider>
          </RemoteCollectionManagerProvider>
        </RemoteSchemaTemplateManagerProvider>
      </CurrentUserProvider>
    </CurrentAppInfoProvider>
  );
};

export default AdminLayout;
