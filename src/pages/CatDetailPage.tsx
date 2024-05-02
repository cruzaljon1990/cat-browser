import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Cat } from "../components/CatList";

export default function CatDetailPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [catDetail, setCatDetail] = useState<Cat>();
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/images/${id}`, {
        cache: 'no-cache'
      });

      const responseData = (await response.json());
      const { id: catId, url } = responseData;
      const { name, origin, temperament, description, id: breed } = responseData.breeds[0];
      setCatDetail({ id: catId, url, name, origin, temperament, description, breed });
      setIsLoading(false);
    })();

  }, [id]);


  return <div className='container max-w-[1000px] mx-auto space-y-4 py-10'>
    {catDetail && !isLoading && <div className='border rounded-md'>
      <div className='p-5'>
        <a href={`/?breed=${catDetail.breed}`} className='btn btn-primary'>Back</a>
      </div>
      <img src={catDetail.url} alt={catDetail.id} />
      <div className='p-5 flex flex-col space-y-2'>
        <h1 className='font-semibold text-2xl'>{catDetail.name}</h1>
        <h2 className='font-semibold text-xl'>Origin: {catDetail.origin}</h2>
        <h4 className='font-semibold'>{catDetail.temperament}</h4>
        <p>{catDetail.description}</p>
      </div>
    </div>}
    {isLoading && <p>Loading...</p>}
  </div>;
}