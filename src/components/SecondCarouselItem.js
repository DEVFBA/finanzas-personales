import React from 'react';
import {
    Button
} from 'react-bootstrap';
import Quote from './Quote';

const SecondCarouselItem = () => {
    return(
        <div className="row align-items-center justify-content-center">
            <div className="col-md-6">
                <h1>Mercados Financieros</h1>
                <p>Sigue el comportamiento del Mercado Financiero</p>
                <Button variant="dark">Ver más</Button>
            </div>
            <div className="row col-md-6">
                <div className="col-md-5">
                    <Quote
                        quote="IPC"
                        value="42,985.73"
                        change="-1,295.00"
                        percentageChange="2.92"
                    />
                    <Quote
                        quote="Nasdaq"
                        value="13,070.69"
                        change="-266.46"
                        percentageChange="2.00"
                    />
                </div>
                <div className="col-md-5 offset-2">
                    <Quote
                        quote="S&P 500"
                        value="3,714.24"
                        change="-620.74"
                        percentageChange="2.03"
                    />
                    <Quote
                        quote="Dow Jones"
                        value="29,982.62"
                        change="-620.74"
                        percentageChange="2.03"
                    />
                </div>
            </div>
        </div>
    );
}

export default SecondCarouselItem;