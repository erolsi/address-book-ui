// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import 'jest-localstorage-mock';

Object.defineProperty(window, 'matchMedia', {
  value: () => {
    return {
      matches: false,
      addListener: jest.fn(),
      removeListener: jest.fn()
    };
  }
});

Object.defineProperty(window, 'IntersectionObserver', {
  value: jest.fn().mockImplementation(() => {
    return {
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn()
    };
  })
});
