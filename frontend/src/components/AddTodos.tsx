import React, {useState, useEffect} from 'react'
import { Form, Card, Button} from "react-bootstrap";
const API_BASE= 'http://localhost:4001/todo';

function AddTodos() {
    const [items, setItems]=useState([]);
    const [input, setInput] = useState("");

    useEffect(()=> {
        GetTodos();
      }, []);
    
    
      const GetTodos = () => {
        fetch(API_BASE)
        .then(res => res.json())
        .then(data => setItems(data))
        .catch(err => console.log(err))
       }
    

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
      }

      const addItem = async() => {
        const data = await fetch(API_BASE + "/new", {
         method: "POST",
         headers: {
           "content-type" : "application/json"
         },
         body: JSON.stringify({
           name: input,
             })
        }).then(res => res.json()) 
        await GetTodos()
        setInput('')
       }
    
       
    return(
    <>
        <Card style={{width: '18rem'}} className="mx-auto">
        <Form>
            <Form.Group controlId="input">
                <Form.Control type='text' value={input} onChange={handleChange} placeholder="Enter Task"/>
            </Form.Group>
            <Button type="submit" onClick={()=>addItem()}>ADD</Button>
        </Form>
        </Card> 
    </>
    );
};
export default AddTodos;