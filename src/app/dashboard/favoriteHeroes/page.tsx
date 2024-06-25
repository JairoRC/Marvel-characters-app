"use client";
import React, { useState, useEffect } from "react";
import { HeroeGrid, HeroesResponse, SimpleHeroe } from "@/heroes";
import { useHeroes } from "@/context/HeroesContext";
import { SearchBar } from "@/components/SearchBar/SearchBar";
import style from "./FavoriteHeroes.module.css";

export default function FavoritesHeroesPage() {
  const heroesContext = useHeroes();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredHeroes, setFilteredHeroes] = useState<SimpleHeroe[]>([]);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredHeroes(heroesContext.favorites);
    } else {
      setFilteredHeroes(
        heroesContext.favorites.filter((heroe) =>
          heroe.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, heroesContext.favorites]);

  return (
    <div className={style["favorite-page"]}>
      <div className={style["title"]}>
        <p>Favorites</p>
      </div>
      <SearchBar
        onSearch={setSearchTerm}
        displayedHeroes={filteredHeroes.length}
      />
      <HeroeGrid heroes={filteredHeroes} />
    </div>
  );
}
