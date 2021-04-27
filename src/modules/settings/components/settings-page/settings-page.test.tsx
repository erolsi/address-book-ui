import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import SettingsPage from './settings-page';

afterEach(() => {
  localStorage.clear();
});

test('render page', () => {
  act(() => {
    render(<SettingsPage />);
  });

  const title = screen.getByText(/Settings/);
  const select = screen.getByTestId('nationality-select');

  expect(title).toBeInTheDocument();
  expect(select).toBeInTheDocument();
});

test('renders empty select', () => {
  act(() => {
    render(<SettingsPage />);
  });

  const select = screen.getByTestId('nationality-select');

  expect(select).toHaveTextContent('Please select nationality');
  expect(localStorage.getItem).toHaveBeenLastCalledWith('nationality');
});

test('renders prepopulated select', () => {
  localStorage.setItem('nationality', 'ch');

  act(() => {
    render(<SettingsPage />);
  });

  const select = screen.getByTestId('nationality-select');

  expect(select).toBeInTheDocument();
  expect(select).toHaveTextContent('CH');
  expect(localStorage.getItem).toHaveBeenLastCalledWith('nationality');
});

test('set localStorage on select change', () => {
  act(() => {
    render(<SettingsPage />);

    // we must select by role so we can force select change
    const select = screen.getByRole('combobox');
    fireEvent.select(select, {
      target: { value: 'CH' }
    });
  });

  expect(localStorage.setItem).toHaveBeenLastCalledWith('nationality', 'ch');
});
