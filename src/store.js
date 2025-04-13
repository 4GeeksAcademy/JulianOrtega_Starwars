export const initialStore=()=>{
  return{
    message: null,
    todos: [],
    characters: [],
    vehicles: [],
    planets: []
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'add_task':
      const { id,  color } = action.payload

      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
      };
    case 'characters':
      return {
        ...store,
        characters: action.payload
      };
    case 'vehicles':
      return {
        ...store,
        vehicles: action.payload
      };
    case 'planets':
      return {
        ...store,
        planets: action.payload
      };

    default:
      return store;
  }    
}
