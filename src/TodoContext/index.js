import React from "react";
import { useLocalStorage } from "./useLocalStorage";

const TodoContext = React.createContext();

function TodoProvider({children}){
  
 // Estos son los estados que se guardan y se pasan como parametros a la funcion TodoSearch
 const {
    item: todos, 
    saveItem: saveTodos,
    loading,
    error,
  } = useLocalStorage('TODOS_V1',[]);// Estos son los estados de los items a buscar
  const [searchValue, setSearchValue] = React.useState(''); // las comillas indican el primer valor del renderizado
  
  // Open Modal, estado del portal
  const [openModal, setOpenModal] = React.useState(false); 
  
  // Aquí se realizara el conteo de los TODOs completados y los que faltan
  const completedTodos = todos.filter(
    todo => !!todo.completed            // La doble negación va a convertir en booleano cualquier cosa que devolvamos
  ).length;                             // Si devuelve algo distinto a cero, va a devolver true, si devuelve un cero, null, undefined va a devolver false
  const totalTodos = todos.length;    

  //Este es un nuevo estado en donde encontraremos en TODO dependiendo de lo que se escriba en el imput
  const searchedTodos = todos.filter(
    (todo) => {
      const todoText = todo.text.toLowerCase();
      const searchText = searchValue.toLowerCase();
      return todoText.includes(searchText);
    }
  );

  // Agregar TODOs
  const addTodo = (text)=>{
    const newTodos = [...todos];  
    newTodos.push({text, completed: false});    
    saveTodos(newTodos);
  };

  // Funcion actualizadora para completar con verde y tachado el Todo, Este estado guarda en un array los estados completados y se utiliza en el TodoItem
  const completeTodo = (text) => { // text Identificador unico
    const newTodos = [...todos];  //todos es nuestro array, que es nuestro estado y creamos una nueva copia newTodos
    const todoIndex = newTodos.findIndex( // Aqui solo encontramos el indice
      (todo) => todo.text === text        // el texto que estamos recibiendo, donde buscamos el indice para marcarlo como completado
    );
    newTodos[todoIndex].completed = !newTodos[todoIndex].completed; //Aqui buscamos que elemento del array tenemos que completar
    saveTodos(newTodos);
  };

  // Funcion para eliminar el Todo
  const deleteTodo = (text) => {
    const newTodos = [...todos];
    const todoIndex = newTodos.findIndex(
      (todo) => todo.text === text
    );
    newTodos.splice(todoIndex, 1); // Este metodo elimina el Todo
    saveTodos(newTodos);
  };
    return(
        <TodoContext.Provider value={{
            loading,
            error,
            completedTodos,
            totalTodos,
            searchValue,
            setSearchValue,
            searchedTodos,
            addTodo,
            completeTodo,
            deleteTodo,
            openModal, 
            setOpenModal,  
        }}>
            {children}
        </TodoContext.Provider>
    );
}

 export{TodoContext, TodoProvider};