"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { ComicsDetails, SimpleHeroe } from "@/heroes";
import { Loading } from "@/components";
import { getComicDetails, getHeroeDetails } from "@/services/heroesApi";
import { useHeroes } from "@/context/HeroesContext";
import style from "./HeroeDetails.module.css";
import Like from "../../../../../public/like.svg";
import Dislike from "../../../../../public/dislike.svg";

export interface Props {
  params: { id: string };
}

export default function HeroeDetailsPage({ params }: Props) {
  const heroesContext = useHeroes();
  const [heroe, setHeroe] = useState<SimpleHeroe>(heroesContext.heroesById[params.id]);

  const [comics, setComics] = useState<ComicsDetails[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { favoritesIds, addFavorite, removeFavorite } = useHeroes();

  const isFavorite = favoritesIds.includes(parseInt(params.id, 10));
  const comicContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchComicDetails = async () => {
      try {
        const fetchedComic = await getComicDetails(params.id);
        fetchedComic.forEach((comic) => {
          const date = comic.dates.date;
          const year = new Date(date).getFullYear();
          comic.dates.date = year.toString();
        });
        setComics(fetchedComic);
      } catch (error) {
        setError("Failed to fetch hero details.");
        console.error(error);
      }
    };

    fetchComicDetails();
  }, [params.id]);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      removeFavorite(Number(params.id));
    } else {
      if (heroe) addFavorite(heroe);
    }
  };

  const scrollLeft = () => {
    if (comicContainerRef.current) {
      comicContainerRef.current.scrollLeft -= 150;
    }
  };

  const scrollRight = () => {
    if (comicContainerRef.current) {
      comicContainerRef.current.scrollLeft += 150;
    }
  };

  return (
    <div className={style["hero-details-container"]}>
      <div>
        <div className={style["hero-details"]}>
          <Image
            src={`${heroe.thumbnail.path}.${heroe.thumbnail.extension}`}
            alt={heroe.name}
            width={300}
            height={300}
            priority={true}
            className={style["hero-image"]}
          />
          <div className={style["hero-info"]}>
            <div className={style["hero-name"]}>
              <h1 className={style["hero-text"]}>{heroe.name}</h1>
              {isFavorite ? (
                <div
                  className={style["icon-style"]}
                  onClick={handleFavoriteClick}
                >
                  <Image
                    key={1}
                    src={Like}
                    width={24}
                    height={22}
                    alt="like"
                    className={style["like-icon"]}
                  />
                </div>
              ) : (
                <div
                  className={style["icon-style"]}
                  onClick={handleFavoriteClick}
                >
                  <Image
                    key={2}
                    src={Dislike}
                    width={24}
                    height={22}
                    alt="dislike"
                    className={style["dislike-icon"]}
                  />
                </div>
              )}
            </div>
            <h2 className={style["hero-description"]}>{heroe.description}</h2>
          </div>
        </div>
      </div>
      <div className={style["comic-text"]}>COMICS</div>
      <div ref={comicContainerRef} className={style["comic-container"]}>
        <div>
          <div>
            <ul className={style["comics-list"]}>
              {comics.length !== 0 ? (
                comics.map((comic) => (
                  <div className="flex flex-col" key={comic.id}>
                    <div>
                      <button
                        onClick={scrollLeft}
                        className={`${style["scroll-left-button"]} ${style["scroll-button-web-only"]}`}
                      >
                        <svg
                          className=" w-8 h-8 font-bold transition duration-500 ease-in-out transform motion-reduce:transform-none text-gray-500 hover:text-gray-600 hover:-translate-x-0.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2.5"
                            d="M15 19l-7-7 7-7"
                          ></path>
                        </svg>
                      </button>
                    </div>
                    <li className={style["comic-image"]}>
                      <Image
                        key={comic.id}
                        src={
                          comic.thumbnail.path + "." + comic.thumbnail.extension
                        }
                        width={120}
                        height={120}
                        alt={comic.title}
                        priority={true}
                        className={style["comic-thumbnail"]}
                      />
                    </li>
                    <div className={style["comic-title"]}>{comic.title}</div>
                    <div className={style["comic-date"]}>
                      {comic.dates.date}
                    </div>
                    <div>
                      <button
                        onClick={scrollRight}
                        className={`${style["scroll-right-button"]} ${style["scroll-button-web-only"]}`}
                      >
                        <svg
                          className=" w-8 h-8 font-bold transition duration-500 ease-in-out transform motion-reduce:transform-none text-gray-500 hover:text-gray-600 hover:translate-x-0.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2.5"
                            d="M9 5l7 7-7 7"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <>
                  {loading ? (
                    <div className={style["comic-title"]}>CARGANDO...</div>
                  ) : (
                    <div className={style["comic-title"]}>
                      SIN COMICS DISPONIBLES
                    </div>
                  )}
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
