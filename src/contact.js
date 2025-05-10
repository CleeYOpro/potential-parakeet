import React from 'react';
import styled from 'styled-components';
import Contact from './components/Contact';
import LedGrid from './components/LedGrid';
import GradientOverlay from './components/GradientOverlay';

const ContentContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 6rem 1rem 2rem 1rem;
  position: relative;
  z-index: 3;
  overflow-x: hidden;
`;

const ContactPage = () => {
  return (
    <>
      <LedGrid />
      <GradientOverlay />
      <ContentContainer>
        <Contact />
      </ContentContainer>
    </>
  );
};

export default ContactPage;
