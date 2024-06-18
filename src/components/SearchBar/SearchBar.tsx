import React, { useState } from "react";
import Image from "next/image";
import Search from "../../../public/search.svg";
import style from "./SearchBar.module.css";

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
  displayedHeroes: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  displayedHeroes,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
    onSearch(term);
  };

  return (
    <div className={style["search-bar"]}>
      <div className={style["search-box"]}>
        <Image
          width={18}
          height={18}
          src={Search}
          alt="Busqueda"
          className={style["search-icon"]}
        />
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="SEARCH A CHARACTER..."
          className={style["search-input"]}
        />
      </div>
      <div className={style["divider"]}></div>
      <p className={style["text"]}>{displayedHeroes} RESULTS</p>
    </div>
  );
};
