import React, {
    Fragment
} from 'react';

import {
    Spinner
} from 'react-bootstrap';

const QuoteDataLoading = () => {

    return(

        <Fragment>
            <Spinner
                animation       = "border" 
                variant         = "light" 
            />
            <span
                className = 'ml-3'
            >
                Cargando Mercado Accionario
            </span> 
        </Fragment>

    )

}

export default QuoteDataLoading;