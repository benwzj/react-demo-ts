
export type Profile = {
  connection: string;
  picture_search: string;
  todos_showactive: boolean;
};

export type ProfileOperation = {
  data: Profile;
}

export type ConnectionOperation = {
  data: Profile;
}

export type PictureSearchOperation = {
  data: Profile;
}

export type PictureSearchUpdateOperation = {
  data: Profile;
  variables: Profile;
}

export type JsonSeverData = {
  type: "todos"|"books"|"profile"|"cooler_pads";
  payload?: BookData | ProfileData | TodosData;
};

export type BookData = {
  type: string; //"create-book" | "get-books" | "delete-book" | "edit-book";
  name?: string;
  id?: string;
  like?: number;
}

export type ProfileData = {
  type: string;
  picture_search?: string;
}

export type TodosData = {
  type: string;
  id?: string;
  text?: string;
  completed?: boolean;
  showactive?: boolean;
}
