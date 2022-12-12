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
import { dragSchema, Page, Block } from './Drag';

// const Block = observer(props => {
//   const fieldSchema = useFieldSchema();
//   return (
//     <div style={{ marginBottom: 20, padding: '0 20px', height: 50, lineHeight: '50px', background: '#f1f1f1' }}>
//       Block {fieldSchema.title}
//       <DragHandler />
//     </div>
//   );
// });

const schema1 = {
  _isJSONSchemaObject: true,
  version: '2.0',
  type: 'void',
  name: 'grid1',
  'x-decorator': 'CardItem',
  'x-component': 'Grid',
  properties: {
    row1: {
      type: 'void',
      'x-component': 'Grid.Row',
      properties: {
        col11: {
          _isJSONSchemaObject: true,
          version: '2.0',
          type: 'void',
          'x-component': 'Grid.Col',
          properties: {
            block1: {
              _isJSONSchemaObject: true,
              version: '2.0',
              type: 'void',
              title: '1',
              'x-decorator': 'BlockItem',
              'x-component': 'Block',
              'x-uid': 'a9m97uffyku',
              'x-async': false,
              'x-index': 1,
            },
            block2: {
              _isJSONSchemaObject: true,
              version: '2.0',
              type: 'void',
              title: '2.1',
              'x-decorator': 'BlockItem',
              'x-component': 'Block',
              'x-uid': 'lensw462z8w',
              'x-async': false,
              'x-index': 2,
            },
            block234: {
              _isJSONSchemaObject: true,
              version: '2.0',
              type: 'void',
              title: '2.2',
              'x-decorator': 'BlockItem',
              'x-component': 'Block',
              'x-uid': 'lensw462z81',
              'x-async': false,
              'x-index': 3,
            },
          },
          'x-uid': '4shevom50rl',
          'x-async': false,
          'x-index': 1,
        },
        col12: {
          _isJSONSchemaObject: true,
          version: '2.0',
          type: 'void',
          'x-component': 'Grid.Col',
          properties: {
            block3: {
              _isJSONSchemaObject: true,
              version: '2.0',
              type: 'void',
              title: '3',
              'x-decorator': 'BlockItem',
              'x-component': 'Block',
              'x-uid': 'kp4kjknbs2l',
              'x-async': false,
              'x-index': 1,
            },
          },
          'x-uid': 'u7n3beze0gr',
          'x-async': false,
          'x-index': 2,
        },
      },
      'x-uid': 'qfl04eq71tt',
      'x-async': false,
      'x-index': 1,
    },
    row2: {
      _isJSONSchemaObject: true,
      version: '2.0',
      type: 'void',
      'x-component': 'Grid.Row',
      properties: {
        col21: {
          _isJSONSchemaObject: true,
          version: '2.0',
          type: 'void',
          'x-component': 'Grid.Col',
          properties: {
            block4: {
              _isJSONSchemaObject: true,
              version: '2.0',
              type: 'void',
              title: '4',
              'x-decorator': 'BlockItem',
              'x-component': 'Block',
              'x-uid': 'v5bd5kcyhat',
              'x-async': false,
              'x-index': 1,
            },
          },
          'x-uid': 'bwg0mv89atk',
          'x-async': false,
          'x-index': 1,
        },
        col22: {
          _isJSONSchemaObject: true,
          version: '2.0',
          type: 'void',
          'x-component': 'Grid.Col',
          properties: {
            block5: {
              _isJSONSchemaObject: true,
              version: '2.0',
              type: 'void',
              title: '5',
              'x-decorator': 'BlockItem',
              'x-component': 'Block',
              'x-uid': 'noh1flz5oqg',
              'x-async': false,
              'x-index': 1,
            },
          },
          'x-uid': 'oz0rypr2rlj',
          'x-async': false,
          'x-index': 2,
        },
      },
      'x-uid': '5igqpmvilz1',
      'x-async': false,
      'x-index': 2,
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
        insert(schema);
      }}
      title="自定义区块"
    />
  );
};

export default React.memo(props => {
  const items = useContext(SchemaInitializerContext);
  const children = items.BlockInitializers.items[2].children;

  const hasCustomBlock = children.find(d => d.key === 'consoleBlock');

  if (!hasCustomBlock) {
    children.push({
      key: 'consoleBlock',
      type: 'item',
      title: '集群列表',
      component: HelloBlockInitializer,
    });
  }
  return (
    <SchemaComponentOptions
      components={{
        FormItem,
        Grid,
        Block,
        Page,
        BlockItem,
        HelloDesigner,
        HelloBlockInitializer,
      }}
    >
      <SchemaInitializerContext.Provider value={items}>{props.children}</SchemaInitializerContext.Provider>
    </SchemaComponentOptions>
  );
});
