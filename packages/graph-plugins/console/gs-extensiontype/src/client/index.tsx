import { TableOutlined } from '@ant-design/icons';
import {
  SchemaComponentOptions,
  SchemaInitializer,
  SchemaInitializerContext,
  BlockItem,
  Grid,
  FormItem,
  GraphScopeExtensionType
} from '@nocobase/client';
import React, { useContext } from 'react';
import { ExtensionDesigner } from './Designer';

const schema = {
  type: 'void',
  'x-component': 'CardItem',
  'x-designer': 'ExtensionDesigner',
  properties: {
    row1: {
      type: 'void',
      'x-component': 'GraphScopeExtensionType',
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
      title="GraphScope ExtensionType"
    />
  );
};

export default React.memo(props => {
  const items = useContext(SchemaInitializerContext);
  const children = items.BlockInitializers.items[2].children;

  const hasCustomBlock = children.find(d => d.key === 'gs-extensiontype');

  if (!hasCustomBlock) {
    children.push({
      key: 'gs-extensiontype',
      type: 'item',
      title: 'GraphScope-ExtensionType',
      component: DomainBlockInitializer,
    });
  }
  return (
    <SchemaComponentOptions
      components={{
        FormItem,
        Grid,
        BlockItem,
        ExtensionDesigner,
        DomainBlockInitializer,
        GraphScopeExtensionType
      }}
    >
      <SchemaInitializerContext.Provider value={items}>{props.children}</SchemaInitializerContext.Provider>
    </SchemaComponentOptions>
  );
});
