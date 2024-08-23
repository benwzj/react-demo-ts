
export async function graqhqlFetch({
  endpoint,
  query,
  variables,
  headers
}: {
  endpoint: string;
  query: string;
  variables?: object;
  headers?: HeadersInit;
}): Promise< unknown | undefined > {
  try{
    const result = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      body: JSON.stringify({
        ...(query && { query }),
        ...(variables && { variables })
      }),
    });
    const body = await result.json();

    if (body.errors) {
      return undefined;
    }

    return body;
  }catch(e){
    throw {
      error: e,
      query
    };
  }
}
