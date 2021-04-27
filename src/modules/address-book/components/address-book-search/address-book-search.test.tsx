import AddressBookSearch, { DEBOUNCE_TIME } from './address-book-search';
import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

jest.useFakeTimers('modern');

afterEach(() => {
  jest.clearAllMocks();
});

test('render search input', async () => {
  const onSearch = jest.fn();

  act(() => {
    render(<AddressBookSearch onSearch={onSearch} />);
  });

  const input = screen.getByRole('textbox');

  expect(input).toHaveValue('');
  expect(input).toHaveAttribute('placeholder', 'Search address book');
  expect(onSearch).not.toHaveBeenCalled();
});

test('search with callback', async () => {
  const onSearch = jest.fn();

  act(() => {
    render(<AddressBookSearch onSearch={onSearch} />);
  });

  const input = screen.getByRole('textbox');

  fireEvent.change(input, { target: { value: 'mike' } });

  expect(onSearch).not.toHaveBeenCalled();

  // debounce
  jest.advanceTimersByTime(DEBOUNCE_TIME);

  expect(onSearch).toHaveBeenCalledWith('mike');
});
