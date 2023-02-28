import { SchemaComponent } from '@tugraph/openpiece-client';
import { Card } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { storageSchema } from './schemas/storage';
import { StorageOptions } from './StorageOptions';

export const FileStoragePane = () => {
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation();
  return (
    <Card bordered={false}>
      <SchemaComponent components={{ StorageOptions }} schema={storageSchema} />
    </Card>
  );
};
