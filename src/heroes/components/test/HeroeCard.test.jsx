import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { HeroesProvider } from "../../../context/HeroesContext";
import { HeroeCard } from "../HeroeCard";

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt, ...rest }) => <img src={src} alt={alt} {...rest} />,
}));

describe("Componente HeroeCard", () => {
  const mockHeroe = {
    id: 1,
    name: "Spider-Man (Peter Parker)",
    thumbnail: {
      path: "http://example.com/spiderman.jpg",
      extension: "jpg",
    },
  };

  const Wrapper = ({ children }) => <HeroesProvider>{children}</HeroesProvider>;

  test("maneja el click en favoritos correctamente", () => {
    render(
      <Wrapper>
        <HeroeCard heroe={mockHeroe} />
      </Wrapper>
    );

    const likeButton = screen.getByAltText("dislike");
    fireEvent.click(likeButton);

    expect(screen.getByAltText("like")).toBeInTheDocument();
  });
});
