import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import FavoritesHeroesPage from "./page";
import { useHeroes } from "../../../context/HeroesContext";
import { SearchBar } from "../../../components/SearchBar/SearchBar";
import { HeroeGrid } from "../../../heroes/components/HeroeGrid";

jest.mock("@/context/HeroesContext", () => ({
  useHeroes: jest.fn(),
}));

jest.mock("@/components/SearchBar/SearchBar", () => ({
  SearchBar: ({ onSearch, displayedHeroes }) => (
    <div data-testid="search-bar">
      <input
        data-testid="search-input"
        onChange={(e) => onSearch(e.target.value)}
        placeholder="SEARCH A CHARACTER..."
      />
      <p data-testid="results-count">{displayedHeroes} RESULTS</p>
    </div>
  ),
}));

jest.mock("@/heroes", () => ({
  HeroeGrid: ({ heroes }) => (
    <div data-testid="heroe-grid">
      {heroes.map((hero) => (
        <div key={hero.id} data-testid="heroe-card">
          {hero.name}
        </div>
      ))}
    </div>
  ),
}));

const mockFavorites = [
  {
    id: 1,
    name: "Spider-Man",
  },
  {
    id: 2,
    name: "Iron Man",
  },
];

const mockUseHeroes = {
  favorites: mockFavorites,
};

beforeEach(() => {
  useHeroes.mockReturnValue(mockUseHeroes);
});

test("renderiza correctamente los héroes favoritos y filtra por término de búsqueda", () => {
  render(<FavoritesHeroesPage />);

  expect(screen.getByTestId("search-bar")).toBeInTheDocument();

  expect(screen.getByTestId("heroe-grid")).toBeInTheDocument();
  expect(screen.getAllByTestId("heroe-card").length).toBe(mockFavorites.length);
  expect(screen.getByText("Spider-Man")).toBeInTheDocument();
  expect(screen.getByText("Iron Man")).toBeInTheDocument();

  fireEvent.change(screen.getByTestId("search-input"), {
    target: { value: "Spider" },
  });

  expect(screen.getAllByTestId("heroe-card").length).toBe(1);
  expect(screen.getByText("Spider-Man")).toBeInTheDocument();
  expect(screen.queryByText("Iron Man")).not.toBeInTheDocument();

  expect(screen.getByTestId("results-count").textContent).toBe("1 RESULTS");
});
