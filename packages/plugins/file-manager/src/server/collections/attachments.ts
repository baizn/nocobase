import { CollectionOptions } from '@tugraph/database';

export default {
  name: 'attachments',
  title: '文件管理器',
  createdBy: true,
  updatedBy: true,
  fields: [
    {
      comment: '用户文件名（不含扩展名）',
      type: 'string',
      name: 'title',
    },
    {
      comment: '系统文件名（含扩展名）',
      type: 'string',
      name: 'filename',
    },
    {
      comment: '扩展名（含“.”）',
      type: 'string',
      name: 'extname',
    },
    {
      comment: '文件体积（字节）',
      type: 'integer',
      name: 'size',
    },
    // TODO: 使用暂不明确，以后再考虑
    // {
    //   comment: '文件类型（mimetype 前半段，通常用于预览）',
    //   type: 'string',
    //   name: 'type',
    // },
    {
      type: 'string',
      name: 'mimetype',
    },
    {
      comment: '存储引擎',
      type: 'belongsTo',
      name: 'storage',
    },
    {
      comment: '相对路径（含“/”前缀）',
      type: 'string',
      name: 'path',
    },
    {
      comment: '其他文件信息（如图片的宽高）',
      type: 'jsonb',
      name: 'meta',
      defaultValue: {},
    },
    {
      comment: '网络访问地址',
      type: 'string',
      name: 'url',
      // formula: '{{ storage.baseUrl }}{{ path }}/{{ filename }}'
    },
  ],
} as CollectionOptions;
