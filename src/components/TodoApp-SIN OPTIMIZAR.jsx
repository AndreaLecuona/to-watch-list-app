import React, { useEffect, useReducer } from 'react';
import { todoReducer } from './todoReducer';
import { useForm } from '../hooks/useForm';

import './styles.css';

//const [state, dispatch] = useReducer(reducer, initialState, init)
//init: Es una funcion para inicializar el state en caso que éste sea procesado o haga varias acciones (retorna el initial state)
//dispatch: Ayuda a "disparar"/enviar las acciones hacia el reducer para volver a renderizar en caso de haberse producido un cambio en el state


// const initialState = [{
//     id: new Date().getTime(),
//     desc: "Barry Lyndon - Stanley Kubrick",
//     done: false
// }];

const init = () => {
    //LEER DE LOCAL STORAGE Y MANDARLO COMO INITIAL STATE
    return JSON.parse(localStorage.getItem( 'todos' )) || [];

    // return(
    //     [{
    //         id: new Date().getTime(), //simulacion de id
    //         desc: "Barry Lyndon - Stanley Kubrick",
    //         done: false
    //     }]
    // )
}


export const TodoApp = () => {
    
    //MANEJO DE INPUT CON CUSTOM HOOK    const [ formValues, handleInputChange] = useForm({...
    const [ { description }, handleInputChange, reset ] = useForm({
        description: ''
    })

    //Extraigo del resultado del reducer una lista de items
    const [ todos, dispatch ] = useReducer(todoReducer, [], init);
    console.log( description );


    //GUARDAR EN LOCAL STORAGE
    //guardar en primer renderizado y cada vez que la lista cambie
    useEffect(() => {
        localStorage.setItem( 'todos', JSON.stringify( todos ) );
    }, [todos]);

    const handleDelete = (todoId) => {
        console.log(todoId);

        const action = {
            type: 'delete',
            payload: todoId
        };

        dispatch( action );
    }

    const handleToggle = (todoId) => {
        dispatch( {
            type: 'toggle',
            payload: todoId
        })
    }


    //MANEJO DE SUBMIT
    const handleSubmit = (e) => {
        e.preventDefault();

        if( description.trim().length <= 1 ) {
            return
        };

        //1. creo el nuevo item
        const newTodo = {
            id: new Date().getTime(),
            desc: description,
            done: false
        };

        //2. lo agrego a una accion y defino el tipo de accion
        const action = {
            type: 'add',
            payload: newTodo
        };

        //3. mando la accion al reducer con dispatch
        dispatch( action );
        reset();
    }

    return (
        <div>
            <h1>Pelis para ver en cuarentena ( {todos.length} )</h1>
            <hr/>

            <div className="row">

                <div className="col-7">
                    
                    <ul className="list-group list-group-flush">
                        {
                            todos.map((todo, i) =>
                                {return <li
                                    key={todo.id}
                                    className="list-group-item"
                                >
                                    <p className={ `${ todo.done && 'complete' }` } 
                                    onClick={ () => handleToggle(todo.id) 
                                    }>
                                        {i + 1}. {todo.desc}
                                    </p>
                                    <button className="btn btn-danger"
                                    onClick={() => handleDelete(todo.id)}
                                    >
                                        Borrar
                                    </button>
                                </li>}
                            )
                        }
                    </ul>

                </div>

                <div className="col-5">
                    
                    <h4>Me falta ver...</h4>
                    <hr/>

                    <form onSubmit={handleSubmit}>
                        <input type="text"
                            name="description"
                            className="form-control"
                            placeholder="peli - director"
                            autoComplete="off"
                            value={ description }
                            onChange={ handleInputChange }
                        />

                        <button type="submit"
                            className="btn btn-outline-primary mt-2">
                            Agregar
                        </button>
                    </form>

                </div>

            </div>
            
        </div>
    )
}
