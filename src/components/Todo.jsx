import React, { useEffect ,useState, useRef } from 'react';
import './Todo.css';
import {IoMdDoneAll} from 'react-icons/io';
import {FiEdit} from 'react-icons/fi';
import {AiFillDelete} from 'react-icons/ai';

const Todo = () => {
    const [todo, setTodo] = useState(""); // input todo
    const [todos, setTodos] = useState([]); // list todo
    const [editId, setEditID] = useState(0); // edit todo
    
    const handleSubmit = (e) => {
        e.preventDefault(); // submit without refresh
    }
    const getValueTodo = (e) => {
        setTodo(e.target.value); // get value input
    }
    const addTodo = () => {
        if(todo !== ""){
            setTodos([...todos, { list:todo, id: Date.now(), status: false }]); // add todos
            setTodo(""); // clear input
        }

        if(editId){
            // find todos by id
            const todoEdit = todos.find((todo) => todo.id === editId);
            // update todos
            const newTodos = todos.map((to) => to.id === todoEdit.id
            ? (to = { id: to.id, list: todo, status: to.status }) // data in todo have only list
            : to);
            // set new todos
            setTodos(newTodos);
            setEditID(0);
            setTodo("");
        }
    }

    const inputRef = useRef(null);
    useEffect(() => {
        inputRef.current.focus(); // focus
    });

    const deleteTodo = (id) => {
        // filter todo different by id
        setTodos(todos.filter((todo) => todo.id !== id));
    }

    const completedTodo = (id) => {
        // map todo to set status toggle
        let completed = todos.map((list) => {
            if (list.id === id) {
                // set status toggle
                return { ...list, status: !list.status };
            }
            return list;
        });
        // set new todos
        setTodos(completed);
    }

    const editTodo = (id) => {
        // find todo by id
        const todoEdit = todos.find((todo) => todo.id === id);
        // set todo to input
        setTodo(todoEdit.list);
        // set edit id
        setEditID(todoEdit.id);
        // console.log(todoEdit);
    }

  return (
    <div className='container'>
        <h2>TODO APP</h2>
        <form className='form-group' onSubmit={handleSubmit}>
            <input type="text" ref={inputRef} value={todo} placeholder='Enter your todo' className='form-control' onChange={getValueTodo}/>
            <button onClick={addTodo}>{editId ? "EDIT" : "ADD"}</button>
        </form>
        <div className='list'>
            <ul>
                {todos.map((todo, index) => { // map todo
                    return (
                        <li className='form-control' key={index}>
                            <div className='list-item-list' id={todo.status ? 'list-item' : ''}>{todo.list}</div> 
                            <span>
                                <IoMdDoneAll 
                                    className='list-item-icons' 
                                    id='completed'
                                    title='Completed'
                                    onClick={() => completedTodo(todo.id)}
                                />
                                <FiEdit 
                                    className='list-item-icons' 
                                    id='edit' 
                                    title='Edit'
                                    onClick={() => editTodo(todo.id)}
                                />
                                <AiFillDelete 
                                    className='list-item-icons' 
                                    id='delete' 
                                    title='Delete'
                                    onClick={() => deleteTodo(todo.id)}
                                />
                            </span>
                        </li>
                    )
                })}
            </ul>
        </div>
    </div>
  )
}

export default Todo;