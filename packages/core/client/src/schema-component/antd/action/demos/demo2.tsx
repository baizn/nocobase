import { FormItem, Input } from '@formily/antd';
import { ISchema, observer, useForm } from '@formily/react';
import {
  Action,
  ActionContext,
  Form,
  SchemaComponent,
  SchemaComponentProvider,
  useActionContext
} from '@tugraph/openpiece-client';
import React, { useState } from 'react';

const useCloseAction = () => {
  const { setVisible } = useActionContext();
  const form = useForm();
  return {
    async run() {
      setVisible(false);
      form.submit((values) => {
        console.log(values);
      });
    },
  };
};

const schema: ISchema = {
  type: 'object',
  properties: {
    drawer1: {
      'x-component': 'Action.Drawer',
      type: 'void',
      title: 'Drawer Title',
      properties: {
        hello1: {
          'x-content': 'Hello',
          title: 'T1',
        },
        footer1: {
          'x-component': 'Action.Drawer.Footer',
          type: 'void',
          properties: {
            close1: {
              title: 'Close',
              'x-component': 'Action',
              'x-component-props': {
                useAction: '{{ useCloseAction }}',
              },
            },
          },
        },
      },
    },
  },
};

export default observer(() => {
  const [visible, setVisible] = useState(false);
  return (
    <SchemaComponentProvider components={{ Form, Action, Input, FormItem }}>
      <ActionContext.Provider value={{ visible, setVisible }}>
        <a onClick={() => setVisible(true)}>Open</a>
        <SchemaComponent scope={{ useCloseAction }} schema={schema} />
      </ActionContext.Provider>
    </SchemaComponentProvider>
  );
});
