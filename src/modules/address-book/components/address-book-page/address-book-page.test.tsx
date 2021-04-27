import { fireEvent, render, screen } from '@testing-library/react';
import { User } from 'modules/address-book/types';
import { act } from 'react-dom/test-utils';
import store from '../../store';
import AddressBookPage from './address-book-page';
import * as isBottomPage from 'helpers/is-bottom-page';

jest.mock('../../store');
jest.mock('helpers/is-bottom-page');

let users: User[] = [
  {
    name: {
      first: 'Mike',
      last: 'Doe',
      username: 'mike-doe'
    },
    picture: {
      thumbnail: '',
      large: ''
    },
    location: {
      street: {
        name: 'Street',
        number: '1'
      },
      city: 'New York',
      postcode: '10000',
      state: 'New York'
    },
    email: 'mike@example.com',
    phone: '555-5555'
  },
  {
    name: {
      first: 'Lisa',
      last: 'Gates',
      username: 'lisa-gates'
    },
    picture: {
      thumbnail: '',
      large: ''
    },
    location: {
      street: {
        name: 'Street',
        number: '1'
      },
      city: 'Los Angeles',
      postcode: '20000',
      state: 'California'
    },
    email: 'lisa@example.com',
    phone: '666-6666'
  }
];

afterEach(() => {
  jest.clearAllMocks();
});

test('render address book page', async () => {
  const load = jest.spyOn(store, 'load');

  // until resolved https://github.com/facebook/jest/issues/9675
  // @ts-ignore
  store.visibleUsers = users.map((user) => ({ ...user, loading: false }));

  act(() => {
    render(<AddressBookPage />);
  });

  const search = screen.getByTestId('address-book-search');
  const addressBookUsers = screen.getAllByTestId('address-book-user');

  expect(load).toHaveBeenCalled();
  expect(search).toBeInTheDocument();
  expect(addressBookUsers).toHaveLength(2);
  expect(addressBookUsers[0]).toHaveTextContent('Mike Doe');
  expect(addressBookUsers[1]).toHaveTextContent('Lisa Gates');
});

test('render address book if no users', async () => {
  const load = jest.spyOn(store, 'load');

  // until resolved https://github.com/facebook/jest/issues/9675
  // @ts-ignore
  store.visibleUsers = [];

  act(() => {
    render(<AddressBookPage />);
  });

  const addressBookUsers = screen.queryAllByTestId('address-book-user');
  const grid = screen.getByTestId('grid');

  expect(load).toHaveBeenCalled();
  expect(addressBookUsers).toHaveLength(0);
  expect(grid).toHaveTextContent('No results');
});

test('load next page on reaching bottom of the page', () => {
  const loadNextPage = jest.spyOn(store, 'loadNextPage');
  jest.spyOn(isBottomPage, 'default').mockImplementation(() => true);

  act(() => {
    render(<AddressBookPage />);
  });

  fireEvent.scroll(document, { target: { scrollY: 100 } });

  expect(loadNextPage).toHaveBeenCalled();
});

test('skip loading next page on scrolling if not at bottom of the page', () => {
  const loadNextPage = jest.spyOn(store, 'loadNextPage');
  jest.spyOn(isBottomPage, 'default').mockImplementation(() => false);

  act(() => {
    render(<AddressBookPage />);
  });

  fireEvent.scroll(document, { target: { scrollY: 100 } });

  expect(loadNextPage).not.toHaveBeenCalled();
});
