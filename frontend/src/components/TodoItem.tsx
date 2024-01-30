import React, { useState } from "react";
import { ListGroup, Button, Form} from "react-bootstrap";

interface TodoItemProps {
    name: string;
    id: number;
    setItems: (items: TodoItem[] | ((prevItems: TodoItem[]) => TodoItem[])) => void; 
  }

  interface TodoItem {
    _id: number;
    name: string;
  }
  

const API_BASE= 'http://localhost:4001/todo';

function TodoItem(props: TodoItemProps) {
    const {name, id, setItems} = props;
    const [editMode, setEditMode] = useState(false);
    const [editedName, setEditedName] = useState(name);

    //update task by id and set editmode
    const updateTodo = async () => {
        try {
          const response = await fetch(API_BASE + "/update/" + id, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: editedName }),
          });
    
          if (!response.ok) {
            throw new Error('Failed to update task name');
          }
    
          const data = await response.json();
          setItems((items) =>
            items.map((item) => (item._id === data._id ? data : item))
          );
          setEditMode(false);
        } catch (error) {
          console.error('Error updating task name:', error);
        }
      };

    //delete task by id
    const deleteTodo = async(id:number) => {
        try{
            const response = await fetch(API_BASE + "/delete/" + id, {
                method: "DELETE",
              });
            if(!response.ok){
                throw new Error("Faild to delete a task")
            } 
            const data = await response.json()
            setItems((prevItems: TodoItem[]) => prevItems.filter((item) => item._id !== data._id));
            }catch (error) {
            console.error("Error updating task status:", error);
             }
      }

    



    return(
        <ListGroup>
        {editMode ? (
          <ListGroup.Item className="d-flex justify-content-between align-items-start">
            <Form.Control
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
            />
            <Button variant="success" onClick={updateTodo}>
              Update
            </Button>
            <Button variant="secondary" onClick={() => setEditMode(false)}>
              Cancel
            </Button>
          </ListGroup.Item>
        ) : (
          <ListGroup.Item className="d-flex justify-content-between align-items-start">
            {name}
            <div className="d-flex">
            <Button variant="primary" style={{ marginRight: '8px' }} onClick={() => setEditMode(true)}>
              Edit
            </Button>
            <Button variant="danger" onClick={() => deleteTodo(id)}>
              Delete
            </Button>
            </div>
          </ListGroup.Item>
        )}
      </ListGroup>
    );
}

export default TodoItem;