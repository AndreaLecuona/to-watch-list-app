
export const todoReducer = (state = [], action) => {
    
    switch ( action.type ) {
        //debe conocer de antemano todas las posibles 'acciones' que le mandemos
        case 'add':
            return [...state, action.payload];

        case 'delete':
            return state.filter( todo => todo.id !== action.payload); //action-payload toma el id

        case 'toggle':
            return state.map( todo => 
                ( todo.id === action.payload ) ? { ...todo, done: !todo.done } : todo
            );

        //VERSION LARGA DE TOGGLE
        // case 'toggle':
        //     return state.map( todo => {
        //         if( todo.id === action.payload ){
        //             return {
        //                 ...todo,
        //                 done: !todo.done
        //             }
        //         } else {
        //             return todo;
        //         }
        //     })

        default:
            return state; //para asegurarnos que devuelva un state
    }

};