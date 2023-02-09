import { TableOutlined } from '@ant-design/icons';
import {
  SchemaComponentOptions,
  SchemaInitializer,
  SchemaInitializerContext,
  BlockItem,
  Grid,
  FormItem,
  GraphScopeGraphList
} from '@nocobase/client';
import React, { useContext } from 'react';
import { GraphListDesigner } from './Designer';

const schema = {
  type: 'void',
  'x-component': 'CardItem',
  'x-designer': 'GraphListDesigner',
  properties: {
    row1: {
      type: 'void',
      'x-component': 'GraphScopeGraphList',
      'x-async': false,
      'x-index': 1,
    },
  },
};


export const GraphListBlockInitializer = props => {
  const { insert } = props;
  return (
    <SchemaInitializer.Item
      {...props}
      icon={<TableOutlined />}
      onClick={() => {
        insert(schema);
      }}
      title="GraphScopeGraphList"
    />
  );
};

export default React.memo(props => {
  const items = useContext(SchemaInitializerContext);
  const children = items.BlockInitializers.items[2].children;

  const hasCustomBlock = children.find(d => d.key === 'gs-graph-list');

  if (!hasCustomBlock) {
    children.push({
      key: 'gs-graph-list',
      type: 'item',
      title: 'GraphScope-GraphList',
      component: GraphListBlockInitializer,
    });
  }
  return (
    <SchemaComponentOptions
      components={{
        FormItem,
        Grid,
        BlockItem,
        GraphListDesigner,
        GraphListBlockInitializer,
        GraphScopeGraphList
      }}
    >
      <SchemaInitializerContext.Provider value={items}>{props.children}</SchemaInitializerContext.Provider>
    </SchemaComponentOptions>
  );
});
