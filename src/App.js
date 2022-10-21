import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { eventWrapper } from '@testing-library/user-event/dist/utils';
function App() {

  const [todo, setTodo] = useState([])
  const [newTodo, setNewTodo] = useState("")
  useEffect(() => {

    fetch('http://localhost:8080/api/getTodos')
      .then(res => res.json())
      .then(data => {
        setTodo(data.results);
      })
  })

  const addTodo = todoValue => {
    //Todo Array Last Elem ID 
    let lastElemId = todo.at(-1).id;
    // New Todo ID
    let newTodoId = lastElemId + 1;
    if (todoValue === '') {
      alert("Cannot be blank");
    } else {
      setTodo([...todo, { id: newTodoId, todoText: todoValue, status: false }]);

      //Clear Input
      setNewTodo("");

      axios.post('http://localhost:8080/api/insertTodo', { todoName: newTodo });
    }


  }

  const markComplateTodo = (status, id) => {

    setTodo(
      todo.map(elem => elem.id === id ? { ...elem, status: !elem.status } : elem)
    );
    let newStatus;
    console.log(status)
    if (status == 0) {
      newStatus = 1
    } else {
      newStatus = 0
    }
    axios.post('http://localhost:8080/api/updateTodo', { todoStatus: newStatus, todoId: id });



  }
  return (
    <>

      <Container>
        <div className="row">
          <div className="col-md-12 text-center mt-5">
            <h1>First todoApp</h1>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-md-4">
            <input type="text" value={newTodo} onChange={e => setNewTodo(e.target.value)} className="form-control" placeholder='Sample Value' />
          </div>
          <div className="col-md-2">
            <button className="btn btn-primary w-100" onClick={() => { addTodo(newTodo) }}>Add</button>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-md-10">
            <ListGroup >
              {
                todo.map((todos, index) => (
                  <ListGroup.Item role="button" className={todos.status === '1' ? "bg-danger text-white" : ""} onClick={() => { markComplateTodo(todos.status, todos.id) }} key={index}>{todos.todoText}</ListGroup.Item>
                ))
              }
            </ListGroup>
          </div>

        </div>

      </Container>



    </>
  );
}

export default App;
