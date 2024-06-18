import { Comics, Thumbnail } from "./hereoes-response";

export interface SimpleHeroe {
  id: number;
  name: string;
  thumbnail: Thumbnail;
  comics?: Comics;
  description?: string;
}
