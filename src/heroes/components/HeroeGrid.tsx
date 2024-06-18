import { SimpleHeroe } from "../interfaces/simple-heroe";
import { HeroeCard } from "./HeroeCard";
import style from "./styles/HeroeGrid.module.css";

interface Props {
  heroes: SimpleHeroe[];
}

export const HeroeGrid = ({ heroes }: Props) => {
  return (
    <div className={style["heroe-grid"]} data-testid="heroe-grid">
      {heroes.map((heroe) => (
        <HeroeCard key={heroe.id} heroe={heroe} />
      ))}
    </div>
  );
};
