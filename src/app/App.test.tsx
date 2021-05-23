import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import Search from './weatherWidget/search'

test('search for Sydney location, and renders results', async () => {
  const setLocation = jest.fn()
  const setUnits = jest.fn()
  render(<Search setLocation={setLocation} units="metric" setUnits={setUnits} />);

  // get search bar and type 'Sydney'. Before continuing wait 500ms
  const searchBar = screen.getByLabelText('Search Locations');
  userEvent.type(searchBar, 'Sydney');
  await new Promise((r) => setTimeout(r, 600)); // debounce value is 500, so need to wait at least that amount

  // test if search bar contains 'Sydney'
  expect(searchBar).toHaveValue('Sydney')

  // get the results list
  const list = screen.getByRole("list", {
    name: /search-results/i,
  })
  const { findAllByText } = within(list)

  // find the results containing 'Sydney, AU'
  const items = await findAllByText(/Sydney, AU/)

  // there should be only 1 result, so that should be expected
  expect(items.length).toBe(1)
});

test('renders metric toggle button', () => {
  render(<App />);
  // tests if metric toggle button is found in web app
  const linkElement = screen.getByText(/Metric: °C, m\/s/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders imperial toggle button', () => {
  // tests if imperial toggle button is found in web app
  render(<App />);
  const linkElement = screen.getByText(/Imperial: °F, mph/i);
  expect(linkElement).toBeInTheDocument();
});