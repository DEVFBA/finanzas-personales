import React, {
    useState,
    useEffect
} from 'react';
import {
    Jumbotron,
    Container
} from 'react-bootstrap';

import HeroCarousel from './HeroCarousel';

import calcChange, {
    calcPercChange
} from '../utils/Calculations.js';
import determineTextClass from '../utils/TextFormat.js';
import getMarketStackToken from '../utils/APIFunctions.js';

import '../styles/Hero.css';

const Hero = () => {

    const[AAPLLatest,       setAAPLLatest]                  = useState(0);
    const[AAPLPrevious,     setAAPLPrevious]                = useState(0);
    const[AMZNLatest,       setAMZNLatest]                  = useState(0);
    const[AMZNPrevious,     setAMZNPrevious]                = useState(0);
    const[TSLALatest,       setTSLALatest]                  = useState(0);
    const[TSLAPrevious,     setTSLAPrevious]                = useState(0);
    const[FBLatest,         setFBLatest]                    = useState(0);
    const[FBPrevious,       setFBPrevious]                  = useState(0);

    let AAPLChange                      = 0;
    let AAPLPercChange                  = 0;
    let AAPLTextClass                   = '';
    let AMZNChange                      = 0;
    let AMZNPercChange                  = 0;
    let AMZNTextClass                   = '';
    let TSLAChange                      = 0;
    let TSLAPercChange                  = 0;
    let TSLATextClass                   = '';
    let FBChange                        = 0;
    let FBPercChange                    = 0;
    let FBTextClass                     = '';

    useEffect(() => {
        const token                     = getMarketStackToken();

        fetch(`http://api.marketstack.com/v1/eod?access_key=${token}&symbols=AAPL,AMZN,TSLA,FB&limit=8`)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            /* Retrieve Latest Close and Previous Close from each Ticker */
            /*
                Considering API returns data sorting descending date
                    Ticker[0] = Last Close
                    Ticker[1] = The next fore date Close
            */

                /* AAPL */
                const AAPL = data.data.filter(ticker => ticker.symbol === 'AAPL');
                setAAPLLatest(AAPL[0].close);
                setAAPLPrevious(AAPL[1].close);

                /* AMZN */
                const AMZN = data.data.filter(ticker => ticker.symbol === 'AMZN');
                setAMZNLatest(AMZN[0].close);
                setAMZNPrevious(AMZN[1].close);

                /* TSLA */
                const TSLA = data.data.filter(ticker => ticker.symbol === 'TSLA');
                setTSLALatest(TSLA[0].close);
                setTSLAPrevious(TSLA[1].close);

                /* FB */
                const FB = data.data.filter(ticker => ticker.symbol === 'FB');
                setFBLatest(FB[0].close);
                setFBPrevious(FB[1].close);
        })
    }, []);

    AAPLChange                  = calcChange(AAPLLatest, AAPLPrevious);
    AAPLPercChange              = calcPercChange(AAPLChange, AAPLPrevious);
    AAPLTextClass               = determineTextClass(AAPLChange);
    AMZNChange                  = calcChange(AMZNLatest, AMZNPrevious);
    AMZNPercChange              = calcPercChange(AMZNChange, AMZNPrevious);
    AMZNTextClass               = determineTextClass(AMZNChange);
    TSLAChange                  = calcChange(TSLALatest, TSLAPrevious);
    TSLAPercChange              = calcPercChange(TSLAChange, TSLAPrevious);
    TSLATextClass               = determineTextClass(TSLAChange);
    FBChange                    = calcChange(FBLatest, FBPrevious);
    FBPercChange                = calcPercChange(FBChange, FBPrevious);
    FBTextClass                 = determineTextClass(FBChange);

    return(
            <Jumbotron
                fluid
                className="hero d-flex align-items-center justify-content-center"
            >
                <Container>
                    <HeroCarousel
                        AAPL    =   { [AAPLLatest,  AAPLChange, AAPLPercChange, AAPLTextClass] }
                        AMZN    =   { [AMZNLatest,  AMZNChange, AMZNPercChange, AMZNTextClass] }
                        TSLA    =   { [TSLALatest,  TSLAChange, TSLAPercChange, TSLATextClass] }
                        FB      =   { [FBLatest,    FBChange,   FBPercChange,   FBTextClass]   }
                    />
                </Container>
            </Jumbotron>
    );
}

export default Hero;