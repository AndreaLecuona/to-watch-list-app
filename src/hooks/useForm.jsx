import { useState } from "react";

//extraemos la logica de las forms, que de otra forma se repetiría a lo largo de las secciones de una página
export const useForm = ( initialState = {} ) => {

    const [values, setValues] = useState(initialState);

    const reset = () => {
        setValues( initialState );
    }

    const handleInputChange = ( { target } ) => {

        setValues( {
            ...values,
            [ target.name ]: target.value
        });
    };

    return [ values, handleInputChange, reset ];

};
