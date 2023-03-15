import { gridRowColWrap } from '../utils';

// 页面里添加区块
export const BlockInitializers = {
  title: '{{t("Add block")}}',
  icon: 'PlusOutlined',
  wrap: gridRowColWrap,
  items: [
    {
      key: 'dataBlocks',
      type: 'itemGroup',
      title: '{{t("Data blocks")}}',
      children: [
        {
          key: 'table',
          type: 'item',
          title: '{{t("Table")}}',
          component: 'TableBlockInitializer',
        },
        {
          key: 'form',
          type: 'item',
          title: '{{t("Form")}}',
          component: 'FormBlockInitializer',
        },
        {
          key: 'details',
          type: 'item',
          title: '{{t("Details")}}',
          component: 'DetailsBlockInitializer',
        },
      ],
    },
    {
      key: 'graph-schema',
      type: 'itemGroup',
      title: '{{t("GraphSchema")}}',
      children: []
    },
    {
      key: 'graph-query',
      type: 'itemGroup',
      title: '{{t("GraphQuery")}}',
      children: []
    },
    {
      key: 'graph-explore',
      type: 'itemGroup',
      title: '{{t("GraphExplore")}}',
      children: []
    },
    {
      key: 'graph-console',
      type: 'itemGroup',
      title: '{{t("GraphConsole")}}',
      children: []
    },
    {
      key: 'media',
      type: 'itemGroup',
      title: '{{t("Other blocks")}}',
      children: [
        {
          key: 'markdown',
          type: 'item',
          title: '{{t("Markdown")}}',
          component: 'MarkdownBlockInitializer',
        },
      ],
    },
  ],
};
