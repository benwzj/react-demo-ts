import { useState, useEffect } from 'react';
import { 
  getBooks, 
  createBook, 
  deleteBook,
  updateBook } from '../lib/json-server';
import { Book } from '../lib/types';
import { IoIosAdd } from "react-icons/io";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { BiLike } from "react-icons/bi";


export default function BooksManagePage() {
  const [books, setBooks] = useState<Array<Book>> ([]);

  const createHandler = async(name: string) => {
    const res = await createBook ({name, like: 0});
    if (res) setBooks ([...books, res]);
  };
  
  const fetchBooks = async() => {
    const res = await getBooks ();
    //console.log(books);
    if (res) setBooks (res);
  }
  
  useEffect (()=>{
    fetchBooks();
  },[]);

  const handleDeleteBook = async(id: string)=>{
    const res = await deleteBook (id);
    setBooks ((bs)=>{
      return bs.filter((b)=> b.id !== id)
    })
    console.log('deleteBook: ');
    console.log(res);
  }
  
  const handleUpdateBook = async(book: Book)=>{
    const res = await updateBook (book);
    console.log('updateBook: ');
    console.log(res);
    // ** update book name at BookList component **
  }

  return (
    <div className="w-full p-6 md:p-10">
      <div className="flex w-full items-center justify-between">
        <h1 className={"text-4xl text-blue-700 font-serif font-bold"}>Manage Books</h1>
      </div>
      <BookCreate onCreate={createHandler}/>      
      <BookList books={books} onDelete={handleDeleteBook} onUpdate={handleUpdateBook}/>
    </div>
  )
}


function BookList (
  {books, onDelete, onUpdate}: 
  {books: Array<Book>, onDelete: (id: string)=>void, onUpdate: (book: Book)=>void}){

  const renderList = books.map((book)=>{
    return <BookItem key={book.id} book={book} onDelete={onDelete} onUpdate={onUpdate}/>
  })
  return (
    <div className="flex flex-wrap">
      {renderList}
    </div>
  )
}

function BookCreate ({onCreate}: {onCreate: (name: string)=>void}) {
  const [bookName, setBookName] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBookName (event.target.value);
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onCreate (bookName);
    setBookName ('');
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mt-4 flex justify-between gap-2 md:mt-8">
          <div className="relative flex flex-1 ">
            <label htmlFor="book-title" className="sr-only">Book Title</label>
            <input 
              id="book-title"
              className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
              value={bookName} 
              onChange={handleInputChange}
            />
            <MdOutlineEdit className="absolute left-3 top-5 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
          <button 
            className="flex h-10 items-center justify-center rounded-lg bg-blue-600 px-4 font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:bg-gray-400"
            disabled={bookName===''}
          >
            <span className="hidden md:block">Add Book</span>{' '}
            <IoIosAdd className="md:ml-4" />
          </button>
        </div>
      </form>
    </div>
  )
}

const BookItem = (
  {book, onDelete, onUpdate}: 
  {book: Book, onDelete: (id: string)=>void, onUpdate: (book: Book)=>void}) => {
  
  const [editStatus, setEditStatus] = useState(false);
  const [like, setLike] = useState(book.like);

  const handleDelete = () =>{
    onDelete (book.id);
  }

  const handleEditClick = ()=>{
    setEditStatus (true);
  }

  const handleFavorite = ()=>{
    book.like = like + 1;
    onUpdate(book);
    setLike (book.like);
  }

  const handleUpdate = (newName: string)=>{
    book.name = newName; // ** change book name for the specific book here **
    onUpdate(book);
    setEditStatus (false);
  }
  const handleCancel = () =>{
    setEditStatus (false);
  }

  const bookEditPanel = <BookEdit onUpdate={handleUpdate} onCancel={handleCancel} book={book} />;
  const bookInfoPanel = <><h3>{book.name}</h3> <label>Like: {book.like}</label></>;
  const displayingPanel = editStatus ? bookEditPanel : bookInfoPanel;

  return (
    <div className="group relative border border-gray-300 rounded-md px-3 w-56 m-2 pt-8">
      <img 
        className="transition duration-300 ease-in-out group-hover:scale-105"
        alt="books" 
        src={`https://picsum.photos/seed/${book.id}/300/200`} 
      />
      <div>{displayingPanel}</div>
      <div className="absolute pl-4 right-1 top-1 flex gap-1">
        <div 
          className="relative border-0 rounded-full w-5 h-5 text-white bg-gray-400/70 hover:bg-gray-700/70 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none" 
          onClick={handleEditClick} 
        >
          <MdOutlineEdit className="absolute top-0.5 left-0.5 " />
        </div>
        <div 
          className="relative border-0 rounded-full w-5 h-5 text-white bg-gray-400/70 hover:bg-gray-700/70 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none" 
          onClick={handleDelete} 
        >
          <RiDeleteBinLine className="absolute top-0.5 left-0.5 " />
        </div>
        <div 
          className="relative border-0 rounded-full w-5 h-5 text-white bg-gray-400/70 hover:bg-gray-700/70 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none" 
          onClick={handleFavorite} 
        >
          <BiLike className="absolute top-0.5 left-0.5 " />
        </div>
      </div>
    </div>
  )
}

const BookEdit = (
  {book, onUpdate, onCancel}: 
  {book: Book, onUpdate: (newName: string)=>void, onCancel: ()=>void}) =>{

  const [bookName, setBookName] = useState(book.name);
  
  const handleInputChange = (event:  React.ChangeEvent<HTMLInputElement>) =>{
    setBookName (event.target.value);
  }
 
  const handleSubmit = (event: React.FormEvent) =>{
    event.preventDefault();
    onUpdate(bookName);
  }

  const handleCancel =()=>{
    onCancel();
  }

  return (
    <div className="flex flex-col ">
      <form onSubmit={handleSubmit}>
        <label className="pl-2" htmlFor="edit-book-name">Name:</label>
        <input 
          id="edit-book-name" 
          className="block w-full rounded-md border border-gray-200 py-[9px] pl-2 text-sm outline-1 m-1" 
          value={bookName} 
          onChange={handleInputChange}
        />
        <div className="flex gap-1 p-1">
          <button 
            type="submit" 
            className="h-10 w-20 rounded-lg bg-blue-600 px-2 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          > 
            Confirm 
          </button> 
          <button 
            type="button"
            className="h-10 w-20 rounded-lg bg-blue-600 px-2 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:bg-gray-400" 
            disabled={bookName===''}
            onClick={handleCancel}
          > 
            Cancel 
          </button>
        </div>
      </form>
    </div>
  )
}

