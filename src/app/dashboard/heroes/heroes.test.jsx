import { React, act } from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import HeroesPage from "./page";
import { getHeroes } from "../../../services/heroesApi";
import { HeroesProvider } from "../../../context/HeroesContext";

jest.mock("@/services/heroesApi");

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

describe("Componente HeroesPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const Wrapper = ({ children }) => <HeroesProvider>{children}</HeroesProvider>;

  test("renderiza correctamente en estado de carga y después de la carga", async () => {
    getHeroes.mockResolvedValue(mockHeroes);

    await act(async () => {
      render(
        <Wrapper>
          <HeroesPage />
        </Wrapper>
      );
    });

    await waitFor(() => {
      expect(screen.getByTestId("heroe-grid")).toBeInTheDocument();
    });
  });

  test("filtra los héroes correctamente según el término de búsqueda", async () => {
    getHeroes.mockResolvedValue(mockHeroes);

    await act(async () => {
      render(
        <Wrapper>
          <HeroesPage />
        </Wrapper>
      );
    });

    await waitFor(() => {
      expect(screen.getByTestId("heroe-grid")).toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText("SEARCH A CHARACTER..."), {
      target: { value: "Iron" },
    });

    expect(screen.getByText("Iron Man")).toBeInTheDocument();
    expect(screen.queryByText("Spider-Man")).not.toBeInTheDocument();
  });
});
