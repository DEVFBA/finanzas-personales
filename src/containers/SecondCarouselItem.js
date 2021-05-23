import React from 'react';

import {
    Button
} from 'react-bootstrap';

import Quote from '../components/Quote';

import QuoteDataLoading from '../components/QuoteDataLoading';

const SecondCarouselItem = (props) => {
    return(
        <div className="row align-items-center justify-content-center">
            <div className="col-md-6">
                <h1>Mercados Financieros</h1>
                <p>Sigue el comportamiento del Mercado Financiero</p>
                <Button variant="dark">Ver más</Button>
            </div>

            {
                props.quotesLoaded?

                <div className="row col-md-6">
                    <div className="col-md-5">
                        <Quote
                            quote               = "AAPL"
                            value               = { props.AAPL[0]       }
                            change              = { props.AAPL[1]       }
                            percentageChange    = { props.AAPL[2]       }
                            textClass           = { props.AAPL[3]       }
                            quotesLoaded        = { props.quotesLoaded  }
                        />
                        <Quote
                            quote               = "AMZN"
                            value               = { props.AMZN[0]       }
                            change              = { props.AMZN[1]       }
                            percentageChange    = { props.AMZN[2]       }
                            textClass           = { props.AMZN[3]       }
                            quotesLoaded        = { props.quotesLoaded  }
                        />
                    </div>
                    <div className="col-md-5 offset-2">
                        <Quote
                            quote               = "TSLA"
                            value               = { props.TSLA[0]       }
                            change              = { props.TSLA[1]       }
                            percentageChange    = { props.TSLA[2]       }
                            textClass           = { props.TSLA[3]       }
                            quotesLoaded        = { props.quotesLoaded  }
                        />
                        <Quote
                            quote               = "NVDA"
                            value               = { props.FB[0]         }
                            change              = { props.FB[1]         }
                            percentageChange    = { props.FB[2]         }
                            textClass           = { props.FB[3]         }
                            quotesLoaded        = { props.quotesLoaded  }
                        />
                    </div>
                </div>:
                <QuoteDataLoading/>
            }
        </div>
    );
}

export default SecondCarouselItem;