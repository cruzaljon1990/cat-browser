import { ReactNode, useEffect, useState } from "react";

interface Props {
  onChangeHandler: (newSelectedBreed: string) => void;
  selectedBreed?: string;
}

export interface Breed {
  id: string;
  name: string;
}

export function BreedSelect({ onChangeHandler, selectedBreed }: Props): ReactNode {
  const [breeds, setBreeds] = useState<Breed[]>([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/breeds`);

      setBreeds((await response.json()).map((breed: Breed) => {
        const { id, name } = breed;
        return { id, name };
      }));
    })();
  }, []);

  return (
    <select className='px-4 py-2 rounded border outline-none' value={selectedBreed} onChange={(e) => {
      onChangeHandler(e.target.value);
    }}>
      <option value="">Select breed</option>
      {breeds.length > 0 && breeds.map(({ id, name }: Breed) => <option key={id} value={id}>{name}</option>)}
    </select>
  );
}