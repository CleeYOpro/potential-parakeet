import styled from 'styled-components';
import AboutMe from './components/AboutMe';

const AboutPageContainer = styled.div`
  min-height: 100vh;
  background: #000000;
  padding-top: 80px; /* To account for the fixed navbar */
  position: relative;
  overflow: auto; /* Changed from hidden to auto to enable scrolling */
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  position: relative;
  z-index: 2;
`;

const About = () => {
  return (
    <AboutPageContainer>
      <ContentContainer>
        <AboutMe />
      </ContentContainer>
    </AboutPageContainer>
  );
};

export default About;