import { resolveNocobasePackagesAlias } from '@tugraph/openpiece-devtools';
import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'Openpiece',
  // outputPath: `./docs/dist/${lang}`,
  mode: 'site',
  resolve: {
    includes: ['./'],
  },
  // locales: [[lang, lang]],
  hash: true,
  logo: 'https://www.nocobase.com/images/logo.png',
  navs: [
    null,
    {
      title: 'GitHub',
      path: 'https://github.com/baizn/nocobase',
    },
  ],
  chainWebpack(config) {
    resolveNocobasePackagesAlias(config);
  },
});
