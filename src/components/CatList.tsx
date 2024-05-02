import { ReactNode } from "react";
import { CatTile } from "./CatTile";

export interface Cat {
  id: string;
  url?: string;
  name?: string;
  origin?: string;
  temperament?: string;
  description?: string;
  breed?: string;
}

interface Props {
  cats: Cat[];
}

export function CatList({ cats }: Props): ReactNode {
  return (
    <div className='grid grid-cols-4 gap-x-8 gap-y-4'>
      {cats.length > 0 && cats.map((cat, index) => <CatTile cat={cat} key={index} />)}
    </div>
  );
}