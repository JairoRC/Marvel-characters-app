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

    const marvelLogo = screen.getByAltText("Marvel");
    expect(marvelLogo).toBeInTheDocument();

    const likeIcon = screen.getByAltText("like");
    expect(likeIcon).toBeInTheDocument();

    const favoritesCountElement = screen.getByText("0");
    expect(favoritesCountElement).toBeInTheDocument();
  });
});
