import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import HeroeDetailsPage from "./page";
import { useHeroes } from "../../../../context/HeroesContext";
import {
  getHeroeDetails,
  getComicDetails,
} from "../../../../services/heroesApi";

jest.mock("@/services/heroesApi");
jest.mock("@/context/HeroesContext", () => ({
  useHeroes: jest.fn(),
}));

const mockHeroe = {
  id: 1,
  name: "Spider-Man",
  description: "Friendly neighborhood Spider-Man",
  thumbnail: {
    path: "http://example.com/spiderman",
    extension: "jpg",
  },
};

const mockComics = [
  {
    id: 1,
    title: "Amazing Spider-Man #1",
    thumbnail: {
      path: "http://example.com/spiderman-comic",
      extension: "jpg",
    },
    dates: {
      date: "2020-01-01T00:00:00Z",
    },
  },
];

const mockUseHeroes = {
  favorites: [],
  addFavorite: jest.fn(),
  removeFavorite: jest.fn(),
};

beforeEach(() => {
  useHeroes.mockReturnValue(mockUseHeroes);
});

test("renderiza correctamente en estado de carga y después de la carga", async () => {
  getHeroeDetails.mockResolvedValueOnce([mockHeroe]);
  getComicDetails.mockResolvedValueOnce(mockComics);

  render(<HeroeDetailsPage params={{ id: 1 }} />);

  await waitFor(() => {
    expect(screen.getByText(mockHeroe.name)).toBeInTheDocument();
    expect(screen.getByText(mockHeroe.description)).toBeInTheDocument();
  });

  await waitFor(() => {
    expect(screen.getByText(mockComics[0].title)).toBeInTheDocument();
    expect(
      screen.getByText(
        new Date(mockComics[0].dates.date).getFullYear().toString()
      )
    ).toBeInTheDocument();
  });
});
