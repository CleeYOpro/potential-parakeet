import styled from 'styled-components';

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  padding: 2rem 2vw;
  max-width: 900px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.2rem;
    max-width: 98vw;
    padding-left: 3vw;
    padding-right: 3vw;
  }
  @media (max-width: 700px) {
    grid-template-columns: 1fr;
    gap: 1rem;
    max-width: 100vw;
    padding: 1rem 5vw;
  }
  overflow-x: auto;
`;

const ProjectCard = styled.div`
  background: rgba(30, 30, 30, 0.85);
  border-radius: 10px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.3);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s;
  border: 1px solid var(--primary-color);
  position: relative;
  min-width: 260px;
  max-width: 100%;
  &:hover {
    transform: translateY(-6px) scale(1.03);
    box-shadow: 0 8px 32px rgba(0,0,0,0.4);
    
  }
    @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const AwardBanner = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  background-color: gold;
  color: #000;
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: bold;
  font-size: 0.8rem;
  box-shadow: 0 0 10px rgba(255, 215, 0, 0.7);
  display: flex;
  align-items: center;
  gap: 4px;
  z-index: 2;
  transform: rotate(5deg);
`;

const WtsaLogo = styled.img`
  height: 16px;
  width: auto;
  object-fit: contain;
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  background: #222;
`;

const ProjectContent = styled.div`
  padding: 1.2rem;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ProjectTitle = styled.h3`
  color: var(--primary-color);
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
  font-family: 'Rubik', monospace;
`;

const ProjectDesc = styled.p`
  color: #ddd;
  font-size: 1rem;
  margin-bottom: 0.7rem;
  flex: 1;
`;

const TechList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 0 0 0.7rem 0;
  padding: 0;
  list-style: none;
`;

const TechItem = styled.li`
  background: var(--primary-color);
  color: #fff;
  border-radius: 4px;
  padding: 0.2rem 0.7rem;
  font-size: 0.85rem;
`;

const ProjectLink = styled.a`
  color: var(--primary-color);
  text-decoration: underline;
  font-weight: bold;
  margin-top: 0.5rem;
  &:hover {
    color: #fff;
    background: var(--primary-color);
    border-radius: 4px;
    padding: 0.2rem 0.5rem;
    text-decoration: none;
  }
`;

const projects = [
  {
    title: 'Price it Right Market Simulator',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc sit amet ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.',
    image: 'https://via.placeholder.com/600x400/222/00aaff?text=AzotoColumn',
    tech: ['Pricing', 'Economics', 'Web', 'Business'],
    link: '#',
  },
  {
    title: 'Project AzotoColumn: Smart eco-solution for managing agricultural nitrogen runoff.',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc sit amet ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.',
    award: '4th place',
    level: 'Washington',
    image: 'https://via.placeholder.com/600x400/222/00aaff?text=AzotoColumn',
    tech: ['Eco Engineering', 'Web', 'Research'],
    link: '#',
  },
  {
    title: 'Fault Lines and Front Lines: Geospatial analysis of earthquake hazards in King County.',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc sit amet ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.',
    award: '1st place',
    level: 'Washington',
    image: 'https://via.placeholder.com/600x400/222/00aaff?text=Fault+Lines',
    tech: ['Geospatial', 'Web', 'Research'],
    link: '#',
  },
  {
    title: 'Cleof.us',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc sit amet ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.',
    image: 'https://via.placeholder.com/600x400/222/00aaff?text=Cleof.us',
    tech: ['React', 'Personal Site'],
    link: '#',
  },
  {
    title: 'Department of Palliative Medicine CMC Vellore Website',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc sit amet ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.',
    image: 'https://via.placeholder.com/600x400/222/00aaff?text=CMC+Vellore',
    tech: ['Web', 'Medical'],
    link: '#',
  },
  {
    title: 'GrowSmart: A Research Project',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc sit amet ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.',
    image: 'https://via.placeholder.com/600x400/222/00aaff?text=Grow+Smart',
    tech: ['Research', 'Web'],
    link: '#',
  },
  {
    title: 'Wordle Whiz',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc sit amet ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.',
    image: 'https://via.placeholder.com/600x400/222/00aaff?text=Wordle+Whiz',
    tech: ['Game', 'Web'],
    link: '#',
  },
  {
    title: 'Model Rocket for TARC',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc sit amet ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.',
    image: 'https://via.placeholder.com/600x400/222/00aaff?text=Model+Rocket',
    tech: ['Rocketry', 'STEM'],
    link: '#',
  },
  {
    title: 'The EYW Pinhole Camera',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc sit amet ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.',
    image: 'https://via.placeholder.com/600x400/222/00aaff?text=Pinhole+Camera',
    tech: ['Photography', 'STEM'],
    link: '#',
  },
];

const ProjectGrid = () => {
  return (
    <ProjectsGrid>
      {projects.map((project, idx) => (
        <ProjectCard key={idx}>
          {project.award && (
            <AwardBanner>
              {project.level}
              <WtsaLogo src="/wtsa.png" alt="WTSA Logo" />
              {project.award}
            </AwardBanner>
          )}
          <ProjectImage src={project.image} alt={project.title} />
          <ProjectContent>
            <ProjectTitle>{project.title}</ProjectTitle>
            <ProjectDesc>{project.description}</ProjectDesc>
            <TechList>
              {project.tech && project.tech.map((tech, i) => (
                <TechItem key={i}>{tech}</TechItem>
              ))}
            </TechList>
            {project.link && (
              <ProjectLink href={project.link} target="_blank" rel="noopener noreferrer">
                View Project
              </ProjectLink>
            )}
          </ProjectContent>
        </ProjectCard>
      ))}
    </ProjectsGrid>
  );
};

export default ProjectGrid; 