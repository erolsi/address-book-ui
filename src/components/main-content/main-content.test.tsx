import { render, screen } from '@testing-library/react';
import MainContent from './main-content';
import { act } from 'react-dom/test-utils';

test('renders main content', () => {
  act(() => {
    render(
      <MainContent>
        <div>children</div>
      </MainContent>
    );
  });

  const element = screen.getByText(/children/i);
  expect(element).toBeInTheDocument();
});
