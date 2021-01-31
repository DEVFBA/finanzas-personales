import React from 'react';
import {
    Jumbotron,
    Container
} from 'react-bootstrap';
import HeroCarousel from './HeroCarousel';
import '../styles/Hero.css';

const Hero = () => {
    return(
            <Jumbotron 
                fluid 
                className="hero d-flex align-items-center justify-content-center"
            >
                <Container>
                    <HeroCarousel />
                </Container>
            </Jumbotron>
    );
}

export default Hero;