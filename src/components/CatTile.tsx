import { ReactNode } from "react";
import { Cat } from "./CatList";

interface Props {
  cat: Cat;
}

export function CatTile({ cat }: Props): ReactNode {
  return <div className='w-full'>
    <div className="border rounded-lg overflow-hidden">
      <img className='object-cover' src={cat.url} alt={cat.id} />
      <div className='p-5 rounded flex justify-center'>
        <a href={'/' + cat.id} className='btn btn-primary w-full'>View Details</a>
      </div>
    </div>
  </div>;
}