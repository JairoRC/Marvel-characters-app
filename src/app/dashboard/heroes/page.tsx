"use client";

import React, { useState, useEffect } from "react";
import { HeroeGrid, HeroesResponse, SimpleHeroe } from "@/heroes";
import { SearchBar } from "@/components/SearchBar/SearchBar";
import { getHeroes } from "@/services/heroesApi";
import { Loading } from "@/components";
import style from "./Heroes.module.css";
import { useHeroes } from "../../../context/HeroesContext";

export default function HeroesPage() {
  const heroesContext = useHeroes();
  const [filteredHeroes, setFilteredHeroes] = useState<SimpleHeroe[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    (async () => {
      if (heroesContext.heroes.length === 0) {
        try {
          setIsLoading(true);
          heroesContext.setHeroes(await getHeroes());
        } catch (error) {
          console.error("Error fetching heroes:", error);
        } finally {
          setIsLoading(false);
        }
      }

      setFilteredHeroes(heroesContext.heroes);
    })();
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredHeroes(heroesContext.heroes);
    } else {
      setFilteredHeroes(
        heroesContext.heroes.filter((heroe) =>
          heroe.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, heroesContext.heroes]);

  return (
    <div className={style["heroe-container"]}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <SearchBar
            onSearch={setSearchTerm}
            displayedHeroes={filteredHeroes.length}
          />
          <HeroeGrid heroes={filteredHeroes} />
        </>
      )}
    </div>
  );
}
