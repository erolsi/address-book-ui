import { fireEvent, render, screen } from '@testing-library/react';
import { User } from 'modules/address-book/types';
import { act } from 'react-dom/test-utils';
import OrganizeMeetingModal from './organize-meeting-modal';
import api from 'api';

jest.mock('api');
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
});

test('render modal', () => {
  act(() => {
    render(<OrganizeMeetingModal user={user} />);
  });

  const title = screen.getByText(/Organize a meeting with/);
  const details = screen.getByTestId('details');

  expect(title).toBeInTheDocument();
  expect(title).toHaveTextContent(`Organize a meeting with ${user.name.first} ${user.name.last}`);
  expect(details).toHaveTextContent('Address');
  expect(details).toHaveTextContent('Street 1, 10000 New York, New York');
  expect(details).toHaveTextContent('Telephone');
  expect(details).toHaveTextContent('555-5555');
  expect(details).toHaveTextContent('Email');
  expect(details).toHaveTextContent('mike@example.com');
});

test('organize meeting on confirm', () => {
  // we mock api call and passed function
  const request = mockedapi.post.mockResolvedValue({});
  const onOk = jest.fn();
  const onCancel = jest.fn();

  act(() => {
    render(<OrganizeMeetingModal user={user} onOk={onOk} onCancel={onCancel} />);

    const ok = screen.getByRole('button', {
      name: /Confirm meeting/
    });
    fireEvent.click(ok);
  });

  expect(request).toHaveBeenCalledWith('organize-meeting');
  expect(onOk).toHaveBeenCalled();
  expect(onCancel).not.toHaveBeenCalled();
});

test('cancel everything on cancel', () => {
  // we mock api call and passed function
  const request = mockedapi.post.mockResolvedValue({});
  const onOk = jest.fn();
  const onCancel = jest.fn();

  act(() => {
    render(<OrganizeMeetingModal user={user} onOk={onOk} onCancel={onCancel} />);

    const cancel = screen.getByRole('button', {
      name: /Cancel/
    });
    fireEvent.click(cancel);
  });

  expect(request).not.toHaveBeenCalled();
  expect(onOk).not.toHaveBeenCalled();
  expect(onCancel).toHaveBeenCalled();
});
