import React from 'react';
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
  padding: 6rem 1rem 2rem 1rem;
  position: relative;
  z-index: 5;
  overflow-y: auto;
`;

const ProjectsTitle = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2.5rem;
  color: var(--primary-color);
  text-shadow: 0 0 10px rgba(0, 85, 255, 0.5);
`;

const ProjectsPage = () => {
    return (
        <ProjectsPageContainer>
            <LedGrid />
            <GradientOverlay />
            <ContentContainer>
                <ProjectsTitle>My Projects</ProjectsTitle>
                <ProjectTimeline />
            </ContentContainer>
        </ProjectsPageContainer>
    );
};

export default ProjectsPage;