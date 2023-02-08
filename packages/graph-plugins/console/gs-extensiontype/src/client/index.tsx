import { TableOutlined } from '@ant-design/icons';
import {
  SchemaComponentOptions,
  SchemaInitializer,
  SchemaInitializerContext,
  BlockItem,
  Grid,
  FormItem,
  ExtensionType
} from '@nocobase/client';
import React, { useContext } from 'react';
import { DomainDesigner } from './DomainDesigner';

const schema = {
  type: 'void',
  'x-component': 'CardItem',
  'x-designer': 'DomainDesigner',
  properties: {
    row1: {
      type: 'void',
      'x-component': 'ExtensionType',
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
        DomainDesigner,
        DomainBlockInitializer,
        ExtensionType
      }}
    >
      <SchemaInitializerContext.Provider value={items}>{props.children}</SchemaInitializerContext.Provider>
    </SchemaComponentOptions>
  );
});
