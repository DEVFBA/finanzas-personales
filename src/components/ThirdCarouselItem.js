import React from 'react';
import {
    Button
} from 'react-bootstrap';

const ThirdCarouselItem = () => {
    return(
        <div className="row align-items-center justify-content-center">
            <div className="col-md-6">
                <h1>Asesoría Patrimonial</h1>
                <p>Acércate a uno de nuestros Expertos Patrimoniales</p>
                <Button variant="dark">Ver más</Button>
            </div>
            <img
                className   = "col-md-6 img-fluid"
                src         = "/images/stock_entrepreneur.jpg"
                alt         = ""
            />
        </div>
    );
}

export default ThirdCarouselItem;