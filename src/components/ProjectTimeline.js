import React from 'react';
import styled from 'styled-components';

const TimelineContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    width: 6px;
    background-color: var(--primary-color);
    top: 0;
    bottom: 0;
    left: 50%;
    margin-left: -3px;
    border-radius: 3px;
    box-shadow: 0 0 15px var(--primary-color);
    
    @media (max-width: 768px) {
      left: 31px;
    }
  }
`;

const TimelineItem = styled.div`
  padding: 10px 40px;
  position: relative;
  width: 50%;
  box-sizing: border-box;
  margin: 2rem 0;
  
  &:nth-child(odd) {
    left: 0;
    
    @media (max-width: 768px) {
      left: 0;
      width: calc(100% - 60px);
      margin-left: 60px;
    }
  }
  
  &:nth-child(even) {
    left: 50%;
    
    @media (max-width: 768px) {
      left: 0;
      width: calc(100% - 60px);
      margin-left: 60px;
    }
  }
  
  &::after {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    right: -10px;
    background-color: var(--primary-color);
    border: 4px solid var(--primary-color);
    top: 15px;
    border-radius: 50%;
    z-index: 1;
    box-shadow: 0 0 10px var(--primary-color);
    
    @media (max-width: 768px) {
      left: -44px;
      right: auto;
    }
  }
  
  &:nth-child(even)::after {
    left: -10px;
    
    @media (max-width: 768px) {
      left: -44px;
    }
  }
`;

const TimelineContent = styled.div`
  padding: 20px 25px;
  background-color: rgba(30, 30, 30, 0.8);
  position: relative;
  border-radius: 6px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(100, 100, 100, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
  }
`;

const ProjectTitle = styled.h3`
  margin: 0 0 10px 0;
  color: var(--primary-color);
  font-size: 1.5rem;
  font-weight: bold;
`;

const ProjectDate = styled.div`
  position: absolute;
  background-color: rgba(20, 20, 20, 0.9);
  color: #fff;
  padding: 10px 15px;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  top: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  border: 1px solid var(--primary-color);
  
  ${TimelineItem}:nth-child(odd) & {
    right: -150px;
    
    @media (max-width: 768px) {
      position: relative;
      right: auto;
      top: -10px;
      display: inline-block;
      margin-bottom: 10px;
    }
  }
  
  ${TimelineItem}:nth-child(even) & {
    left: -150px;
    
    @media (max-width: 768px) {
      position: relative;
      left: auto;
      top: -10px;
      display: inline-block;
      margin-bottom: 10px;
    }
  }
`;

const ProjectDescription = styled.p`
  margin: 0;
  line-height: 1.6;
  color: #ddd;
`;

const AwardBanner = styled.div`
  position: absolute;
  top: -15px;
  right: -15px;
  background-color: gold;
  color: #000;
  padding: 5px 10px;
  border-radius: 4px;
  font-weight: bold;
  font-size: 0.9rem;
  box-shadow: 0 0 10px rgba(255, 215, 0, 0.7);
  display: flex;
  align-items: center;
  gap: 5px;
  z-index: 2;
  transform: rotate(5deg);
  
  @media (max-width: 768px) {
    top: -10px;
    right: -5px;
    font-size: 0.8rem;
  }
`;

const WtsaLogo = styled.img`
  height: 20px;
  width: auto;
  object-fit: contain;
`;

const ProjectTimeline = () => {
    const projects = [
        {
            id: 8,
            title: "Project AzotoColumn: A Smart Eco-Engineered Solution for Agricultural Nitrogen Runoff Management",
            date: "July 2025",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc sit amet ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.",
            award: "Washington TSA 4th place"
        },
        {
            id: 7,
            title: "Fault Lines and Front Lines: A Comprehensive Geospatial Analysis of Earthquake Hazards in Seattle's Urban Environment",
            date: "June 2025",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc sit amet ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.",
            award: "Washington TSA 1st place"
        },
        {
            id: 6,
            title: "Cleof.us",
            date: "May 2025",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc sit amet ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl."
        },
        {
            id: 5,
            title: "Department of Palliative Medicine CMC Vellore Website",
            date: "March 2025",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc sit amet ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl."
        },
        {
            id: 4,
            title: "Grow Smart: A Research Project",
            date: "June 2024",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc sit amet ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl."
        },
        {
            id: 3,
            title: "Wordle Whiz",
            date: "May 2024",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc sit amet ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl."
        },
        {
            id: 2,
            title: "Model Rocket for TARC",
            date: "April 2024",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc sit amet ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl."
        },
        {
            id: 1,
            title: "The EYW Pinhole Camera",
            date: "November 2023",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc sit amet ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl."
        }
    ];

    return (
        <TimelineContainer>
            {projects.map(project => (
                <TimelineItem key={project.id}>
                    <TimelineContent>
                        {project.award && (
                            <AwardBanner>
                                <WtsaLogo src="src/components/wtsa.png" alt="WTSA Logo" />
                                {project.award}
                            </AwardBanner>
                        )}
                        <ProjectTitle>{project.title}</ProjectTitle>
                        <ProjectDate>{project.date}</ProjectDate>
                        <ProjectDescription>{project.description}</ProjectDescription>
                    </TimelineContent>
                </TimelineItem>
            ))}
        </TimelineContainer>
    );
};

export default ProjectTimeline;