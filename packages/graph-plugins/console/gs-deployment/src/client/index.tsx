import { TableOutlined } from '@ant-design/icons';
import {
  SchemaComponentOptions,
  SchemaInitializer,
  SchemaInitializerContext,
  BlockItem,
  Grid,
  FormItem,
  GraphScopeDeployment
} from '@tugraph/openpiece-client';
import React, { useContext } from 'react';
import { DeploymentDesigner } from './Designer';

const schema = {
  type: 'void',
  'x-component': 'CardItem',
  'x-designer': 'DeploymentDesigner',
  properties: {
    row1: {
      type: 'void',
      'x-component': 'GraphScopeDeployment',
      'x-async': false,
      'x-index': 1,
    },
  },
};


export const DomainBlockInitializer = props => {
  const { insert } = props;
  return (
    <SchemaInitializer.Item
      {...props}
      icon={<TableOutlined />}
      onClick={() => {
        insert(schema);
      }}
      title="GraphScope Deployment"
    />
  );
};

export default React.memo(props => {
  const items = useContext(SchemaInitializerContext);
  const children = items.BlockInitializers.items[2].children;

  const hasCustomBlock = children.find(d => d.key === 'gs-deployment');

  if (!hasCustomBlock) {
    children.push({
      key: 'gs-deployment',
      type: 'item',
      title: 'GraphScope-Deployment',
      component: DomainBlockInitializer,
    });
  }
  return (
    <SchemaComponentOptions
      components={{
        FormItem,
        Grid,
        BlockItem,
        DeploymentDesigner,
        DomainBlockInitializer,
        GraphScopeDeployment
      }}
    >
      <SchemaInitializerContext.Provider value={items}>{props.children}</SchemaInitializerContext.Provider>
    </SchemaComponentOptions>
  );
});
