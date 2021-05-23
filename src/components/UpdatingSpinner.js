import React, {
    Fragment
} from 'react';

import {
    Spinner
} from 'react-bootstrap';

const UpdatingSpinner = () => {
    return(
        <Fragment>
            <h5
            col         = 'sm-9'
            >
                <Spinner
                    as          = 'span'
                    animation   = "border"
                    size        = "md"
                    role        = "status"
                    aria-hidden = "true"
                    className   = "mr-3"
                />
                Actualizando...
            </h5>
        </Fragment>
    )
}

export default UpdatingSpinner;