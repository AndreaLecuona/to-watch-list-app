import React from 'react'
import { useForm } from '../hooks/useForm'

export const TodoAdd = ( { handleAdd } ) => {

    const [ { description }, handleInputChange, reset ] = useForm({
        description: ''
    })

    const handleSubmit = (e) => {
        e.preventDefault();

        if( description.trim().length <= 1 ) {
            return
        };

        const newTodo = {
            id: new Date().getTime(),
            desc: description,
            done: false
        };

        //reemplazo este dispatch con handle add para que el dispatch se haga en el componente padre
        handleAdd( newTodo );
        reset();
    }

    return (
        <div className="form-group">
            {/* <h4>Me falta ver...</h4> */}

                <form onSubmit={ handleSubmit }>
                    <input type="text"
                        name="description"
                        className="form-control"
                        placeholder="Nombre de la película"
                        autoComplete="off"
                        value={ description }
                        onChange={ handleInputChange }
                    />

                    <button type="submit"
                        className="btn btn-outline-primary personal-btn mt-3">
                        Agregar a la lista
                    </button>
                </form>
        </div>
    )
}
