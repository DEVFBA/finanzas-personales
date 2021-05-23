import React, {
    Fragment
} from 'react';

import {
    Spinner
} from 'react-bootstrap';

const LoggingIn = () => {

    return(

        <Fragment>
            <Spinner
                animation       = "border" 
                variant         = "light" 
            />
            <span
                className = 'ml-3 text-white'
            >
                Cargando
            </span> 
        </Fragment>

    )

}

export default LoggingIn;