"use client";
import Image from "next/image";
import Link from "next/link";
import { useHeroes } from "@/context/HeroesContext";
import style from "./NavBar.module.css";
import Like from "../../../public/like.svg";
import Logo from "../../../public/marvel-logo.svg";

export const NavBar: React.FC = () => {
  const favoritesCount = useHeroes()?.favoritesCount ?? 0;
  return (
    <div className={style["navBar-styled"]}>
      <div>
        <Link href="/">
          <Image
            width={100}
            height={100}
            src={Logo}
            priority
            alt="Marvel"
            className={style["marvel-icon"]}
          />
        </Link>
      </div>
      <div className={style["likeLink-styled"]}>
        <Link href="/dashboard/favoriteHeroes">
          <Image
            key={1}
            src={Like}
            width={24}
            height={22}
            alt="like"
            className={style["like-icon"]}
          />
          <span>{favoritesCount}</span>
        </Link>
      </div>
    </div>
  );
};
