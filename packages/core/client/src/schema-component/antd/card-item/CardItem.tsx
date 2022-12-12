import { Card } from 'antd';
import React from 'react';
import { BlockItem } from '../block-item';

export const CardItem: React.FC = props => {
  return (
    <BlockItem className={'noco-card-item'}>
      <Card style={{ marginBottom: 24, background: '#e4ebff' }} bordered={false} {...props}>
        {props.children}
      </Card>
    </BlockItem>
  );
};
