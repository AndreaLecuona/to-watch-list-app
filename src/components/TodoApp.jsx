import React, { useEffect, useReducer } from 'react';
import { todoReducer } from './todoReducer';
// import { useForm } from '../../hooks/useForm';
import { TodoList } from './TodoList';
import { TodoAdd } from './TodoAdd';

import './styles.css';


const init = () => {
    return JSON.parse(localStorage.getItem( 'todos' )) || [];
}


export const TodoApp = () => {

    const [ todos, dispatch ] = useReducer(todoReducer, [], init);

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

    const handleAdd = ( newTodo ) => {

        dispatch({
            type: 'add',
            payload: newTodo
        });
    }

    return (
        <div className="wrapper">

            <div className="row both-sides">

                <div className="col-sm-12 col-lg-7">
                    <h1>Home cinema</h1>
                    <h2>Quarantine edition</h2>

                    <h3>Pelis por ver: { todos.length }</h3>
                    
                    <TodoAdd
                    handleAdd={ handleAdd }
                    />

                </div>

                <div className="col-sm-12 col-lg-5">
                    
                    <TodoList
                        todos={ todos }
                        handleDelete={ handleDelete }
                        handleToggle={ handleToggle }
                    />

                </div>

            </div>
            
        </div>
    )
}
