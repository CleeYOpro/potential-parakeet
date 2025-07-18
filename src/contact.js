import styled from 'styled-components';
import Contact from './components/Contact';

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
    <ContentContainer>
      <Contact />
    </ContentContainer>
  );
};

export default ContactPage;
