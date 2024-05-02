import { useCallback, useEffect, useRef, useState } from "react";
import { BreedSelect } from "../components/BreedSelect";
import { Cat, CatList } from "../components/CatList";
import { useSearchParams } from "react-router-dom";

function useQuery(key: string) {
  const [searchParams] = useSearchParams();
  return searchParams.get(key);
}

export default function CatPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadMoreButtonVisible, setIsLoadMoreButtonVisible] = useState<boolean>(true);
  const [cats, setCats] = useState<Cat[]>([]);
  const [selectedBreed, setSelectedBreed] = useState<string>('');
  const breed = useQuery('breed');
  const page = useRef(1);

  function breedSelectOnChangeHandler(newSelectedBreed: string): void {
    setSelectedBreed(newSelectedBreed);
  }

  async function loadMore() {
    setIsLoading(true);
    page.current += 1;
    const responseData = await fetchCats(page.current);
    setCats(prevCats => {
      const nonExistingCats: Cat[] = responseData.filter((cat: Cat) => {
        return prevCats.filter((prevCat: Cat) => {
          return prevCat.id == cat.id;
        }).length == 0;
      });

      if (nonExistingCats.length == 0) {
        setIsLoadMoreButtonVisible(false);
        return prevCats;
      } else {
        return [...prevCats, ...nonExistingCats.map((cat: Cat) => {
          const { id, url } = cat;
          return { id, url };
        })];
      }
    });
    setIsLoading(false);
  }

  const fetchCats = useCallback(async (page: number = 1) => {
    const urlParams = new URLSearchParams();
    urlParams.append('limit', 10 + '');
    urlParams.append('page', page + '');
    urlParams.append('breed_id', selectedBreed);
    const response = await fetch(`${import.meta.env.VITE_API_URL}/images/search?${urlParams}`, {
      cache: 'no-cache'
    });
    return await response.json();
  }, [selectedBreed]);

  useEffect(() => {
    setIsLoadMoreButtonVisible(cats.length > 0);
  }, [cats]);

  useEffect(() => {
    if (breed) {
      setSelectedBreed(breed);
    }
  }, [breed]);

  useEffect(() => {
    if (selectedBreed?.length === 0) {
      setCats([]);
    } else {
      (async () => {
        setIsLoading(true);
        page.current = 1;
        const responseData = await fetchCats(page.current);

        setCats(responseData.map((cat: Cat) => {
          const { id, url } = cat;
          return { id, url };
        }));
        setIsLoading(false);
      })();
    }
  }, [selectedBreed, fetchCats]);

  return (<div className='container max-w-[1000px] mx-auto space-y-4 py-10'>
    <h1 className='text-4xl font-semibold'>Cat Browser</h1>
    <BreedSelect selectedBreed={selectedBreed} onChangeHandler={breedSelectOnChangeHandler} />
    <CatList cats={cats} />
    {cats.length == 0 && <p>No cats available</p>}
    {isLoadMoreButtonVisible &&
      <button
        type='button'
        className='btn btn-success'
        disabled={isLoading}
        onClick={() => loadMore()}
      >{isLoading ? 'Loading...' : 'Load More'}</button>}
  </div>);
}