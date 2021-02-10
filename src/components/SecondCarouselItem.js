import React from 'react';
import {
    Button
} from 'react-bootstrap';
import Quote from './Quote';

const SecondCarouselItem = (props) => {
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
                        quote               = "AAPL"
                        value               = { props.AAPL[0] }
                        change              = { props.AAPL[1] }
                        percentageChange    = { props.AAPL[2] }
                        textClass           = { props.AAPL[3] }
                    />
                    <Quote
                        quote               = "AMZN"
                        value               = { props.AMZN[0] }
                        change              = { props.AMZN[1] }
                        percentageChange    = { props.AMZN[2] }
                        textClass           = { props.AMZN[3] }
                    />
                </div>
                <div className="col-md-5 offset-2">
                    <Quote
                        quote               = "TSLA"
                        value               = { props.TSLA[0] }
                        change              = { props.TSLA[1] }
                        percentageChange    = { props.TSLA[2] }
                        textClass           = { props.TSLA[3] }
                    />
                    <Quote
                        quote               = "FB"
                        value               = { props.FB[0] }
                        change              = { props.FB[1] }
                        percentageChange    = { props.FB[2] }
                        textClass           = { props.FB[3] }
                    />
                </div>
            </div>
        </div>
    );
}

export default SecondCarouselItem;