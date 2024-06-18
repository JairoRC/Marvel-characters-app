"use client";

import React, { CSSProperties } from "react";
import Link from "next/link";
import Image from "next/image";
import { SimpleHeroe } from "../interfaces/simple-heroe";
import { useHeroes } from "../../context/HeroesContext";
import _ from "lodash";
import style from "./styles/HeroeCard.module.css";
import Like from "../../../public/like.svg";
import Dislike from "../../../public/dislike.svg";

interface Props {
  heroe: SimpleHeroe;
}

export const HeroeCard = ({ heroe }: Props) => {
  const { id, name, thumbnail } = heroe;
  const finalName = _.split(name, "(", 1)[0].trim();
  const { favorites, addFavorite, removeFavorite } = useHeroes();

  const isFavorite = favorites.some(
    (favHeroe: { id: number }) => favHeroe.id === id
  );

  const handleFavoriteClick = () => {
    if (isFavorite) {
      removeFavorite(id);
    } else {
      addFavorite(heroe);
    }
  };

  return (
    <div className={style["heroe-card"]}>
      <Link href={`heroe/${id}`}>
        <Image
          key={heroe.id}
          src={thumbnail.path + "." + thumbnail.extension}
          width={0}
          height={0}
          alt={heroe.name}
          sizes="100dvh"
          className="w-48 h-48"
        />
      </Link>
      <div className={style["divider"]}></div>
      <div className={style["heroe-card-content"]}>
        <p className={style["heroe-card-name"]}>{finalName}</p>
        <div className={style["heroe-card-like"]} onClick={handleFavoriteClick}>
          {isFavorite ? (
            <Image
              key={1}
              src={Like}
              width={15}
              height={15}
              alt="like"
              className={style["like-icon"]}
            />
          ) : (
            <Image
              key={2}
              src={Dislike}
              width={15}
              height={15}
              alt="dislike"
              className={style["dislike-icon"]}
            />
          )}
        </div>
      </div>
      <div className={style["corner-cut"]} />
    </div>
  );
};
