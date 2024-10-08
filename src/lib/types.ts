
export type Profile = {
  connection: string;
  picture_search: string;
  todos_showactive: boolean;
  graphql_endpoint: string;
  dark_mode: string;
};

export type Book = {
  id: string;
  name: string;
  like: number;
};

export type Todo = {
  id: string;
  text: string;
  completed: boolean;
}

export type PictureUnsplash = {
  id: string;
  urls: {
    full: string;
    small: string;
  };
  alt_description: string;
};

export type GraphqlOperation = {
  id: string;
  name: string;
  query: string;
  variables: object | undefined;
  headers: HeadersInit | undefined;
}

export type GraphqlGetOperations = {
  data: Array<GraphqlOperation>;
};

export type GraphqlAddOperation = {
  data: GraphqlOperation;
  variables: Omit<GraphqlOperation, "id">;
}

export type GraphqlUpdateOperation = {
  data: GraphqlOperation;
  variables: Omit<GraphqlOperation, "id">;
};

export type GraphqlDeleteOperation = {
  data: GraphqlOperation;
  variables: string;
};

export type ProfileOperation = {
  data: Profile;
};

export type ProfileUpdateOperation = {
  data: Profile;
  variables: Profile;
};

export type BooksGetOperation = {
  data: Array<Book>;
};

export type BookCreateOperation = {
  data: Book;
  variables: Omit<Book, "id">;
};

export type BookDeleteOperation = {
  data: Book;
  variables: string;
};

export type BookUpdateOperation = {
  data: Book;
  variables: Omit<Book, "id">;
};

export type TodosGetOperation = {
  data: Array<Todo>;
};

export type TodoCreateOperation = {
  data: Todo;
  variables: Omit<Todo, "id">;
};

export type TodoUpdateOperation = {
  data: Todo;
  variables: Omit<Todo, "id">;
};
export type TodoDeleteOperation = {
  data: Todo;
  variables: string;
};

////////////////////////////////////////////////////////////////////

// export type ProfileData = {
//   type: string;
//   picture_search?: string;
// };

// export type JsonSeverData = {
//   type: "todos"|"books"|"profile"|"cooler_pads";
//   payload?: BookData | ProfileData | TodosData;
// };

// export type BookData = {
//   type: string; //"create-book" | "get-books" | "delete-book" | "edit-book";
//   name?: string;
//   id?: string;
//   like?: number;
// }

// export type TodosData = {
//   type: string;
//   id?: string;
//   text?: string;
//   completed?: boolean;
//   showactive?: boolean;
// }

