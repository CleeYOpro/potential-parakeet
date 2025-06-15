import styled from 'styled-components';
import ProjectTimeline from './components/ProjectTimeline';
import LedGrid from './components/LedGrid';
import GradientOverlay from './components/GradientOverlay';

const ProjectsPageContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  position: relative;
  overflow: auto;
  display: flex;
  flex-direction: column;
`;

const ContentContainer = styled.div`
  flex: 1;
  width: 100%;
  padding: 4rem 0.5rem 2rem 0.5rem;
  position: relative;
  z-index: 5;
  overflow-y: auto;

  @media (min-width: 768px) {
    padding: 6rem 1rem 2rem 1rem;
  }
`;

const ProjectsTitle = styled.h1`
  text-align: center;
  margin-top: 2.5rem; // reduced from 3rem
  margin-bottom: 1rem; // reduced from 2rem
  font-size: 2rem;
  color: var(--primary-color);
  text-shadow: 0 0 10px rgba(0, 85, 255, 0.5);
  padding: 0 1rem;

  @media (min-width: 768px) {
    font-size: 2.5rem;
  }
`;

const ProjectsPage = () => {
  return (
    <ProjectsPageContainer>
      <LedGrid />
      <GradientOverlay />
      <ContentContainer>
        <ProjectsTitle>Project Timeline</ProjectsTitle>
        <ProjectTimeline />
      </ContentContainer>
    </ProjectsPageContainer>
  );
};

export default ProjectsPage;