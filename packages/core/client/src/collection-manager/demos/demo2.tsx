import React from 'react';
import { observer, ISchema, useForm } from '@formily/react';
import {
  SchemaComponent,
  SchemaComponentProvider,
  Form,
  Action,
  CollectionProvider,
  CollectionField,
} from '@tugraph/openpiece-client';
import 'antd/dist/antd.css';
import { FormItem, Input } from '@formily/antd';

export default observer(() => {
  const collection = {
    name: 'tests',
    fields: [
      {
        type: 'string',
        name: 'title1',
        interface: 'input',
        uiSchema: {
          title: 'Title1',
          type: 'string',
          'x-component': 'Input',
          required: true,
          description: 'description1',
        } as ISchema,
      },
      {
        type: 'string',
        name: 'title2',
        interface: 'input',
        uiSchema: {
          title: 'Title2',
          type: 'string',
          'x-component': 'Input',
          description: 'description',
          default: 'ttt',
        },
      },
      {
        type: 'string',
        name: 'title3',
      },
    ],
  };

  const schema: ISchema = {
    type: 'object',
    properties: {
      form1: {
        type: 'void',
        'x-component': 'Form',
        properties: {
          // 字段 title1 直接使用全局提供的 uiSchema
          title1: {
            'x-component': 'CollectionField',
            'x-decorator': 'FormItem',
            default: '111',
          },
          // 等同于
          // title1: {
          //   type: 'string',
          //   title: 'Title',
          //   required: true,
          //   'x-component': 'Input',
          //   'x-decorator': 'FormItem',
          // },
          title2: {
            'x-component': 'CollectionField',
            'x-decorator': 'FormItem',
            title: 'Title4', // 覆盖全局已定义的 Title2
            required: true, // 扩展的配置参数
            description: 'description4',
          },
          // 等同于
          // title2: {
          //   type: 'string',
          //   title: 'Title22',
          //   required: true,
          //   'x-component': 'Input',
          //   'x-decorator': 'FormItem',
          // },
          // 字段 title3 没有提供 uiSchema，自行处理
          title3: {
            'x-component': 'Input',
            'x-decorator': 'FormItem',
            title: 'Title3',
            required: true,
          },
          action1: {
            // type: 'void',
            'x-component': 'Action',
            title: 'Submit',
            'x-component-props': {
              type: 'primary',
              useAction: '{{ useSubmit }}',
            },
          },
        },
      },
    },
  };

  const useSubmit = () => {
    const form = useForm();
    return {
      async run() {
        form.submit(() => {
          console.log(form.values);
        });
      },
    };
  };

  return (
    <SchemaComponentProvider scope={{ useSubmit }} components={{ Action, Form, CollectionField, Input, FormItem }}>
      <CollectionProvider collection={collection}>
        <SchemaComponent schema={schema} />
      </CollectionProvider>
    </SchemaComponentProvider>
  );
});
