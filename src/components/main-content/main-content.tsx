import { css } from '@emotion/react';
import { ReactChild } from 'react';

export default function MainContent({ children }: { children: ReactChild }) {
  return (
    <div
      css={css`
        max-width: 1300px;
        margin: 0 auto;
        padding-top: 80px;
      `}
    >
      {children}
    </div>
  );
}
