import { TableOutlined } from '@ant-design/icons';
import {
  SchemaComponentOptions,
  SchemaInitializer,
  SchemaInitializerContext,
  BlockItem,
  Grid,
  FormItem,
  GraphScopeLog
} from '@nocobase/client';
import React, { useContext } from 'react';
import { LogDesigner } from './Designer';

const schema = {
  type: 'void',
  'x-component': 'CardItem',
  'x-designer': 'LogDesigner',
  properties: {
    row1: {
      type: 'void',
      'x-component': 'GraphScopeLog',
      'x-async': false,
      'x-index': 1,
    },
  },
};


export const LogBlockInitializer = props => {
  const { insert } = props;
  return (
    <SchemaInitializer.Item
      {...props}
      icon={<TableOutlined />}
      onClick={() => {
        insert(schema);
      }}
      title="GraphScope Log"
    />
  );
};

export default React.memo(props => {
  const items = useContext(SchemaInitializerContext);
  const children = items.BlockInitializers.items[2].children;

  const hasCustomBlock = children.find(d => d.key === 'gs-log');

  if (!hasCustomBlock) {
    children.push({
      key: 'gs-log',
      type: 'item',
      title: 'GraphScope-Log',
      component: LogBlockInitializer,
    });
  }
  return (
    <SchemaComponentOptions
      components={{
        FormItem,
        Grid,
        BlockItem,
        LogDesigner,
        LogBlockInitializer,
        GraphScopeLog
      }}
    >
      <SchemaInitializerContext.Provider value={items}>{props.children}</SchemaInitializerContext.Provider>
    </SchemaComponentOptions>
  );
});
