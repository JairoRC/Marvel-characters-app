"use client";

import React, { useState, useEffect } from "react";
import { HeroeGrid, HeroesResponse, SimpleHeroe } from "@/heroes";
import { SearchBar } from "@/components/SearchBar/SearchBar";
import { getHeroes } from "@/services/heroesApi";
import { Loading } from "@/components";
import style from "./Heroes.module.css";

export default function HeroesPage() {
  const [heroes, setHeroes] = useState<SimpleHeroe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredHeroes, setFilteredHeroes] = useState<SimpleHeroe[]>([]);

  useEffect(() => {
    const fetchHeroes = async () => {
      try {
        const fetchedHeroes = await getHeroes();
        setHeroes(fetchedHeroes);
        setFilteredHeroes(fetchedHeroes);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching heroes:", error);
        setIsLoading(false);
      }
    };

    fetchHeroes();
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredHeroes(heroes);
    } else {
      setFilteredHeroes(
        heroes.filter((heroe) =>
          heroe.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, heroes]);

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
