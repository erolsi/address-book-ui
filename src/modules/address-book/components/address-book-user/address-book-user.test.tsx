import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { UserState } from 'modules/address-book/store';
import { act } from 'react-dom/test-utils';
import AddressBookUser from './address-book-user';

let user: UserState = {
  loading: false,
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

test('render user', async () => {
  act(() => {
    render(<AddressBookUser user={user} />);
  });

  const meta = screen.getByTestId('meta');
  const button = screen.getByRole('button', {
    name: /Organize a meeting/
  });

  expect(meta).toHaveTextContent('Mike Doe');
  expect(meta).toHaveTextContent('mike@example.com');
  expect(meta).toHaveTextContent('mike@example.com');
  expect(button).toBeInTheDocument();
});

test('render loading user', async () => {
  act(() => {
    render(<AddressBookUser user={{ ...user, loading: true }} />);
  });

  const meta = screen.queryByTestId('meta');
  const button = screen.queryByRole('button', {
    name: /Organize a meeting/
  });

  expect(meta).not.toBeInTheDocument();
  expect(button).not.toBeInTheDocument();
});

test('show organize meeting modal when clicked on button', async () => {
  act(() => {
    render(<AddressBookUser user={{ ...user, loading: false }} />);
  });

  const button = screen.getByRole('button', {
    name: /Organize a meeting/
  });

  fireEvent.click(button);

  await waitFor(() => {
    expect(screen.getByTestId('organize-meeting-modal')).toBeInTheDocument();
  });
});
