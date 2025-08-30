import styled from 'styled-components';
import ScrollStack, { ScrollStackItem } from './ScrollStack';

const ProjectsContainer = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
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
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  height: auto;
  max-height: 80vh;
  
  &:hover {
    transform: translateY(-6px) scale(1.03);
    box-shadow: 0 8px 32px rgba(0,0,0,0.4);
  }
  
  @media (max-width: 768px) {
    max-width: 90%;
    max-height: 85vh;
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
  height: 140px;
  object-fit: cover;
  background: #222;
  
  @media (max-width: 768px) {
    height: 120px;
  }
`;

const ProjectContent = styled.div`
  padding: 1rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ProjectTitle = styled.h3`
  color: var(--primary-color);
  margin: 0 0 0.4rem 0;
  font-size: 0.95rem;
  font-family: 'Rubik', monospace;
  line-height: 1.2;
`;

const ProjectDesc = styled.p`
  color: #ddd;
  font-size: 0.9rem;
  margin-bottom: 0.6rem;
  flex: 1;
  line-height: 1.4;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

const TechList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin: 0 0 0.6rem 0;
  padding: 0;
  list-style: none;
`;

const TechItem = styled.li`
  background: rgba(31, 30, 30, 0.8);
  color: #fff;
  border-radius: 1rem;
  padding: 0.15rem 0.7rem;
  font-size: 0.8rem;
  border: 1px solid rgba(255,255,255,0.13);
  box-shadow: 0 4px 16px 0 rgba(31, 38, 135, 0.10), 0 1.5px 8px 0 rgba(0,0,0,0.08);
  backdrop-filter: blur(18px) saturate(1.5);
  -webkit-backdrop-filter: blur(18px) saturate(1.5);
  font-family: var(--font-family);
  margin-bottom: 2px;
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



/**
 * Array of project objects to be displayed in the ProjectGrid.
 * Each project object may contain:
 * - title: string - The name of the project.
 * - description: string - A brief description of the project.
 * - image: string - URL or path to the project's image.
 * - tech: string[] - List of technologies or topics related to the project.
 * - link: string - URL to view the project.
 * - award: string (optional) - Award received by the project.
 * - level: string (optional) - Level or category of the award.
 */
const projects = [
  {
    title: 'Price it Right Market Simulator',
    description: 'This project shows how price affects demand, profit, and revenue using interactive charts and sliders. It includes market events and teaches key business ideas like supply & demand, pricing strategy, and profit optimization in a fun, visual way.',
    image: '/priceitright.png',
    tech: ['Pricing', 'Economics', 'TypeScript', 'Business'],
    link: 'https://priceprofit.cleof.us/',
    github: 'https://https://github.com/CleeYOpro/demandprice_pro', // <-- Add this line
  },
  {
    title: 'Project AzotoColumn: Smart eco-solution for managing agricultural nitrogen runoff.',
    description: 'Filters runoff through layered bioretention media, reducing harmful chemicals while supporting diverse farm conditions and improving long-term soil and water quality.',
    award: '4th place',
    level: 'Washington',
    image: '/azoto.png',
    tech: ['Eco Engineering', 'Data Analysis', 'Research'],
    portfolio: 'https://drive.google.com/file/d/1aRteul6QmGu1CgswCCBV31lTWn1scPMY/view?usp=sharing', // Add this line
    poster: 'https://drive.google.com/file/d/18zKy_aYVhCDZIGRtivxBvt7vb7SfQ0Q3/view?usp=sharing', // Add this line
  },
  {
    title: 'Fault Lines and Front Lines: Geospatial analysis of earthquake hazards in King County.',
    description: 'GIS and Python map Seattle’s seismic risks, predict quakes, assess infrastructure, and optimize evacuation and emergency planning.',
    award: '1st place',
    level: 'Washington',
    image: '/urm.png',
    tech: ['Data Analysis', 'Python', 'Disaster Response', 'GIS'],
    pdf: 'https://drive.google.com/file/d/1gLBq9b4jJ90F_pYGyh_cpTNpMdKyHJj-/view?usp=sharing', // Add this line
    github: 'https://github.com/CleeYOpro/seattle_fault_project', // Add this line
  },
  {
    title: 'Cleof.us',
    description: 'A modern React portfolio with a dynamic hero, project highlights, interactive UI, and responsive design—showcasing front-end skills and creative flair.',
    image: '/cleof.png',
    tech: ['React', 'Personal Site'],
    link: 'https://cleof.us/',
    github: 'https://github.com/CleeYOpro/potential-parakeet.git',
  },
  {
    title: 'Department of Palliative Medicine CMC Vellore Website',
    description: 'A responsive site for CMC Palliative Care showcasing services, team, and contact—built for clarity, accessibility, and thoughtful design.',
    image: '/palli.png',
    tech: ['Web', 'Medical', 'HTML5', 'CSS3'],
    link: 'https://palliativecmc.pages.dev/',
    github: 'https://github.com/CleeYOpro/CMC-project',
  },
  {
    title: 'Wordle Whiz',
    description: 'An interactive Wordle-solving tool built using the python library CMU CS academy that filters words based on clues using input logic, visuals, and clean UI.',
    image: '/cs-academy-canvas.png',
    tech: ['Game', 'Web', 'Python'],
    link: '/wordle.html',
  },
  {
    title: 'Rocket for TARC',
    description: 'Our rocketry team built a working model rocket to qualify for TARC nationals after overcoming major launch setbacks, refining our design, and achieving near-perfect flight scores.',
    image: '/WhatsApp Image 2024-04-07 at 11.00.16 AM.jpeg',
    tech: ['Data Analysis', 'Rocket Engineering'],
    launch: 'https://youtube.com/shorts/ijfCUH0ua78?si=FOFAJj5UrJFGQmuk', // TODO: Replace with actual launch link
    readMore: 'https://medium.com/@cleobala/launching-dreams-my-rocketry-journey-cacee0deb780', // TODO: Replace with actual read more link
  },
];

const ProjectGrid = () => {
  return (
    <ProjectsContainer>
      <ScrollStack
        itemDistance={150}
        itemScale={0.03}
        itemStackDistance={8}
        stackPosition="10%"
        scaleEndPosition="20%"
        baseScale={0.9}
        rotationAmount={0.2}
        blurAmount={0.8}
      >
        {projects.map((project, idx) => (
          <ScrollStackItem key={idx}>
            <ProjectCard>
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
                {/* Project links section */}
                {project.launch || project.readMore ? (
                  <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', marginTop: '0.4rem', justifyContent: 'center' }}>
                    {project.launch && (
                      <ProjectLink href={project.launch} target="_blank" rel="noopener noreferrer">
                        ▶ Launch
                      </ProjectLink>
                    )}
                    {project.readMore && (
                      <ProjectLink href={project.readMore} target="_blank" rel="noopener noreferrer">
                        📰 Read More
                      </ProjectLink>
                    )}
                  </div>
                ) : null}
                {project.portfolio || project.poster ? (
                  <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', marginTop: '0.4rem', justifyContent: 'center' }}>
                    {project.portfolio && (
                      <ProjectLink href={project.portfolio} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        {/* Adobe PDF SVG icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48" style={{ display: 'inline', verticalAlign: 'middle' }}>
                          <rect width="48" height="48" rx="6" fill="#E2231A" />
                          <text x="12" y="32" fontSize="18" fontWeight="bold" fill="#fff" fontFamily="Arial, sans-serif">PDF</text>
                        </svg>
                        Portfolio
                      </ProjectLink>
                    )}
                    {project.poster && (
                      <ProjectLink href={project.poster} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        {/* Adobe PDF SVG icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48" style={{ display: 'inline', verticalAlign: 'middle' }}>
                          <rect width="48" height="48" rx="6" fill="#E2231A" />
                          <text x="12" y="32" fontSize="18" fontWeight="bold" fill="#fff" fontFamily="Arial, sans-serif">PDF</text>
                        </svg>
                        Poster
                      </ProjectLink>
                    )}
                  </div>
                ) : project.pdf && project.github ? (
                  <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', marginTop: '0.4rem', justifyContent: 'center' }}>
                    <ProjectLink href={project.pdf} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48" style={{ display: 'inline', verticalAlign: 'middle' }}>
                        <rect width="48" height="48" rx="6" fill="#E2231A" />
                        <text x="12" y="32" fontSize="18" fontWeight="bold" fill="#fff" fontFamily="Arial, sans-serif">PDF</text>
                      </svg>
                      Report
                    </ProjectLink>
                    <ProjectLink href={project.github} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      {/* GitHub SVG icon */}
                      <svg height="18" width="18" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline', verticalAlign: 'middle' }}>
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.19 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                      </svg>
                      GitHub
                    </ProjectLink>
                  </div>
                ) : project.link && project.github ? (
                  <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', marginTop: '0.4rem', justifyContent: 'center' }}>
                    <ProjectLink href={project.link} target="_blank" rel="noopener noreferrer">
                      Project Link
                    </ProjectLink>
                    <ProjectLink href={project.github} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      {/* GitHub SVG icon */}
                      <svg height="18" width="18" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline', verticalAlign: 'middle' }}>
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.19 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                      </svg>
                      GitHub
                    </ProjectLink>
                  </div>
                ) : project.link ? (
                  <ProjectLink href={project.link} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', justifyContent: 'center' }}>
                    View Project
                  </ProjectLink>
                ) : null}
              </ProjectContent>
            </ProjectCard>
          </ScrollStackItem>
        ))}
      </ScrollStack>
    </ProjectsContainer>
  );
};

export default ProjectGrid;