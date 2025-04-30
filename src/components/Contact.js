import React, { useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../contexts/ThemeContext';
import { FaGithub, FaLinkedin, FaInstagram, FaDiscord } from 'react-icons/fa';

const ContactContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const Title = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: ${props => props.isDarkMode ? '#fff' : '#333'};
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Description = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  color: ${props => props.isDarkMode ? '#ddd' : '#444'};
  text-align: center;
  max-width: 700px;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const TableContainer = styled.div`
  width: 100%;
  max-width: 700px;
  margin-bottom: 3rem;
  background: rgba(20, 20, 20, 0.83);
  backdrop-filter: blur(2px);
  border-radius: 8px;
  padding: 1.5rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 0 auto;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  &:last-child {
    border-bottom: none;
  }
`;

const TableHeader = styled.th`
  text-align: left;
  padding: 1rem;
  color: var(--primary-color);
  font-weight: 600;
  width: 40%;
  
  @media (max-width: 480px) {
    padding: 0.75rem;
  }
`;

const TableData = styled.td`
  padding: 1rem;
  color: #fff;
  
  @media (max-width: 480px) {
    padding: 0.75rem;
  }
`;

const SocialTable = styled(Table)`
  td {
    vertical-align: middle;
  }
`;

const SocialIcon = styled.span`
  color: var(--primary-color);
  font-size: 1.5rem;
  margin-right: 0.75rem;
  display: inline-flex;
  align-items: center;
`;

const SocialLink = styled.a`
  color: #fff;
  text-decoration: underline;
  text-underline-offset: 3px;
  text-decoration-color: rgba(255, 255, 255, 0.5);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  
  &:hover {
    color: var(--primary-color);
    text-decoration-color: var(--primary-color);
  }
`;

const EmailLink = styled.a`
  color: #fff;
  text-decoration: underline;
  text-underline-offset: 3px;
  text-decoration-color: rgba(255, 255, 255, 0.5);
  transition: all 0.3s ease;
  
  &:hover {
    color: var(--primary-color);
    text-decoration-color: var(--primary-color);
  }
`;

const Contact = () => {
  const { isDarkMode } = useContext(ThemeContext);
  
  return (
    <ContactContainer>
      <Title isDarkMode={isDarkMode}>Contact Me</Title>
      <Description isDarkMode={isDarkMode}>
      You're always welcome to reach out to me on email or social media first — I'm happy to share my phone number if needed after that!
      </Description>
      
      <TableContainer>
        <Table>
          <tbody>
            <TableRow>
              <TableHeader>Location</TableHeader>
              <TableData>Sammamish, WA</TableData>
            </TableRow>
            <TableRow>
              <TableHeader>Timezone</TableHeader>
              <TableData>GMT-7 Pacific Daylight</TableData>
            </TableRow>
            <TableRow>
              <TableHeader>E-mail</TableHeader>
              <TableData>
                <EmailLink href="mailto:cbalaranjith@gmail.com">
                  cbalaranjith@gmail.com
                </EmailLink>
              </TableData>
            </TableRow>
            <TableRow>
              <TableHeader>School E-mail</TableHeader>
              <TableData>
                <EmailLink href="mailto:1056935@lwsd.org">
                  1056935@lwsd.org
                </EmailLink>
              </TableData>
            </TableRow>
          </tbody>
        </Table>
      </TableContainer>
      
      <TableContainer>
        <SocialTable>
          <tbody>
            <TableRow>
              <TableHeader>
                <SocialIcon><FaInstagram /></SocialIcon>Instagram
              </TableHeader>
              <TableData>
                <SocialLink href="https://instagram.com/cleobalaranjith" target="_blank" rel="noopener noreferrer">
                  cleobalaranjith
                </SocialLink>
              </TableData>
            </TableRow>
            <TableRow>
              <TableHeader>
                <SocialIcon><FaGithub /></SocialIcon>GitHub
              </TableHeader>
              <TableData>
                <SocialLink href="https://github.com/CleeYOpro" target="_blank" rel="noopener noreferrer">
                  CleeYOpro
                </SocialLink>
              </TableData>
            </TableRow>
            <TableRow>
              <TableHeader>
                <SocialIcon><FaLinkedin /></SocialIcon>LinkedIn
              </TableHeader>
              <TableData>
                <SocialLink href="https://linkedin.com/in/cleofus123" target="_blank" rel="noopener noreferrer">
                  cleofus123
                </SocialLink>
              </TableData>
            </TableRow>
            <TableRow>
              <TableHeader>
                <SocialIcon><FaDiscord /></SocialIcon>Discord
              </TableHeader>
              <TableData>
                <SocialLink href="#" onClick={(e) => e.preventDefault()}>
                  cleofus
                </SocialLink>
              </TableData>
            </TableRow>
          </tbody>
        </SocialTable>
      </TableContainer>
    </ContactContainer>
  );
};

export default Contact;
