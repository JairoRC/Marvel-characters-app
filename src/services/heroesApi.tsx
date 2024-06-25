import {
  SimpleHeroe,
  HeroesResponse,
  ComicsDetails,
  ComicsResponse,
} from "@/heroes";

import CryptoJS from "crypto-js";

const limit = 50;
const baseURL = "https://gateway.marvel.com/v1/public/";

const ts = new Date().getTime().toString();
const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const privateKey = process.env.NEXT_PRIVATE_API_KEY;
if (!apiKey || !privateKey) {
  throw new Error(
    "API keys are not defined. Please check your environment variables."
  );
}
const hash = CryptoJS.MD5(ts + privateKey + apiKey).toString();

const params = new URLSearchParams({
  limit: limit.toString(),
  ts: ts,
  apikey: apiKey,
  hash: hash,
}).toString();

export const getHeroes = async (): Promise<SimpleHeroe[]> => {
  const url = `${baseURL}/characters?${params}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data: HeroesResponse = await response.json();

  return data.data.results.map((heroe) => ({
    id: heroe.id,
    name: heroe.name,
    thumbnail: heroe.thumbnail,
  }));
};

export const getComicDetails = async (
  heroId: number
): Promise<ComicsDetails[]> => {
  const url = `${baseURL}/characters/${heroId}/comics?${params}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data: ComicsResponse = await response.json();

  const comics = data.data.results.map((comic) => ({
    id: comic.id,
    title: comic.title,
    thumbnail: comic.thumbnail,
    description: comic.description,
    dates: comic.dates[0],
  }));

  return comics;
};
