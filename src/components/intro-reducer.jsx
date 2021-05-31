const initialState = [{
    id: 1,
    todo: 'Comprar cafe',
    done: false
}];


const todoReducer = ( state = initialState, action ) => {

    if(action?.type === 'agregar nuevo item'){ 
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


const agregarTodoAction = {
    type: 'agregar nuevo item',
    payload: newtodo
}


todos = todoReducer( todos, agregarTodoAction );


console.log(todos);
