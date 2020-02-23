import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders add files text', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Add files by clicking or dragging into this area/i);
  expect(linkElement).toBeInTheDocument();
});
