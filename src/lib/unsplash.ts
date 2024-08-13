import axios from 'axios';

const unsplashURL = import.meta.env.VITE_UNSPLASH_URL;
const key = import.meta.env.VITE_UNSPLASH_API_TOKEN;

// limitation: 50 API visits per minute
async function searchUnsplash (term: string): Promise<Array<unknown> | undefined> {

  const response = await axios.get (unsplashURL, {
    headers: {
      Authorization: key,
    },
    params: {
      query: term,
    },
  });

  if (!response.data.results) 
    return undefined;

  return response.data.results;

}

export default searchUnsplash;