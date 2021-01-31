import React from 'react';
import {
    Carousel
} from 'react-bootstrap';
import FirstCarouselItem from './FirstCarouselItem';
import SecondCarouselItem from './SecondCarouselItem';
import ThirdCarouselItem from './ThirdCarouselItem';

const HeroCarousel = () => {
    return(
        <Carousel
            indicators={false}
            controls={false}
        >
            <Carousel.Item>
                <FirstCarouselItem />
            </Carousel.Item>

            <Carousel.Item>
                <SecondCarouselItem />
            </Carousel.Item>

            <Carousel.Item>
                <ThirdCarouselItem />
            </Carousel.Item>
        </Carousel>
    );
}

export default HeroCarousel;