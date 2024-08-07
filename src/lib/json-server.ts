import axios from 'axios';

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

const jsonServerUrl = import.meta.env.VITE_JSONSERVER_URL;

const JsonServer = async(data: JsonSeverData) => {
  const bookData: BookData = data.payload!;
  switch (data.type){
    case "profile":
    {
      return await Profile (bookData);
    }
    
    case "books":
    {  
      
      return await BooksManagement (bookData);
    }
    case "todos":
    {  
      return await Todos (bookData);
      
    }
    default:
      return Error;
  }

};

const Todos = async(todosData: TodosData) =>{

  switch (todosData.type){

    case 'create-todo':
    {
      const response = await axios.post(jsonServerUrl+'/todos', {
        text:todosData.text, completed: todosData.completed
      });
      return response.data;
    }
    case 'get-todos':
    {
      const response = await axios.get(jsonServerUrl+'/todos');
      return response.data;
    }
    case 'edit-todo':
    {
      const response = await axios.put(`${jsonServerUrl}/todos/${todosData.id}`, {
        text: todosData.text, completed: todosData.completed
      });
      return response.data;
    }
    case 'delete-todo':
      await axios.delete(`${jsonServerUrl}/todos/${todosData.id}`);
      break; 

    case 'get-todos-showactive':
    {  
      const response = await axios.get(`${jsonServerUrl}/profile`);
      return response.data;
    }
    case 'edit-todos-showactive':
    {  
      const response = await axios.get(`${jsonServerUrl}/profile`);
      const newData = {...response.data, 'todos_showactive': todosData.showactive};
      await axios.put(jsonServerUrl+'/profile', newData);
      break;
    }
    default:
      throw new Error("Can't handle this command in Todos!");

  }

}

const Profile = async (profileData: ProfileData) => {

  switch (profileData.type)
  {
    case "connection":
    {
      try {
        const response = await fetch(jsonServerUrl+'/profile');
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        return json;
      } catch (error) {
        //console.error(error.message);
        return null;
      }
    }
    case 'edit-picturesearch':
    { 
      const response = await axios.get(`${jsonServerUrl}/profile`);
      const newData = {...response.data, 'picture_search': profileData.picture_search};
      await axios.put(`${jsonServerUrl}/profile`, newData);
      break;
    }

    case 'get-picturesearch':
    {
      const response = await axios.get(`${jsonServerUrl}/profile`);
      return response.data;
    }
    default:
      throw new Error("Can't handle this command in Profile!");
  }
}

const BooksManagement = async(bookData: BookData)=>{

  switch (bookData.type){

    case 'create-book':
    {
      const response = await axios.post(jsonServerUrl+'/books', {
        name: bookData.name, like: 0
      });
      return response.data;
    }

    case 'get-books':
    {
      const response = await axios.get(jsonServerUrl+'/books');
      return response.data;
    }
    case 'delete-book':
      await axios.delete(`${jsonServerUrl}/books/${bookData.id}`);
      break;

    case 'edit-book':
    {
      const response = await axios.put(`${jsonServerUrl}/books/${bookData.id}`, {
        name: bookData.name, like: bookData.like
      });
      return response.data;
    }
    default:
      throw new Error("Can't handle this command in Book Mangement!");
  }
}

export default JsonServer;