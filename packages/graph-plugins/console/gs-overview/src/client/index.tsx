import { TableOutlined } from '@ant-design/icons';
import {
  SchemaComponentOptions,
  SchemaInitializer,
  SchemaInitializerContext,
  BlockItem,
  Grid,
  FormItem,
  GraphScopeOverView
} from '@tugraph/openpiece-client';
import React, { useContext } from 'react';
import { OverViewDesigner } from './Designer';

const schema = {
  type: 'void',
  'x-component': 'CardItem',
  'x-designer': 'OverViewDesigner',
  properties: {
    row1: {
      type: 'void',
      'x-component': 'GraphScopeOverView',
      'x-async': false,
      'x-index': 1,
    },
  },
};


export const OverviewBlockInitializer = props => {
  const { insert } = props;
  return (
    <SchemaInitializer.Item
      {...props}
      icon={<TableOutlined />}
      onClick={() => {
        insert(schema);
      }}
      title="GraphScope Overview"
    />
  );
};

export default React.memo(props => {
  const items = useContext(SchemaInitializerContext);
  const children = items.BlockInitializers.items[2].children;

  const hasCustomBlock = children.find(d => d.key === 'gs-overview');

  if (!hasCustomBlock) {
    children.push({
      key: 'gs-overview',
      type: 'item',
      title: 'GraphScope-Overview',
      component: OverviewBlockInitializer,
    });
  }
  return (
    <SchemaComponentOptions
      components={{
        FormItem,
        Grid,
        BlockItem,
        OverViewDesigner,
        OverviewBlockInitializer,
        GraphScopeOverView
      }}
    >
      <SchemaInitializerContext.Provider value={items}>{props.children}</SchemaInitializerContext.Provider>
    </SchemaComponentOptions>
  );
});
