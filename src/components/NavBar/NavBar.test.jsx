import React from "react";
import { render, screen } from "@testing-library/react";
import { HeroesProvider } from "../../context/HeroesContext";
import { NavBar } from "./NavBar";

const Wrapper = ({ children }) => <HeroesProvider>{children}</HeroesProvider>;

describe("Componente NavBar", () => {
  test("renderiza correctamente el logo y el contador de favoritos", () => {
    render(
      <Wrapper>
        <NavBar />
      </Wrapper>
    );

    // Verificar que el logo de Marvel esté presente y tenga el texto alternativo correcto
    const marvelLogo = screen.getByAltText("Marvel");
    expect(marvelLogo).toBeInTheDocument();

    // Verificar que el ícono de favoritos (corazón) esté presente y tenga el texto alternativo correcto
    const likeIcon = screen.getByAltText("like");
    expect(likeIcon).toBeInTheDocument();

    // Verificar que el contador de favoritos esté presente y tenga el valor inicial correcto
    const favoritesCountElement = screen.getByText("0"); // Ajusta este valor según el valor inicial de favoritesCount
    expect(favoritesCountElement).toBeInTheDocument();
  });
});
