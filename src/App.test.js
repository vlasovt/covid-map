import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders leaflet link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/leaflet/i);
  expect(linkElement).toBeInTheDocument();
});
