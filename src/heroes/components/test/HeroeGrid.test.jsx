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
    // Agrega más héroes según sea necesario para tus pruebas
  ];

  const Wrapper = ({ children }) => <HeroesProvider>{children}</HeroesProvider>;

  test("renderiza correctamente el grid de héroes", () => {
    render(
      <Wrapper>
        <HeroeGrid heroes={mockHeroes} />
      </Wrapper>
    );

    // Verificar que el componente HeroeGrid se haya renderizado correctamente
    const gridElement = screen.getByTestId("heroe-grid");
    expect(gridElement).toBeInTheDocument();

    // Verificar que cada héroe se renderice correctamente dentro del grid
    mockHeroes.forEach((hero) => {
      const heroNameElement = screen.getByText(hero.name);
      expect(heroNameElement).toBeInTheDocument();
    });
  });
});
