import React from 'react';

export const Page = (props) => {
  const { children } = props;
  return (
    <>
      <div style={{ margin: 24 }}>{children}</div>
    </>
  );
};
