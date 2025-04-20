import React from 'react';
import styled from 'styled-components';

const AboutContainer = styled.section`
  padding: 4rem 2rem;
  display: flex;
  justify-content: center;
  gap: 4rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    gap: 3rem;
    padding: 3rem 2rem;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    padding: 2rem 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 2rem 1rem;
  }
`;

const ColorBlocks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 200px;

  @media (max-width: 768px) {
    flex-direction: row;
    width: 100%;
    max-width: 400px;
  }

  @media (max-width: 480px) {
    max-width: 300px;
  }
`;

const ColorBlock = styled.div`
  height: 100px;
  background: ${props => props.color};
  border-radius: 8px;
  transition: transform 0.3s ease;

  @media (max-width: 768px) {
    height: 80px;
    flex: 1;
  }

  @media (max-width: 480px) {
    height: 60px;
  }

  &:hover {
    transform: scale(1.05);
  }
`;

const Content = styled.div`
  flex: 1;
  max-width: 600px;

  @media (max-width: 768px) {
    text-align: center;
  }
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #fff;

  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const Description = styled.p`
  color: #666;
  line-height: 1.6;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const Organizations = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  justify-content: center;
`;

const OrgLogo = styled.img`
  width: 40px;
  height: 40px;
  object-fit: contain;
  filter: grayscale(100%);
  transition: filter 0.3s ease;

  @media (max-width: 480px) {
    width: 35px;
    height: 35px;
  }

  &:hover {
    filter: grayscale(0%);
  }
`;

const MoreButton = styled.button`
  background: #ff4d4d;
  color: white;
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s ease;

  @media (max-width: 480px) {
    padding: 0.7rem 1.5rem;
    font-size: 0.9rem;
  }

  &:hover {
    background: #ff3333;
  }
`;

const AboutMe = () => {
  return (
    <AboutContainer>
      <ColorBlocks>
        <ColorBlock color="#ff4d4d" />
        <ColorBlock color="#4169ff" />
        <ColorBlock color="#00ffcc" />
      </ColorBlocks>
      <Content>
        <Title>About Me</Title>
        <Description>
          I'm a passionate Full Stack Developer with a keen eye for design and a love for creating
          beautiful, functional applications. With expertise in both frontend and backend development,
          I bring ideas to life through clean, efficient code and intuitive user interfaces.
        </Description>
        <Organizations>
          <OrgLogo src="https://via.placeholder.com/40" alt="Organization 1" />
          <OrgLogo src="https://via.placeholder.com/40" alt="Organization 2" />
          <OrgLogo src="https://via.placeholder.com/40" alt="Organization 3" />
        </Organizations>
        <MoreButton>More About Me</MoreButton>
      </Content>
    </AboutContainer>
  );
};

export default AboutMe; 