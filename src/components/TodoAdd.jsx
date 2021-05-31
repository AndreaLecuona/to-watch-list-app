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

        handleAdd( newTodo );
        reset();
    }

    return (
        <div className="form-group">

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
