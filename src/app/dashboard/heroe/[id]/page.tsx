"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ComicsDetails, SimpleHeroe } from "@/heroes";
import { Loading } from "@/components";
import { getComicDetails, getHeroeDetails } from "@/services/heroesApi";
import { useHeroes } from "@/context/HeroesContext";
import style from "./HeroeDetails.module.css";
import Like from "../../../../../public/like.svg";
import Dislike from "../../../../../public/dislike.svg";

interface Props {
  params: { id: number };
}

export default function HeroeDetailsPage({ params }: Props) {
  const [heroe, setHeroe] = useState<SimpleHeroe | null>(null);
  const [comics, setComics] = useState<ComicsDetails[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { favorites, addFavorite, removeFavorite } = useHeroes();

  const isFavorite = favorites.some(
    (favHeroe: { id: number }) => favHeroe.id == params.id
  );

  useEffect(() => {
    const fetchHeroDetails = async () => {
      try {
        const fetchedHero = await getHeroeDetails(params.id);
        setHeroe(fetchedHero[0]);
      } catch (error) {
        setError("Failed to fetch hero details.");
        console.error(error);
      }
    };
    const fetchComicDetails = async () => {
      try {
        setLoading(true);
        const fetchedComic = await getComicDetails(params.id);
        fetchedComic.forEach((comic) => {
          const date = comic.dates.date;
          const year = new Date(date).getFullYear();
          comic.dates.date = year.toString();
        });
        setComics(fetchedComic);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch hero details.");
        setLoading(false);
        console.error(error);
      }
    };
    fetchHeroDetails();
    fetchComicDetails();
  }, [params.id]);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      removeFavorite(Number(params.id));
    } else {
      if (heroe) addFavorite(heroe);
    }
  };

  return (
    <div className={style["hero-details-container"]}>
      <div>
        {heroe ? (
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
        ) : (
          <Loading />
        )}
      </div>
      <div className={style["comic-text"]}>COMICS</div>
      <div className={style["comic-container"]}>
        <div>
          <div>
            <ul className={style["comics-list"]}>
              {comics.length !== 0 ? (
                comics.map((comic) => (
                  <div className="flex flex-col" key={comic.id}>
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
