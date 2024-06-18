import { DateElement, Thumbnail } from "./comics-response";

export interface ComicsDetails {
  id: number;
  title: string;
  thumbnail: Thumbnail;
  dates: DateElement;
}
