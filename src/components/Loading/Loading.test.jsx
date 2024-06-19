import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Loading } from "./Loading";

test("Componente Loading renderizado correctamente", () => {
  render(<Loading />);

  const container = screen.getByRole("heading", { level: 1 });
  expect(container).toBeInTheDocument();

  expect(screen.getByText(/L.*ading \. \. \./i)).toBeInTheDocument();

  const svg = screen.getByTestId("loading-svg");
  expect(svg).toBeInTheDocument();
  expect(svg).toHaveClass("animate-spin");
});
