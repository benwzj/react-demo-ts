import { useEffect, useRef, useState, memo } from 'react';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';
import { Todo } from '../lib/types';
import {
  getTodos,
  createTodo,
  deleteTodo,
  updateTodo,
  updateTodoShowActive,
  getTodoShowActive
} from '../lib/json-server';
import './todos.css';

export default function TodosPage () {

  const [todos, setTodos] = useState<Array<Todo>>([]);
  const [showActive, setShowActive] = useState(false);

  const activeTodos = todos.filter((todo)=>!todo.completed);
  const visibleTodos = showActive ? activeTodos : todos;
  const activeTodoCount = activeTodos ? activeTodos.length : 0; 

  const fetchTodos = async() => {
    const res = await getTodos ();
    console.log ('fetchTodos: ');
    console.log (res);
    if (res) setTodos (res);
    // activeTodos = ft.filter((todo)=>!todo.completed);
    // visibleTodos = showActive ? activeTodos : todos;
    // activeTodoCount = visibleTodos.length;
  }
  const fetchShowActive = async()=> {
    const res = await getTodoShowActive();
    if (res) setShowActive (res);
  }

  useEffect (()=>{
    fetchShowActive();
  }, []);
  useEffect (()=>{
    fetchTodos();
  }, []); 
  
  const handleAddTodo = async(newTodoText: string) =>{
    const res = await createTodo ({
      text: newTodoText, 
      completed: false
    })
    if (res) setTodos([...todos, res]); 
  }

  const handleUpdateCompleted = async(todo: Todo, completed: boolean) =>{
    console.log('handleUpdateCompleted: ')
    console.log( todo)
    const res = await updateTodo ({...todo, completed});
    if (res){
      const newTodos = todos.map((t) => t.id===res.id ? res : t);
      setTodos (newTodos);
    }
  }

  const handleDelItem = async(id: string) =>{
    const res = await deleteTodo (id);
    if (res) setTodos(todos.filter(todo=>todo.id!==id)); 
  }

  const handleUpdateItem = async(todo: Todo) =>{
    const res = await updateTodo (todo);
    if (res){
      const newTodos = todos.map((t) => t.id===res.id ? res : t);
      setTodos (newTodos);
    }

    setTodos(todos.map(t=>t.id===todo.id? todo: t));
  }

  const handleShowActive = async(e: React.ChangeEvent<HTMLInputElement>)=> {
    setShowActive (e.target.checked);
    await updateTodoShowActive (e.target.checked);
  }

  const displayList = visibleTodos.map((todo)=>{
    return <TodoItem 
      todo={todo} 
      onUpdateCompleted={handleUpdateCompleted} 
      onDel={handleDelItem}
      onUpdate={handleUpdateItem}
      key={todo.id}
    />
  })

  const footer = `There are ${activeTodoCount} todos left!`;

  return (
    <div className="todo-page">
      <div className="todo-showactive">
        <input
          type="checkbox"
          checked={showActive}
          onChange={handleShowActive}
        />
        <label>
          &nbsp;Show only active todos
        </label>
      </div>
      <div>
        <NewTodo onAdd={handleAddTodo} />
      </div>
      <div>
        <ul>
          {displayList}
        </ul>
      </div>
      <br/>
      <div className="todo-footer">
        <footer>{footer}</footer>
      </div>
    </div>
  );
}

const TodoItem = memo(function TI(
  {
    todo, 
    onUpdateCompleted, 
    onDel, 
    onUpdate
  } : {
    todo: Todo;
    onUpdateCompleted: (todo: Todo, completed: boolean)=>void;
    onDel: (id:string) => void; 
    onUpdate: (todo: Todo)=> void;
  }
) {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [editCompleted, setEditCompleted] = useState(todo.completed);
  const renderCount = useRef(0);
  
  useEffect (()=>{
    renderCount.current = renderCount.current + 1;
  });
  const handleUpdate = () => {
    setEditing (false);
    onUpdate({id: todo.id, text: editText, completed: editCompleted });
  };
  const handleCancelUpdate = () =>{
    setEditing (false);
    setEditCompleted (todo.completed);
  }
  const completedlabel = () =>{
    if (todo.completed){
      return editCompleted ? 'Have been Completed!' : 'You Mark it as Uncompleted!';
    }else{
      return editCompleted ? 'You Mark it as Completed!' : 'Not completed Yet!';
    }
  }
  const editStateTodoItem = (
    <li>
      <div className="todo-edit-item">
        <div className="todo-edit-label">
          <label>
            <input
              type="checkbox"
              checked={editCompleted}
              onChange={e => setEditCompleted(e.target.checked)}
            />
            &nbsp;&nbsp;{completedlabel()}
          </label>
        </div>
        <input 
          value={editText} 
          className="todo-edit-input-text"
          onChange={e => setEditText(e.target.value)} 
        />
        <div className='todo-edit-button-group'>
          <button className="todo-edit-button" onClick={handleUpdate} disabled={editText===''}>
            Save
          </button>
          <button className="todo-edit-button" onClick={handleCancelUpdate} disabled={editText===''}>
            Cancel  
          </button>
        </div>
      </div>
    </li>
  )

  const normalStateTodoItem = (
    <li>
      <div className="todo-item">
        <div>
          <label 
            className={todo.completed ? "todo-item-label completed" : "todo-item-label"}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={e => onUpdateCompleted(todo, e.target.checked)}
            />
            {/* &nbsp;&nbsp;{todo.completed? <s>{todo.text}</s>: todo.text}&nbsp;&nbsp; */}
            &nbsp;&nbsp;{todo.text+ ' ('+renderCount.current+')'}
          </label>
        </div>
        <div className="icons_hover">
          <RiCloseCircleLine
            onClick={() => onDel(todo.id)}
          />
          <TiEdit
            onClick={()=>setEditing (true)}
            // onClick={() => onEdit({ id: todo.id, text: todo.text, completed: todo.completed })}
          />
        </div>      
      </div>
    </li>
  )
  return editing ? editStateTodoItem : normalStateTodoItem;
})

const NewTodo = ({onAdd}: {onAdd: (text: string)=>void}) => {
  const [text, setText] = useState('');
  const handleAdd = () => {
    onAdd(text);
    setText('');
  }
  return (
    <div className="todo-new">
      <input className="todo-input" value={text} onChange={e => setText(e.target.value)} />
      <button className="todo-addnew-button" onClick={handleAdd} disabled={text===''}>
        Add Todo
      </button>
    </div>
  )
}

