import { useState, useEffect } from 'react';
import { RxMagnifyingGlass } from "react-icons/rx";
import searchUnsplash from '../lib/unsplash';
import { getPictureSearchTerm, updatePictureSearchTerm } from '../lib/json-server';
import { PictureUnsplash } from '../lib/types';


export default function PictureSearchPage() {

  const [term, setTerm] = useState('');
  const [images, setImages] = useState<Array<unknown> | null>([]);

  const handleSubmit = async (newTerm: string) => {
    const result = await searchUnsplash(newTerm);
    if (typeof result === 'object' && Array.isArray(result))
    {
      setImages (result);
      setTerm (newTerm);
      //console.log ('newTerm: '+ newTerm);
      await updatePictureSearchTerm (newTerm);
    }
  };

  const fetchSearch = async()=>{
    const res = await getPictureSearchTerm();
    //console.log (res);
    if (!res)
      return;
    setTerm (res);
    const result = await searchUnsplash(res);
    if (typeof result === 'object' && Array.isArray(result))
      setImages (result);
  }

  useEffect (()=>{
    fetchSearch();
  },[]);

  return (
    <div className="p-6 md:p-10">
      <div className="flex w-full items-center justify-between">
        <h1 className={"text-4xl text-blue-700 font-serif font-bold"}>Picture Search</h1>
      </div>
      <SearchBar onSubmit={handleSubmit} term={term}/>
      <br/>
      <ImageList images={images} />
    </div>
  );
}

function ImageList ({images}: {images: Array<unknown> | null}) {
  console.log(images);
  const isPictureUnsplash = (value: unknown): value is PictureUnsplash => !!value && typeof value === 'object' && 'urls' in value && typeof (value as PictureUnsplash).id === 'string'

  function ImageItem({image}:{image: PictureUnsplash}) {
    return (
      <div className="my-1 transition duration-300 ease-in-out hover:scale-105">
        <a href={image.urls.full} target="_blank" rel="noopener noreferrer">
          <img src={image.urls.small} alt={image.alt_description} />
        </a>
      </div>
    );

  }
  if (images && typeof images === 'object' && Array.isArray(images))
  {
    const renderedImages = images.map((image) => {
      if (isPictureUnsplash(image))
        return <ImageItem key={image.id} image={image} />;
    });

    return (
      <div 
        className="columns-2 gap-1 md:columns-4 lg:columns-6"
      >
        {renderedImages}
      </div>
    );
  }
  return <></>;
}

function SearchBar({onSubmit, term}: {onSubmit: (newTerm: string)=>void, term: string}) {

  const [Input, setInput] = useState(term);

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(Input);
    setInput ('');
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="mt-4 flex justify-between gap-2 md:mt-8">
        <div className="relative flex flex-1 ">
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <input 
            className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 focus:outline-none focus:ring focus:border-blue-500  "
            placeholder={term} 
            value={Input} 
            onChange={handleChange} 
            id="search"
          />
          <RxMagnifyingGlass className="absolute left-3 top-5 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        </div> 
        <button 
          className="flex h-10 items-center justify-center rounded-lg bg-blue-600 px-4 font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:bg-gray-400"
          disabled={Input===''}
        >
          <span className="hidden md:block">Search Picture</span>{' '}
          <RxMagnifyingGlass className="md:ml-4" />
        </button>
        
      </div>
    </form>
  );
}


