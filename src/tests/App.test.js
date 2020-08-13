import React from "react";
import { render, fireEvent, wait } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { fetchShow as mockFetchShow } from "../api/fetchShow";

import Episodes from "../components/Episodes";
import App from "../App";
import { data } from "../mockData";
import { act } from "react-dom/test-utils";

jest.mock("../api/fetchShow.js");

test("renders the app ", () => {
  act(() => {
    mockFetchShow.mockResolvedValueOnce(data);
  });
  render(<App />);
});

test("correct episodes populate when you select a season", async () => {
  mockFetchShow.mockResolvedValueOnce(data);
  // use mocks in unit tests
  const { getByTestId, getByText } = render(<App />);
  await wait(() => {
    getByText(/Select a season/i);
  });
  // test asynchronous API calls
  const dropDown = getByText(/Select a season/i);
  userEvent.click(dropDown);
  // fireEvent.change(dropDown, {value: "Season 1"})
  const text = getByText(/Season 1/i);
  expect(text).toBeInTheDocument();
  userEvent.click(text);
  getByText(/Season 1, Episode 1/i);
  // test React components as the props change
});
