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
  TodoUpdateOperation
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
// async function JsonServer(data: JsonSeverData){
//   const bookData: BookData = data.payload!;
//   switch (data.type){
//     case "profile":
//     {
//       return await Profile (bookData);
//     }
    
//     case "books":
//     {  
      
//       return await BooksManagement (bookData);
//     }
//     case "todos":
//     {  
//       return await Todos (bookData);
      
//     }
//     default:
//       return Error;
//   }
// }

// const Todos = async(todosData: TodosData) =>{

//   switch (todosData.type){

//     case 'create-todo':
//     {
//       const response = await axios.post(jsonServerUrl+'/todos', {
//         text:todosData.text, completed: todosData.completed
//       });
//       return response.data;
//     }
//     case 'get-todos':
//     {
//       const response = await axios.get(jsonServerUrl+'/todos');
//       return response.data;
//     }
//     case 'edit-todo':
//     {
//       const response = await axios.put(`${jsonServerUrl}/todos/${todosData.id}`, {
//         text: todosData.text, completed: todosData.completed
//       });
//       return response.data;
//     }
//     case 'delete-todo':
//       await axios.delete(`${jsonServerUrl}/todos/${todosData.id}`);
//       break; 

//     case 'get-todos-showactive':
//     {  
//       const response = await axios.get(`${jsonServerUrl}/profile`);
//       return response.data;
//     }
//     case 'edit-todos-showactive':
//     {  
//       const response = await axios.get(`${jsonServerUrl}/profile`);
//       const newData = {...response.data, 'todos_showactive': todosData.showactive};
//       await axios.put(jsonServerUrl+'/profile', newData);
//       break;
//     }
//     default:
//       throw new Error("Can't handle this command in Todos!");

//   }
// }

// const Profile = async (profileData: ProfileData) => {

//   switch (profileData.type)
//   {
//     case "connection":
//     {
//       try {
//         const response = await fetch(jsonServerUrl+'/profile');
//         if (!response.ok) {
//           throw new Error(`Response status: ${response.status}`);
//         }
//         const jsonResponse = await response.json();
//         return jsonResponse;
//       } catch (error) {
//         //console.error(error.message);
//         return null;
//       }
//     }
//     case 'edit-picturesearch':
//     { 
//       const response = await fetch(`${jsonServerUrl}/profile`);
//       if (!response.ok) {
//         throw new Error(`Response status: ${response.status}`);
//       }
//       const jsonResponse = await response.json();
//       const newData = {...jsonResponse, 'picture_search': profileData.picture_search};
//       await axios.put(`${jsonServerUrl}/profile`, newData);
//       break;
//     }

//     case 'get-picturesearch':
//     {
//       const response = await axios.get(`${jsonServerUrl}/profile`);
//       return response.data;
//     }
//     default:
//       throw new Error("Can't handle this command in Profile!");
//   }
// }

// const BooksManagement = async(bookData: BookData)=>{

//   switch (bookData.type){

//     case 'create-book':
//     {
//       const response = await axios.post(jsonServerUrl+'/books', {
//         name: bookData.name, like: 0
//       });
//       return response.data;
//     }

//     case 'get-books':
//     {
//       const response = await axios.get(jsonServerUrl+'/books');
//       return response.data;
//     }
//     case 'delete-book':
//       await axios.delete(`${jsonServerUrl}/books/${bookData.id}`);
//       break;

//     case 'edit-book':
//     {
//       const response = await axios.put(`${jsonServerUrl}/books/${bookData.id}`, {
//         name: bookData.name, like: bookData.like
//       });
//       return response.data;
//     }
//     default:
//       throw new Error("Can't handle this command in Book Mangement!");
//   }
// }

// export default JsonServer;