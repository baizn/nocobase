import { css } from '@emotion/css';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const PoweredBy = () => {
  const { i18n } = useTranslation();
  const urls = {
    'en-US': 'https://antv.vision',
    'zh-CN': 'https://antv.vision/zh',
  };
  return (
    <div
      className={css`
        text-align: center;
        color: rgba(0, 0, 0, 0.45);
        a {
          color: rgba(0, 0, 0, 0.45);
          &:hover {
            color: rgba(0, 0, 0, 0.85);
          }
        }
      `}
    >
      Powered by <a href={urls[i18n.language] || urls['en-US']}>AntV</a>
    </div>
  );
};
