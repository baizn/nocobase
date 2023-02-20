export default {
  target: 'node',
  cjs: { type: 'babel', lazy: true },
  excludePkgs: [
    'core/build',
    'core/cli',
    'core/create-openpiece-app',
    'core/devtools',
    'app/client',
  ],
};
