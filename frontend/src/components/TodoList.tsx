import TodoItem from "./TodoItem";
import React, {useEffect, useState} from 'react';

interface TodoListProps {
  items: TodoItem[];
  setItems: (items: TodoItem[]) => void;
}

const API_BASE= 'http://localhost:4001/todo';

function TodoList() {
    const [items, setItems] = useState<TodoItem[]>([]);

    useEffect(()=> {
      GetTodos();
    }, []);
  
  
    const GetTodos = () => {
      fetch(API_BASE)
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(err => console.log(err))
     }
  


    return(
        <>
        {items.map((item)=> {
        return  <TodoItem key={item._id} name={item.name} id={item._id} setItems={setItems}/>   
      })}
        </>
    );
};

export default TodoList;