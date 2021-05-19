import React, {
    Fragment
} from 'react';
import NavBar from '../components/NavBar';
import Hero from '../containers/Hero';
import '../styles/Home.css';

const Home = () => {
    return(
        <Fragment>

            <NavBar />
            <Hero />

        </Fragment>
    );
}

export default Home;