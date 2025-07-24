import styled from 'styled-components';
import { FaGithub, FaLinkedin, FaInstagram, FaDiscord } from 'react-icons/fa';
import { useState } from 'react';

const ContactContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 900px;
  padding: 2rem;
  margin: 0 auto;
  position: relative;
  z-index: 1;
  min-height: 100vh; /* Ensure container takes at least full viewport height */
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;


const Title = styled.h2`
  font-size: 2.5rem;
  color: var(--primary-color);
  margin-top: 2rem; /* Add space at the top to position below navbar for desktop only */
  margin-bottom: 1.5rem;
  text-align: center;
  text-shadow: 0 0 10px rgba(0, 85, 255, 0.5);
  @media (max-width: 1024px) {
    font-size: 2rem;
  }
`;

const Description = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  color: white;
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
  background: rgba(31, 30, 30, 0.8);
  opacity: 1;
  backdrop-filter: blur(400px) saturate(1.8);
  -webkit-backdrop-filter: blur(400px) saturate(1.8);
  border-radius: 2.5rem 2.5rem 2.5rem 2.5rem / 2.2rem 2.2rem 2.2rem 2.2rem;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.18), 0 1.5px 8px 0 rgba(0,0,0,0.10);
  border: 1.5px solid rgba(255,255,255,0.13);
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

const FormContainer = styled.div`
  width: 100%;
  max-width: 700px;
  margin: 2rem auto 1.5rem auto;
  background: rgba(31, 30, 30, 0.8);
  opacity: 1;
  backdrop-filter: blur(400px) saturate(1.8);
  -webkit-backdrop-filter: blur(400px) saturate(1.8);
  border-radius: 2.5rem 2.5rem 2.5rem 2.5rem / 2.2rem 2.2rem 2.2rem 2.2rem;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.18), 0 1.5px 8px 0 rgba(0,0,0,0.10);
  border: 1.5px solid rgba(255,255,255,0.13);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const GlassyInput = styled.input`
  background: rgba(31, 30, 30, 0.8);
  backdrop-filter: blur(18px) saturate(1.5);
  -webkit-backdrop-filter: blur(18px) saturate(1.5);
  border-radius: 1.2rem;
  border: 1.5px solid rgba(255,255,255,0.13);
  box-shadow: 0 4px 16px 0 rgba(31, 38, 135, 0.10), 0 1.5px 8px 0 rgba(0,0,0,0.08);
  color: #fff;
  font-size: 1rem;
  padding: 0.9rem 1.2rem;
  margin-bottom: 1.2rem;
  width: 100%;
  font-family: var(--font-family);
  outline: none;
  transition: background 0.3s, box-shadow 0.3s;
`;

const GlassyTextarea = styled.textarea`
  background: rgba(31, 30, 30, 0.8);
  backdrop-filter: blur(18px) saturate(1.5);
  -webkit-backdrop-filter: blur(18px) saturate(1.5);
  border-radius: 1.2rem;
  border: 1.5px solid rgba(255,255,255,0.13);
  box-shadow: 0 4px 16px 0 rgba(31, 38, 135, 0.10), 0 1.5px 8px 0 rgba(0,0,0,0.08);
  color: #fff;
  font-size: 1rem;
  padding: 0.9rem 1.2rem;
  margin-bottom: 1.2rem;
  width: 100%;
  font-family: var(--font-family);
  outline: none;
  min-height: 120px;
  resize: vertical;
  transition: background 0.3s, box-shadow 0.3s;
`;

const GlassyButton = styled.button`
  background: var(--primary-color, #4f8cff);
  color: #fff;
  border: none;
  border-radius: 1.2rem;
  padding: 0.9rem 2.2rem;
  font-size: 1.1rem;
  font-family: var(--font-family);
  box-shadow: 0 4px 16px 0 rgba(31, 38, 135, 0.10), 0 1.5px 8px 0 rgba(0,0,0,0.08);
  backdrop-filter: blur(18px) saturate(1.5);
  -webkit-backdrop-filter: blur(18px) saturate(1.5);
  cursor: pointer;
  transition: background 0.3s, box-shadow 0.3s;
  &:hover {
    background: var(--primary-color-hover, #3570d4);
  }
`;

const FormMessage = styled.div`
  color: ${props => props.error ? '#ff5555' : 'var(--primary-color)'};
  font-size: 1rem;
  margin-top: 0.5rem;
  text-align: center;
`;

const Contact = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [formMsg, setFormMsg] = useState('');
  const [formError, setFormError] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    setFormMsg('');
    setFormError(false);
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setFormMsg('Please enter a valid email address.');
      setFormError(true);
      return;
    }
    if (!message || message.length < 5) {
      setFormMsg('Please enter a message.');
      setFormError(true);
      return;
    }
    setSending(true);
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: '59f0091b-3373-4a30-a7f2-fc521d804457',
          email,
          message,
          subject: 'New Contact Form Submission'
        })
      });
      const data = await res.json();
      if (data.success) {
        setFormMsg('Message sent!');
        setFormError(false);
        setEmail('');
        setMessage('');
      } else {
        setFormMsg(data.message || 'Failed to send message.');
        setFormError(true);
      }
    } catch (err) {
      setFormMsg('Failed to send message.');
      setFormError(true);
    }
    setSending(false);
  };

  return (
    <ContactContainer>
      <Title>Contact Me</Title>
      <Description>
        You're always welcome to reach out to me on email or social media first — I'm happy to share my phone number if needed after that!
      </Description>

      <FormContainer as="form" onSubmit={handleSend}>
        <GlassyInput
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={e => setEmail(e.target.value)}
          disabled={sending}
          required
        />
        <GlassyTextarea
          placeholder="Your message"
          value={message}
          onChange={e => setMessage(e.target.value)}
          disabled={sending}
          required
        />
        <GlassyButton type="submit" disabled={sending}>{sending ? 'Sending...' : 'Send'}</GlassyButton>
        {formMsg && <FormMessage error={formError}>{formMsg}</FormMessage>}
      </FormContainer>

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
                <SocialLink href="https://discord.com" target="_blank" rel="noopener noreferrer">
                  mecahedron
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
