import { css } from '@emotion/react';
import { Input } from 'antd';
import React, { useMemo } from 'react';
import { debounce } from 'lodash';

export const DEBOUNCE_TIME = 350;

export default function AddressBookSearch({ onSearch }: { onSearch: (query: string) => void }) {
  const onChange = useMemo(() => {
    return debounce(onSearch, DEBOUNCE_TIME);
  }, [onSearch]);

  return (
    <div
      css={css`
        position: fixed;
        top: 70px;
        width: 100%;
        left: 0;
        right: 0;
        z-index: 15;
        background: #fff;
      `}
      data-testid="address-book-search"
    >
      <div
        css={css`
          max-width: 1300px;
          margin: 0 auto;
          padding: 15px 0;
        `}
      >
        <Input
          placeholder="Search address book"
          allowClear
          size="large"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChange(event.target.value)}
          css={css`
            width: 100%;
          `}
        />
      </div>
    </div>
  );
}
