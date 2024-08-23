import React from 'react';
import { TodoContext } from '../TodoContext';
import './CreateTodoButton.css';

function CreateTodoButton() {

  const {setOpenModal} = React.useContext(TodoContext)

  return (
    <button
      className="CreateTodoButton"
      onClick={
        () => {
          setOpenModal((value)=>!value)
        }
      }
    >+</button>
  );
}

export { CreateTodoButton };
