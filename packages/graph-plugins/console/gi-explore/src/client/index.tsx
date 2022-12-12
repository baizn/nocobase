import { TableOutlined } from '@ant-design/icons';
import {
  SchemaComponentOptions,
  SchemaInitializer,
  SchemaInitializerContext,
  BlockItem,
  DragHandler,
  Grid,
  FormItem,
} from '@nocobase/client';
import React, { useContext } from 'react';
import { observer, useFieldSchema } from '@formily/react';
import { useTranslation } from 'react-i18next';
import { HelloDesigner } from './HelloDesigner';
import GraphExploreApp from './Explore';

const schema1 = {
  _isJSONSchemaObject: true,
  version: '2.0',
  type: 'void',
  'x-component': 'CardItem',
  'x-designer': 'HelloDesigner',
  properties: {
    row1: {
      type: 'void',
      'x-component': 'GraphExploreApp',
      'x-async': false,
      'x-index': 1,
    },
  },
};

const schema = {
  type: 'void',
  // title: '{{ t("Add record") }}',
  'x-component': 'CardItem',
  'x-designer': 'HelloDesigner',
  properties: {
    tabs: {
      type: 'void',
      'x-component': 'Tabs',
      'x-component-props': {},
      'x-initializer': 'TabPaneInitializersForCreateFormBlock',
      properties: {
        tab1: {
          type: 'void',
          title: '{{t("Add new")}}',
          'x-component': 'Tabs.TabPane',
          'x-designer': 'Tabs.Designer',
          'x-component-props': {},
          properties: {
            grid: {
              type: 'void',
              'x-component': 'Grid',
              'x-initializer': 'BlockInitializers',
              properties: {},
            },
            tabs1: schema1,
          },
        },
      },
    },
  },
};

const schema2 = {
  type: 'void',
  'x-component': 'CardItem',
  'x-designer': 'HelloDesigner',
  properties: {
    tabs1: {
      type: 'void',
      'x-component': 'Tabs',
      properties: {
        tab1: {
          type: 'void',
          title: 'Tab1',
          'x-component': 'Tabs.TabPane',
          'x-component-props': {
            tab: 'Tab1',
          },
          properties: {
            aaa: {
              'x-content': 'Hello1',
            },
          },
        },
        tab2: {
          type: 'void',
          title: 'Tab2',
          'x-component': 'Tabs.TabPane',
          'x-component-props': {
            tab: 'Tab2',
          },
          properties: {
            aaa: {
              'x-content': 'Hello2',
            },
          },
        },
      },
    },
    hello: {
      type: 'void',
      'x-component': 'div',
      'x-content': 'Hello World',
    },
    name: {
      type: 'void',
      'x-component': 'Input',
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
        insert(schema1);
      }}
      title="自定义区块"
    />
  );
};

export default React.memo(props => {
  const items = useContext(SchemaInitializerContext);
  const children = items.BlockInitializers.items[2].children;

  const hasExploreBlock = children.find(d => d.key === 'explore-block');

  if (!hasExploreBlock) {
    children.push({
      key: 'explore-block',
      type: 'item',
      title: 'Explore',
      component: HelloBlockInitializer,
    });
  }
  return (
    <SchemaComponentOptions
      components={{
        FormItem,
        Grid,
        GraphExploreApp,
        BlockItem,
        HelloDesigner,
        HelloBlockInitializer,
      }}
    >
      <SchemaInitializerContext.Provider value={items}>{props.children}</SchemaInitializerContext.Provider>
    </SchemaComponentOptions>
  );
});
