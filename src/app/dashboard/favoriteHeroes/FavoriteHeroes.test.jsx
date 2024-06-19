import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import FavoritesHeroesPage from "./page";
import { useHeroes } from "../../../context/HeroesContext";
import { SearchBar } from "../../../components/SearchBar/SearchBar";
import { HeroeGrid } from "../../../heroes/components/HeroeGrid";

// Mock del contexto
jest.mock("@/context/HeroesContext", () => ({
  useHeroes: jest.fn(),
}));

// Mock de componentes
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

// Datos de prueba
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

  // Verificar que el componente SearchBar se renderiza correctamente
  expect(screen.getByTestId("search-bar")).toBeInTheDocument();

  // Verificar que el HeroeGrid se renderiza con los héroes favoritos
  expect(screen.getByTestId("heroe-grid")).toBeInTheDocument();
  expect(screen.getAllByTestId("heroe-card").length).toBe(mockFavorites.length);
  expect(screen.getByText("Spider-Man")).toBeInTheDocument();
  expect(screen.getByText("Iron Man")).toBeInTheDocument();

  // Filtrar héroes por término de búsqueda
  fireEvent.change(screen.getByTestId("search-input"), {
    target: { value: "Spider" },
  });

  // Verificar que HeroeGrid muestra solo los héroes filtrados
  expect(screen.getAllByTestId("heroe-card").length).toBe(1);
  expect(screen.getByText("Spider-Man")).toBeInTheDocument();
  expect(screen.queryByText("Iron Man")).not.toBeInTheDocument();

  // Verificar que el número de resultados se actualiza
  expect(screen.getByTestId("results-count").textContent).toBe("1 RESULTS");
});
