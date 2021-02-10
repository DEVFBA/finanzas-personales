import React from 'react';
import {
    Button
} from 'react-bootstrap';

const FirstCarouselItem = () => {
    return(
        <div className = "row align-items-center justify-content-center">
            <div className = "col-md-6">
                <h1>Controla tus Finanzas Personales</h1>
                <p>El control de tu dinero de manera sencilla y rápida</p>
                <Button variant = "dark">Ver más</Button>
            </div>
            <img
                className   = "img-fluid col-md-6"
                src         = "/images/stock_entrepreneur.jpg"
                alt         = ""
            />
        </div>
    );
}

export default FirstCarouselItem;