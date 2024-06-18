import React, { createContext, useContext, useState } from "react";
import { SimpleHeroe } from "../heroes/interfaces/simple-heroe";

interface HeroesContextType {
  favorites: SimpleHeroe[];
  addFavorite: (heroe: SimpleHeroe) => void;
  removeFavorite: (heroeId: number) => void;
  favoritesCount: number;
}

export const HeroesContext = createContext<HeroesContextType>({
  favorites: [],
  addFavorite: () => {},
  removeFavorite: () => {},
  favoritesCount: 0,
});

export const MockHeroesProvider: React.FC = ({}) => {
  const [favorites, setFavorites] = useState<SimpleHeroe[]>([]);
  const addFavorite = (heroe: SimpleHeroe) => {
    setFavorites((prevFavorites) => [...prevFavorites, heroe]);
  };
  const removeFavorite = (heroeId: number) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((heroe) => heroe.id !== heroeId)
    );
  };
  const favoritesCount = favorites.length;

  return (
    <HeroesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, favoritesCount }}
    >
      {}
    </HeroesContext.Provider>
  );
};

export const useHeroes = () => {
  const context = useContext(HeroesContext);
  if (context === undefined) {
    throw new Error("useHeroes must be used within a HeroesProvider");
  }
  return context;
};
