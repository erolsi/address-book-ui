import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

const MenuLink = styled(Link)`
  color: #fff;
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 25px;

  &:hover {
    background: #0099ff;
    color: #fff;
  }
`;

export default function MainNavbar() {
  return (
    <div
      css={css`
        position: fixed;
        z-index: 10;
        top: 0;
        width: 100%;
        background: #0c306a;
        display: flex;
        align-items: center;
        height: 70px;
      `}
    >
      <Link
        to="/"
        css={css`
          font-size: 18px;
          color: #fff;
          text-transform: uppercase;
          padding: 0 35px;
          font-weight: bold;
          letter-spacing: 1.5px;
        `}
      >
        AddressBook
      </Link>
      <ul
        css={css`
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          height: 100%;
        `}
      >
        <li>
          <MenuLink to="/">Browse</MenuLink>
        </li>
      </ul>
      <Link
        to="/settings"
        css={css`
          margin-left: auto;
          color: #fff;
          display: flex;
          height: 100%;
          padding: 0 15px;
          align-items: center;
        `}
      >
        Settings
      </Link>
    </div>
  );
}
