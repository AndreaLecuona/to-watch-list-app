const initialState = [{
    id: 1,
    todo: 'Comprar cafe',
    done: false
}];

//El use reducer centraliza todas las acciones posibles de la aplicacion, que van a afectar el state. No puede ser asíncrona, llamar al local storage, ni llamar a otras funciones desde su cuerpo o efectos secundarios (es pura)
//Recibe como argumentos un nuevo state y una accion(que a su vez puede o no tener un argumento) que va a modificar el initial state, y SIEMPRE devuelve un state. NUNCA NULL O UNDEFINED
const todoReducer = ( state = initialState, action ) => {

    if(action?.type === 'agregar nuevo item'){ //optional chaining: 'si action no es undefined o null, comparar con el string'
        return [ ...state, action.payload ];
    }

    return state;
};

let todos = todoReducer();


const newtodo = {
    id: 2,
    todo: 'Cocinar brownies',
    done: false
};

//Como .push() no se utiliza en react porque muta el objeto/modifica el state y rompe la app, tenemos que pasar el nuevo item de otra forma, junto con la acción
//en este objeto 'accion' que se enviará como argumento al reducer sse incluyen el nombre de la accion propiamente dicha y el objeto que involucra
//type y payload son nombres estandard, podrían ser los que quisiéramos
const agregarTodoAction = {
    type: 'agregar nuevo item',
    payload: newtodo
}


todos = todoReducer( todos, agregarTodoAction );


console.log(todos);