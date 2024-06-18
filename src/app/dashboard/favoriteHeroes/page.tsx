"use client";
import React, { useState, useEffect } from "react";
import { HeroeGrid, HeroesResponse, SimpleHeroe } from "@/heroes";
import { useHeroes } from "@/context/HeroesContext";
import { SearchBar } from "@/components/SearchBar/SearchBar";
import style from "./FavoriteHeroes.module.css";

export default function FavoritesHeroesPage() {
  const favorites = useHeroes()?.favorites ?? undefined;
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredHeroes, setFilteredHeroes] = useState<SimpleHeroe[]>([]);
  console.log(favorites, "Fav");

  useEffect(() => {
    if (favorites) {
      if (searchTerm === "") {
        setFilteredHeroes(favorites);
      } else {
        setFilteredHeroes(
          favorites.filter((heroe) =>
            heroe.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
        );
      }
    }
  }, [searchTerm, favorites]);

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
