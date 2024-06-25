"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { SimpleHeroe } from "../heroes/interfaces/simple-heroe";
import { keyBy } from "lodash";

interface HeroesById {
  [key: number]: SimpleHeroe;
}

interface HeroesContextType {
  heroes: SimpleHeroe[];
  heroesById: HeroesById;
  favorites: SimpleHeroe[];
  favoritesIds: number[];
  setHeroes: (heroes: SimpleHeroe[]) => void;
  addFavorite: (heroe: SimpleHeroe) => void;
  removeFavorite: (heroeId: number) => void;
  favoritesCount: number;
}

export const HeroesContext = createContext<HeroesContextType | undefined>(
  undefined
);

export const useHeroes = () => {
  const context = useContext(HeroesContext);
  if (context === undefined) {
    throw new Error("useHeroes must be used within a HeroesProvider");
  }
  return context;
};

interface HeroesProviderProps {
  children: ReactNode;
}

export const HeroesProvider = ({ children }: HeroesProviderProps) => {
  const [favoritesIds, setFavoritesIds] = useState<number[]>([]);
  const [heroes, _setHeroes] = useState<SimpleHeroe[]>([]);
  const [heroesById, setHeroesById] = useState<HeroesById>({});
  const [favorites, setFavorites] = useState<SimpleHeroe[]>([]);

  useEffect(() => {
    setFavoritesIds(JSON.parse(localStorage.getItem("favorites") ?? '[]') as number[])
    _setHeroes(JSON.parse(localStorage.getItem("heroes") ?? '[]') as SimpleHeroe[])
  }, [])

  useEffect(() => {
    setHeroesById(keyBy(heroes, 'id'));
  }, [heroes]);

  useEffect(() => {
    setFavorites(favoritesIds.map((id) => heroesById[id]))
    localStorage.setItem("favorites", JSON.stringify(favoritesIds));
  }, [favoritesIds]);

  const setHeroes = (heroes: SimpleHeroe[]) => {
    _setHeroes(heroes);

    localStorage.setItem("heroes", JSON.stringify(heroes));
  }

  const addFavorite = (heroe: SimpleHeroe) => {
    if (! favoritesIds.includes(heroe.id)) {
      setFavoritesIds((prev) => [...prev, heroe.id]);
    }
  };

  const removeFavorite = (heroeId: number) => {
    setFavoritesIds((prev) => prev.filter((id) => id !== heroeId));
  };

  const favoritesCount = favoritesIds.length;

  return (
    <HeroesContext.Provider
      value={{ heroes, heroesById, setHeroes, favorites, favoritesIds, addFavorite, removeFavorite, favoritesCount }}
    >
      {children}
    </HeroesContext.Provider>
  );
};
