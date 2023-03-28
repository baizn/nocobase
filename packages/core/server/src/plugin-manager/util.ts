import execa from 'execa'
export const runScript = (command, argv, options = {} as any) => {
  return execa(command, argv, {
    shell: true,
    stdio: 'inherit',
    ...options,
    env: {
      ...process.env,
      ...options.env,
    },
  });
};
