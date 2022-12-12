import { TableOutlined } from '@ant-design/icons';
import {
  SchemaComponentOptions,
  SchemaInitializer,
  SchemaInitializerContext,
  BlockItem,
  DragHandler,
  Grid,
  FormItem,
  RichText,
  useDesignable,
  DomainList,
} from '@nocobase/client';
import React, { useContext } from 'react';
import { Button, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import { observer, Schema, useFieldSchema } from '@formily/react';
import { HelloDesigner } from './HelloDesigner';
import GremlinQueryPanel from './Gremlin';

const TestComponent = () => {
  return (
    <div>
      这是一个测试文案
      <Button type="primary">确定</Button>
    </div>
  );
};

const Hello = observer(props => {
  const { insertAdjacent } = useDesignable();
  const fieldSchema = useFieldSchema();
  return (
    <div>
      <h1>{fieldSchema.name}</h1>
      <Space>
        <Button
          onClick={() => {
            insertAdjacent('beforeBegin', {
              'x-component': 'DomainList',
            });
          }}
        >
          before begin
        </Button>
        <Button
          onClick={() => {
            insertAdjacent('afterBegin', {
              'x-component': 'TestComponent',
            });
          }}
        >
          after begin
        </Button>
        <Button
          onClick={() => {
            insertAdjacent('beforeEnd', {
              'x-component': 'Hello',
            });
          }}
        >
          before end
        </Button>
        <Button
          onClick={() => {
            insertAdjacent('afterEnd', {
              'x-component': 'Hello',
            });
          }}
        >
          after end
        </Button>
      </Space>
      <div style={{ margin: 50 }}>{props.children}</div>
    </div>
  );
});

const schema = {
  type: 'void',
  // title: '{{ t("Add record") }}',
  'x-component': 'CardItem',
  'x-designer': 'HelloDesigner',
  properties: {
    tabs: {
      type: 'void',
      'x-component': 'DomainList',
    },
  },
};

export const HelloBlockInitializer = props => {
  const { insert } = props;
  const { t } = useTranslation();
  return (
    <SchemaInitializer.Item
      {...props}
      icon={<TableOutlined />}
      onClick={item => {
        console.log('custom', item);
        insert(schema);
      }}
      title={t('Hello block')}
    />
  );
};

export default React.memo(props => {
  const items = useContext(SchemaInitializerContext);
  const children = items.BlockInitializers.items[2].children;

  const hasCustomBlock = children.find(d => d.key === 'customBlockQuery');

  if (!hasCustomBlock) {
    children.push({
      key: 'customBlockQuery',
      type: 'item',
      title: '自定义查询',
      component: HelloBlockInitializer,
    });
  }

  return (
    <SchemaComponentOptions
      components={{
        RichText,
        FormItem,
        Grid,
        BlockItem,
        HelloDesigner,
        HelloBlockInitializer,
        GremlinQueryPanel,
        Hello,
        TestComponent,
        DomainList,
      }}
    >
      <SchemaInitializerContext.Provider value={items}>{props.children}</SchemaInitializerContext.Provider>
    </SchemaComponentOptions>
  );
});
