import React from "react";
import { render, screen } from "@testing-library/react";
import { HeroesProvider } from "../../../context/HeroesContext"; //
import { HeroeGrid } from "./../HeroeGrid";

describe("Componente HeroeGrid", () => {
  const mockHeroes = [
    {
      id: 1,
      name: "Spider-Man",
      thumbnail: { path: "http://example.com/spiderman", extension: "jpg" },
    },
    {
      id: 2,
      name: "Iron Man",
      thumbnail: { path: "http://example.com/ironman", extension: "jpg" },
    },
  ];

  const Wrapper = ({ children }) => <HeroesProvider>{children}</HeroesProvider>;

  test("renderiza correctamente el grid de héroes", () => {
    render(
      <Wrapper>
        <HeroeGrid heroes={mockHeroes} />
      </Wrapper>
    );

    const gridElement = screen.getByTestId("heroe-grid");
    expect(gridElement).toBeInTheDocument();

    mockHeroes.forEach((hero) => {
      const heroNameElement = screen.getByText(hero.name);
      expect(heroNameElement).toBeInTheDocument();
    });
  });
});
