import React from 'react';
import {
    Container
} from 'react-bootstrap';
import '../../Assets/Styles/App/App.scss';

export const Home = () => {
    return (
        <Container className="home-container">
            <h1 className="home-title">Hello World</h1>
        </Container>
    );
}