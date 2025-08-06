import styled from 'styled-components';
import { Icons } from './icons';

const TechStackContainer = styled.section`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: var(--primary-color-light);
  text-align: center;
`;

const IconsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  gap: 1.5rem;
  width: 100%;
  justify-items: center;
`;

const Icon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

const IconWrapper = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.2);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }

  @media (max-width: 480px) {
    width: 32px;
    height: 32px;
  }
`;

const IconName = styled.span`
  color: #555;
  font-size: 0.8rem;
  text-align: center;
`;

const techStack = [
  { name: 'GitHub', icon: Icons.gitIcon },
  { name: 'Hugging Face', icon: Icons.hugIcon },
  { name: 'ArcGIS', icon: Icons.arcIcon },
  { name: 'OpenStreetMap', icon: Icons.mapIcon },
  { name: 'VS Code', icon: Icons.VSCode },
  { name: 'Eclipse IDE', icon: require('./imgs/eclipse.png') },
  { name: 'Figma', icon: Icons.Figma },
  { name: 'Framer', icon: Icons.Framer },
  { name: 'JavaScript', icon: Icons.JS },
  { name: 'Typescript', icon: require('./imgs/ts.png') },
  { name: 'React', icon: Icons.ReactLogo },
  { name: 'Node.js', icon: require('./imgs/node.png') },
  { name: 'HTML', icon: Icons.HTML },
  { name: 'CSS', icon: Icons.CSS },
  { name: 'Java', icon: Icons.Java },
  { name: 'Python', icon: Icons.Python },
  { name: 'Supabase', icon: require('./imgs/supa.png') },
  { name: 'MongoDB', icon: require('./imgs/mongo.png')},
  { name: 'Adobe Illustrator', icon: require('./imgs/ai.png') },
  { name: 'Open Rocket', icon: require('./imgs/openrocket.png')}
];

const TechStack = () => {
  return (
    <TechStackContainer>
      <Title>Tech Stack</Title>
      <IconsContainer>
        {techStack.map((tech, index) => (
          <Icon key={index}>
            <IconWrapper>
              <img src={tech.icon} alt={tech.name} />
            </IconWrapper>
            <IconName>{tech.name}</IconName>
          </Icon>
        ))}
      </IconsContainer>
    </TechStackContainer>
  );
};

export default TechStack;
