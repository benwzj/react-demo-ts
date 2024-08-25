import {
  ProfileOperation,
  PictureSearchUpdateOperation,
  Book,
  BooksGetOperation,
  BookCreateOperation,
  BookDeleteOperation,
  BookUpdateOperation,
  Todo,
  TodosGetOperation,
  TodoCreateOperation,
  TodoDeleteOperation,
  TodoUpdateOperation,
  GraphqlOperation,
  GraphqlGetOperations,
  GraphqlUpdateOperation,
  GraphqlAddOperation,
  GraphqlDeleteOperation
} from './types';

const jsonServerUrl = import.meta.env.VITE_JSONSERVER_URL;

type ExtractVariables<T> = T extends { variables: object } ? T['variables'] : never;
type ExtractData<T> = T extends { data: object } ? T['data'] : never;

async function jsonserverFetch<T>({
  method = 'GET',
  url,
  headers,
  variables
}: {
  method: string;
  url: string;
  headers?: HeadersInit;
  variables?: ExtractVariables<T>;
}): Promise<{ status: number; body: ExtractData<T> } | never>  {
  try {
    const requestOptions: Record<string, unknown> =  {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    }
    if (variables) requestOptions.body = JSON.stringify(variables);
    const result = await fetch (url, requestOptions);

    const body = await result.json();

    return {
      status: result.status,
      body
    };
  } catch (e) {
    throw {
      error: e,
      url
    };
  }
}

export async function getConnection(): Promise<string | undefined> {
  const res = await jsonserverFetch<ProfileOperation> ({
    method: 'GET',
    url: jsonServerUrl + '/profile'
  });
  if (res.body.connection) {
    return res.body.connection;
  }
  return undefined;
}

export async function getPictureSearchTerm(): Promise<string | undefined> {
  const res = await jsonserverFetch<ProfileOperation>({
    method: 'GET',
    url: jsonServerUrl + '/profile'
  });

  if (res.body.picture_search) {
    return res.body.picture_search;
  }
  return undefined;
}

export async function updatePictureSearchTerm(
  picture_search: string
): Promise<string | undefined> {
  const res = await jsonserverFetch<ProfileOperation>({
    method: 'GET',
    url: jsonServerUrl + '/profile'
  });

  if (!res.body) {
    return undefined;
  }
  const newProfile = {...res.body, 'picture_search': picture_search};
  const res2 = await jsonserverFetch<PictureSearchUpdateOperation>({
    method: 'PUT',
    url: jsonServerUrl + '/profile',
    variables: newProfile
  });
  if (res2.body.picture_search) {
    return res2.body.picture_search;
  }
  return undefined;

}

export async function getBooks(): Promise<Array<Book> | undefined> {
  const res = await jsonserverFetch<BooksGetOperation>({
    method: 'GET',
    url: jsonServerUrl + '/books'
  });

  if (res.body) {
    return res.body;
  }
  return undefined;
}

export async function createBook(book: Omit<Book, "id">): Promise<Book | undefined> {
  const res = await jsonserverFetch<BookCreateOperation>({
    method: 'POST',
    url: jsonServerUrl + '/books',
    variables: book
  });
  if (res.body) {
    return res.body;
  }
  return undefined;
}

export async function deleteBook(id: string): Promise<Book | undefined> {
  const res = await jsonserverFetch<BookDeleteOperation>({
    method: 'DELETE',
    url: jsonServerUrl + '/books/' + id,
  });
  if (res.body) {
    return res.body;
  }
  return undefined;
}

export async function updateBook(book: Book): Promise<Book | undefined> {
  const res = await jsonserverFetch<BookUpdateOperation>({
    method: 'PUT',
    url: jsonServerUrl + '/books/' + book.id,
    variables: {name: book.name, like: book.like}
  });
  if (res.body) {
    return res.body;
  }
  return undefined;
}

export async function getTodos(): Promise<Array<Todo> | undefined> {
  const res = await jsonserverFetch<TodosGetOperation>({
    method: 'GET',
    url: jsonServerUrl + '/todos'
  });

  if (res.body) {
    return res.body;
  }
  return undefined;
}

export async function createTodo(todo: Omit<Todo, "id">): Promise<Todo | undefined> {
  const res = await jsonserverFetch<TodoCreateOperation>({
    method: 'POST',
    url: jsonServerUrl + '/todos',
    variables: todo
  });
  if (res.body) {
    return res.body;
  }
  return undefined;
}

export async function deleteTodo(id: string): Promise<Todo | undefined> {
  const res = await jsonserverFetch<TodoDeleteOperation>({
    method: 'DELETE',
    url: jsonServerUrl + '/todos/' + id,
  });
  if (res.body) {
    return res.body;
  }
  return undefined;
}

export async function updateTodo(todo: Todo): Promise<Todo | undefined> {
  const res = await jsonserverFetch<TodoUpdateOperation>({
    method: 'PUT',
    url: jsonServerUrl + '/todos/' + todo.id,
    variables: {text: todo.text, completed: todo.completed}
  });
  console.log('updateTodo: ')
  console.log(res)
  if (res.body) {
    return res.body;
  }
  return undefined;
}

export async function getTodoShowActive(): Promise<boolean | undefined> {
  const res = await jsonserverFetch<ProfileOperation>({
    method: 'GET',
    url: jsonServerUrl + '/profile'
  });

  if (res.body.todos_showactive) {
    return res.body.todos_showactive;
  }
  return undefined;
}

export async function updateTodoShowActive(
  todos_showactive: boolean
): Promise<boolean | undefined> {
  const res = await jsonserverFetch<ProfileOperation>({
    method: 'GET',
    url: jsonServerUrl + '/profile'
  });

  if (!res.body) {
    return undefined;
  }
  const newProfile = {...res.body, 'todos_showactive': todos_showactive};
  const res2 = await jsonserverFetch<PictureSearchUpdateOperation>({
    method: 'PUT',
    url: jsonServerUrl + '/profile',
    variables: newProfile
  });
  if (res2.body.todos_showactive) {
    return res2.body.todos_showactive;
  }
  return undefined;

}


export async function getGraphqlEndpoint(): Promise<string | undefined> {
  const res = await jsonserverFetch<ProfileOperation> ({
    method: 'GET',
    url: jsonServerUrl + '/profile'
  });
  if (res.body.graphql_endpoint) {
    return res.body.graphql_endpoint;
  }
  return undefined;
}

export async function getGraphqlOperations()
: Promise<Array<GraphqlOperation> | undefined> {

  const res = await jsonserverFetch<GraphqlGetOperations>({
    method: 'GET',
    url: jsonServerUrl + '/graphql_operations'
  });

  if (res.body) {
    return res.body;
  }
  return undefined;
}

export async function updateGraphqlOperation(
  operation: GraphqlOperation
): Promise<GraphqlOperation | undefined> {

  const {id, name, query, variables, headers} = operation;
  const res = await jsonserverFetch<GraphqlUpdateOperation>({
    method: 'PUT',
    url: jsonServerUrl + '/graphql_operations/' + id,
    variables: {name, query, variables, headers}
  });

  if (res.body) {
    return res.body;
  }
  return undefined;
}

export async function addGraphqlOperation(
  operation: Omit<GraphqlOperation, 'id'>
): Promise<GraphqlOperation | undefined> {

  const {name, query, variables, headers} = operation;
  const res = await jsonserverFetch<GraphqlAddOperation>({
    method: 'POST',
    url: jsonServerUrl + '/graphql_operations',
    variables: {name, query, variables, headers}
  });

  if (res.body) {
    return res.body;
  }
  return undefined;
}


export async function deleteGraphqlOperation(
  id: string
): Promise<GraphqlOperation | undefined> {

  const res = await jsonserverFetch<GraphqlDeleteOperation>({
    method: 'DELETE',
    url: jsonServerUrl + '/graphql_operations/' + id,
  });

  if (res.body) {
    return res.body;
  }
  return undefined;
}
