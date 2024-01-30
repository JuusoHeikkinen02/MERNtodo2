import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Navbar, NavbarBrand } from 'react-bootstrap';
import TodoList from './components/TodoList';
import AddTodos from './components/AddTodos';


function App() {
  return (
    <>
    <Navbar bg='dark' data-bs-theme='dark'>
      <Container>
        <NavbarBrand className='mx-auto'>Todo List</NavbarBrand>
      </Container>
    </Navbar>
      <AddTodos/>
  <Container>
    <TodoList/>
  </Container>
  </>
  );
}

export default App;
