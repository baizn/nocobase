import { TableOutlined } from '@ant-design/icons';
import {
  SchemaComponentOptions,
  SchemaInitializer,
  SchemaInitializerContext,
  BlockItem,
  Grid,
  FormItem,
  GraphScopeJobs
} from '@tugraph/openpiece-client';
import React, { useContext } from 'react';
import { JobsDesigner } from './Designer';

const schema = {
  type: 'void',
  'x-component': 'CardItem',
  'x-designer': 'JobsDesigner',
  properties: {
    row1: {
      type: 'void',
      'x-component': 'GraphScopeJobs',
      'x-async': false,
      'x-index': 1,
    },
  },
};


export const JobsBlockInitializer = props => {
  const { insert } = props;
  return (
    <SchemaInitializer.Item
      {...props}
      icon={<TableOutlined />}
      onClick={() => {
        insert(schema);
      }}
      title="GraphScope Jobs"
    />
  );
};

export default React.memo(props => {
  const items = useContext(SchemaInitializerContext);
  const children = items.BlockInitializers.items[2].children;

  const hasCustomBlock = children.find(d => d.key === 'gs-jobs');

  if (!hasCustomBlock) {
    children.push({
      key: 'gs-jobs',
      type: 'item',
      title: 'GraphScope-Jobs',
      component: JobsBlockInitializer,
    });
  }
  return (
    <SchemaComponentOptions
      components={{
        FormItem,
        Grid,
        BlockItem,
        JobsDesigner,
        JobsBlockInitializer,
        GraphScopeJobs
      }}
    >
      <SchemaInitializerContext.Provider value={items}>{props.children}</SchemaInitializerContext.Provider>
    </SchemaComponentOptions>
  );
});
