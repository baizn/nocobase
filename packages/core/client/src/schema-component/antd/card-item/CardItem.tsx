import { Card } from 'antd';
import React from 'react';
import { BlockItem } from '../block-item';

export const CardItem: React.FC = (props) => {
  return (
    <BlockItem className={'noco-card-item'}>
      <div style={{ marginBottom: 24 }} {...props}>
        {props.children}
      </div>
    </BlockItem>
  );
};
