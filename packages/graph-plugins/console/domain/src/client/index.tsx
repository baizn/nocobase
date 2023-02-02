import { TableOutlined } from '@ant-design/icons';
import {
  SchemaComponentOptions,
  SchemaInitializer,
  SchemaInitializerContext,
  BlockItem,
  Grid,
  FormItem,
  DomainList
} from '@nocobase/client';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { DomainDesigner } from './DomainDesigner';

const schema = {
  type: 'void',
  'x-component': 'CardItem',
  'x-designer': 'DomainDesigner',
  properties: {
    row1: {
      type: 'void',
      'x-component': 'DomainList',
      'x-async': false,
      'x-index': 1,
    },
  },
};


export const DomainBlockInitializer = props => {
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
      title="域管理区块"
    />
  );
};

export default React.memo(props => {
  const items = useContext(SchemaInitializerContext);
  const children = items.BlockInitializers.items[2].children;

  const hasCustomBlock = children.find(d => d.key === 'domainContainer');

  if (!hasCustomBlock) {
    children.push({
      key: 'domainContainer',
      type: 'item',
      title: '域管理',
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
        DomainList
      }}
    >
      <SchemaInitializerContext.Provider value={items}>{props.children}</SchemaInitializerContext.Provider>
    </SchemaComponentOptions>
  );
});
