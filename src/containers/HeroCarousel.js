import React from 'react';
import {
    Carousel
} from 'react-bootstrap';
import FirstCarouselItem from './FirstCarouselItem';
import SecondCarouselItem from './SecondCarouselItem';
import ThirdCarouselItem from './ThirdCarouselItem';

const HeroCarousel = (props) => {
    return(
        <Carousel
            indicators = {false}
            controls   = {false}
        >
            <Carousel.Item>
                <FirstCarouselItem />
            </Carousel.Item>

            <Carousel.Item>
                <SecondCarouselItem
                    AAPL            =   { [props.AAPL[0],   props.AAPL[1],  props.AAPL[2], props.AAPL[3]] }
                    AMZN            =   { [props.AMZN[0],   props.AMZN[1],  props.AMZN[2], props.AMZN[3]] }
                    TSLA            =   { [props.TSLA[0],   props.TSLA[1],  props.TSLA[2], props.TSLA[3]] }
                    FB              =   { [props.FB[0],     props.FB[1],    props.FB[2],   props.FB[3]]   }
                    quotesLoaded    = { props.quotesLoaded }
                />
            </Carousel.Item>

            <Carousel.Item>
                <ThirdCarouselItem />
            </Carousel.Item>
        </Carousel>
    );
}

export default HeroCarousel;