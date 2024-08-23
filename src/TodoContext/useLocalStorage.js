import React from "react";

function useLocalStorage(itemName, initialValue){

    const [item,setItem] = React.useState(initialValue);
    const [loading,setLoading] = React.useState(true);
    const [error,setError] = React.useState(false);
    
    React.useEffect(()=>{
      setTimeout(()=>{
        try {
          const localStorageItem = localStorage.getItem(itemName);
          let parsedItem;
  
          if (!localStorageItem) { // Si es null, undefined, vacio, haga lo siguiente
            localStorage.setItem(itemName, JSON.stringify(initialValue));
            parsedItem = initialValue;
          } else {
            parsedItem = JSON.parse(localStorageItem); //Pero si tiene algo, muestre
            setItem(parsedItem);
          }
          setLoading(false);
        } catch (error) {
          setLoading(false);
          setError(error);
        }  
      }, 2000);
    },[initialValue,itemName])
     // Con esta funcion guardamos y actualizamos el estado y localstorage
    const saveItem = (newItem) => {
      localStorage.setItem(itemName, JSON.stringify(newItem));
      
      setItem(newItem);
    };
    return {
      item, 
      saveItem,
      loading,
      error
    };
  }

  export {useLocalStorage};

// const defaultTodos = [
//   { text: 'Cortar cebolla', completed: true },
//   { text: 'Tomar el Curso de Intro a React.js', completed: false },
//   { text: 'Llorar con la Llorona', completed: false },
//   { text: 'LALALALALA', completed: false },
//   { text: 'Usar estados derivados', completed: true },
// ];

// localStorage.setItem('TODOS_V1', JSON.stringify(defaultTodos));
// localStorage.removeItem('TODOS_V1');

