import React from 'react';
import { TodoCounter } from '../TodoCounter';
import { TodoSearch } from '../TodoSearch';
import { TodoList } from '../TodoList';
import { TodoItem } from '../TodoItem';
import { TodosLoading } from '../TodosLoading';
import { TodosError } from '../TodosError';
import { EmptyTodos } from '../EmpyTodos';
import { CreateTodoButton } from '../CreateButton';
import { TodoContext } from '../TodoContext';
import { Modal } from '../Modal';
import { TodoForm } from '../TodoForm';

function AppUI(){

    const{
        loading,
        error,
        searchedTodos,
        completeTodo,
        deleteTodo,
        openModal,
    } = React.useContext(TodoContext);

return (
    <>
      <TodoCounter />
      <TodoSearch  />
        <TodoList>
        {loading && (
            <>
                <TodosLoading />
                <TodosLoading />
                <TodosLoading />
            </>
            )}
        {error && <TodosError />}
        {(!loading && searchedTodos.lenght === 0) && <EmptyTodos />}
        
        {searchedTodos.map(todo => (
          <TodoItem
            key={todo.text}
            text={todo.text}
            completed={todo.completed}
            //Forma de pasarle una funcion a un componente sin ejecutarla
            onComplete={() => completeTodo(todo.text)} // Aqui le enviamos ese texto que buscamos, los eventos en react no esperan la funcion ya ejecutada, sino que necesitan una funcion, se encapsulas las funciones
            onDelete={() => deleteTodo(todo.text)}
          />
        ))}
      </TodoList>
      <CreateTodoButton />
      
      {openModal &&(
        <Modal>
            <TodoForm />
        </Modal>
      )}

    </>
  );
}
export {AppUI};