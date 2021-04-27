import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import LazyAvatar from './lazy-avatar';
import * as observer from 'react-intersection-observer';

jest.mock('react-intersection-observer');

afterEach(() => {
  jest.clearAllMocks();
});

test('render avatar if in view', async () => {
  jest.spyOn(observer, 'useInView').mockImplementation(() => [null, true] as any); // hard to return union type

  act(() => {
    render(<LazyAvatar />);
  });

  const avatar = screen.queryByTestId('avatar');
  const placeholder = screen.queryByTestId('avatar-placeholder');

  expect(avatar).toBeInTheDocument();
  expect(placeholder).not.toBeInTheDocument();
});

test('render avatar placeholder if not in view', async () => {
  jest.spyOn(observer, 'useInView').mockImplementation(() => [null, false] as any); // hard to return union type

  act(() => {
    render(<LazyAvatar />);
  });

  const avatar = screen.queryByTestId('avatar');
  const placeholder = screen.queryByTestId('avatar-placeholder');

  expect(avatar).not.toBeInTheDocument();
  expect(placeholder).toBeInTheDocument();
});
