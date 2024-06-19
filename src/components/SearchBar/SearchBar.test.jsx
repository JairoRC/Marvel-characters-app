import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { SearchBar } from "./SearchBar";

const mockOnSearch = jest.fn();

test("renders SearchBar component", () => {
  const { getByPlaceholderText } = render(
    <SearchBar onSearch={mockOnSearch} displayedHeroes={5} />
  );

  const inputElement = getByPlaceholderText("SEARCH A CHARACTER...");
  expect(inputElement).toBeInTheDocument();
});

test("input change triggers onSearch callback", () => {
  const { getByPlaceholderText } = render(
    <SearchBar onSearch={mockOnSearch} displayedHeroes={5} />
  );

  const inputElement = getByPlaceholderText("SEARCH A CHARACTER...");
  fireEvent.change(inputElement, { target: { value: "Spider-Man" } });

  expect(mockOnSearch).toHaveBeenCalledTimes(1);
  expect(mockOnSearch).toHaveBeenCalledWith("Spider-Man");
});
