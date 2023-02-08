import { useFieldSchema } from '@formily/react';
import { GeneralSchemaDesigner, SchemaSettings, useCollection } from '@nocobase/client';
import React from 'react';

export const DomainDesigner = () => {
  const { name, title } = useCollection();
  const fieldSchema = useFieldSchema();
  return (
    <GeneralSchemaDesigner title={title || name}>
      <SchemaSettings.Remove
        removeParentsIfNoChildren
        breakRemoveOn={{
          'x-component': 'Grid',
        }}
      />
    </GeneralSchemaDesigner>
  );
};
