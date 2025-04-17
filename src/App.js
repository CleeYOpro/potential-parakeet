import React from 'react';
import styled from 'styled-components';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Divider from './components/Divider';
import TechStack from './components/TechStack';
import AboutMe from './components/AboutMe';

const AppContainer = styled.div`
  background: #111;
  min-height: 100vh;
  color: #fff;
`;

function App() {
    return (
        <AppContainer>
            <Navbar />
            <Hero />
            <Divider />
            <TechStack />
            <AboutMe />
        </AppContainer>
    );
}

export default App; 