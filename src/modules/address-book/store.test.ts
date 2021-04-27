import { waitFor } from '@testing-library/react';
import { User } from 'modules/address-book/types';
import api from 'api';
import { AddressBookStore } from './store';
import { message } from 'antd';

jest.useFakeTimers();
jest.mock('api');
jest.mock('antd');
const mockedapi = api as jest.Mocked<typeof api>;

let user: User = {
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
};

afterEach(() => {
  jest.clearAllMocks();
  localStorage.clear();
});

test('generate blank users', () => {
  const store = new AddressBookStore();
  const users = store.generateBlankUsers();

  expect(users).toHaveLength(50);
});

test('load', async () => {
  const request = mockedapi.get.mockResolvedValue({
    results: [user]
  });

  const store = new AddressBookStore();
  store.load();

  await waitFor(() => expect(request).toHaveBeenCalledWith('', { params: { page: 1, results: 50, nat: null } }));
});

test('load with nationality', async () => {
  localStorage.setItem('nationality', 'ch');
  const request = mockedapi.get.mockResolvedValue({
    results: [user]
  });

  const store = new AddressBookStore();
  store.load();

  await waitFor(() => {
    expect(request).toHaveBeenCalledWith('', { params: { page: 1, results: 50, nat: 'ch' } });
    expect(localStorage.getItem).toHaveBeenCalledWith('nationality');
  });
});

test('show message if error loading', async () => {
  const error = jest.spyOn(message, 'error');
  mockedapi.get.mockRejectedValue({});

  const store = new AddressBookStore();
  store.load();

  await waitFor(() => expect(error).toHaveBeenCalled());
});

test('load next page', () => {
  const store = new AddressBookStore();
  store.load = jest.fn();
  store.loading = false; // we already did initial load
  store.users = [{ ...user, loading: false }]; // we already have something loaded

  store.loadNextPage();

  expect(store.load).toHaveBeenCalled();
  expect(store.page).toEqual(2);
  expect(store.users).toHaveLength(51); // add loading dummy users to existing loaded users
});

test('search users', () => {
  const store = new AddressBookStore();
  store.users = [{ ...user, loading: false }];
  store.search('mike');

  // test if we loading
  expect(store.loading).toBeTruthy();
  expect(store.users.map((user) => user.loading)).toEqual([true]);

  // wait for "server" to respond
  jest.runAllTimers();

  expect(store.loading).toBeFalsy();
  expect(store.users.map((user) => user.loading)).toEqual([false]);
  expect(store.query).toEqual('mike');
});

test('search users and filter user', () => {
  const store = new AddressBookStore();
  store.users = [{ ...user, loading: false }];
  store.search('mike');

  // wait for "server" to respond
  jest.runAllTimers();

  expect(store.visibleUsers).toHaveLength(1);
});

test('search users and return empty if not match', () => {
  const store = new AddressBookStore();
  store.users = [{ ...user, loading: false }];
  store.search('invalid');

  // wait for "server" to respond
  jest.runAllTimers();

  expect(store.visibleUsers).toHaveLength(0);
});

test('initial store state', () => {
  const store = new AddressBookStore();

  expect(store.page).toEqual(1);
  expect(store.users).toHaveLength(50);
  expect(store.query).toBeNull();
  expect(store.loading).toBeTruthy();
});

test('reset store state', () => {
  const store = new AddressBookStore();
  store.page = 2;
  store.users = [{ ...user, loading: false }];
  store.query = 'mike';
  store.loading = false;

  store.reset();

  expect(store.page).toEqual(1);
  expect(store.users).toHaveLength(50);
  expect(store.query).toBeNull();
  expect(store.loading).toBeTruthy();
});
