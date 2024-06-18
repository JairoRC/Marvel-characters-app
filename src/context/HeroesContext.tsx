"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { SimpleHeroe } from "../heroes/interfaces/simple-heroe";

interface HeroesContextType {
  favorites: SimpleHeroe[];
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
  const [favorites, setFavorites] = useState<SimpleHeroe[]>([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      try {
        const parsedFavorites = JSON.parse(savedFavorites);
        console.log("Loaded favorites from localStorage:", parsedFavorites);
        setFavorites(parsedFavorites);
      } catch (error) {
        console.error("Failed to parse favorites from localStorage", error);
      }
    }
  }, []);

  useEffect(() => {
    if (favorites.length > 0) {
      console.log("Saving favorites to localStorage:", favorites);
      localStorage.setItem("favorites", JSON.stringify(favorites));
    } else {
      localStorage.removeItem("favorites");
    }
  }, [favorites]);

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
      {children}
    </HeroesContext.Provider>
  );
};
