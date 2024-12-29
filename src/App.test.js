import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import App from "./App";
import { getBooks, getListOfRestEndPoint } from "./api/anapioficeandfire";

jest.mock("./api/anapioficeandfire", () => ({
  getBooks: jest.fn(),
  getListOfRestEndPoint: jest.fn(),
}));

test("Перевіряє наявність будинку 'House Allyrion of Godsgrace'", async () => {
  const mockHouses = [
    {
      url: "https://www.anapioficeandfire.com/api/houses/2",
      name: "House Allyrion of Godsgrace",
      region: "Dorne",
    },
  ];

  getListOfRestEndPoint.mockResolvedValueOnce({ houses: mockHouses });

  await act(async () => {
    render(<App />);
  });

  const house = await screen.findByText("House Allyrion of Godsgrace");
  expect(house).toBeInTheDocument();
});

test("Перевіряє коректний виклик API для книги", async () => {
  const mockBooks = [
    {
      url: "https://www.anapioficeandfire.com/api/books/3",
      name: "A Game of Thrones",
    },
  ];

  getBooks.mockResolvedValueOnce(mockBooks);

  await act(async () => {
    render(<App />);
  });

  await waitFor(() => {
    expect(getListOfRestEndPoint).toHaveBeenCalled();
  });
  const firstBook = await screen.findByText("A Game of Thrones");
  expect(firstBook).toBeInTheDocument();
});
