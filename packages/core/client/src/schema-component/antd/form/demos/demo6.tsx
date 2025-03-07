import { FormItem, Input } from '@formily/antd';
import { ISchema, observer, useForm } from '@formily/react';
import { Action, Form, SchemaComponent, SchemaComponentProvider } from '@tugraph/openpiece-client';
import { Card } from 'antd';
import React from 'react';

export default observer(() => {
  const schema: ISchema = {
    type: 'object',
    properties: {
      form1: {
        type: 'void',
        'x-decorator': 'Form',
        'x-decorator-props': {
          initialValue: {
            field1: 'aaa',
          },
        },
        'x-component': 'Card',
        properties: {
          field1: {
            'x-component': 'Input',
            'x-decorator': 'FormItem',
            title: 'T1',
          },
          out: {
            'x-component': 'Output',
          },
          action1: {
            // type: 'void',
            'x-component': 'Action',
            title: 'Submit',
            'x-component-props': {
              useAction: '{{ useSubmit }}',
            },
          },
        },
      },
    },
  };

  const Output = observer(() => {
    const form = useForm();
    return <pre>{JSON.stringify(form.values, null, 2)}</pre>;
  });

  const useSubmit = () => {
    const form = useForm();
    return {
      async run() {
        console.log(form.values);
      },
    };
  };

  return (
    <SchemaComponentProvider scope={{ useSubmit }} components={{ Card, Output, Action, Form, Input, FormItem }}>
      <SchemaComponent schema={schema} />
    </SchemaComponentProvider>
  );
});
