import styled from 'styled-components';

const TimelineContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 1rem;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    width: 4px;
    background-color: var(--primary-color);
    top: 0;
    bottom: 0;
    left: 50%;
    margin-left: -2px;
    border-radius: 2px;
    box-shadow: 0 0 15px var(--primary-color);
    
    @media (max-width: 768px) {
      left: 20px;
      width: 3px;
      margin-left: -1.5px;
    }
  }

  @media (min-width: 768px) {
    padding: 2rem;
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
      left: -52px;
      width: calc(100% + 18px);
      margin-left: 40px;
      padding: 10px 20px 10px 40px;
    }
  }
  
  &:nth-child(even) {
    left: 50.8%;
    @media (max-width: 768px) {
      left: -45px;
      width: calc(100% + 10px);
      margin-left: 40px;
      padding: 10px 20px 10px 40px;
    }
  }
  
  &::after {
    content: '';
    position: absolute;
    width: 14px;
    height: 14px;
    background-color: var(--primary-color);
    border: 2px solid var(--primary-color);
    top: 50%;
    left: 100%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    z-index: 1;
    box-shadow: 0 0 10px var(--primary-color);

    @media (max-width: 768px) {
      left: 20px;
      transform: translate(-50%, -50%);
    }
  }
  
  &:nth-child(even)::after {
    @media (max-width: 768px) {
      left: calc(20px - 7px);
    }
    @media (min-width: 769px) {
      left: -8px;
    }
  }
`;

const TimelineContent = styled.div`
  padding: 15px 20px;
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

  @media (max-width: 768px) {
    padding: 12px 15px;
  }
`;

const ProjectTitle = styled.h3`
  margin: 0 0 10px 0;
  color: var(--primary-color);
  font-size: 1.2rem;
  font-weight: bold;
  line-height: 1.4;

  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

const ProjectDate = styled.div`
  background-color: rgba(20, 20, 20, 0.9);
  color: #fff;
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: bold;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  border: 1px solid var(--primary-color);
  z-index: 2;
  margin-bottom: 8px;

  @media (min-width: 769px) {
    position: absolute;
    top: 15px;
    ${TimelineItem}:nth-child(odd) & {
      right: -45px;
      transform: translateX(100%);
    }
    ${TimelineItem}:nth-child(even) & {
      left: -45px;
      transform: translateX(-100%);
    }
  }

  @media (max-width: 768px) {
    position: static;
    left: 0;
    right: auto;
    transform: none;
    top: 0;
    display: block;
    margin-bottom: 8px;
    font-size: 0.8rem;
    padding: 6px 10px;
  }
`;

const ProjectDescription = styled.p`
  margin: 0;
  line-height: 1.5;
  color: #ddd;
  font-size: 0.9rem;

  @media (min-width: 768px) {
    font-size: 1rem;
    line-height: 1.6;
  }
`;

const AwardBanner = styled.div`
  position: absolute;
  top: -12px;
  right: -12px;
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
  
  @media (max-width: 768px) {
    top: -8px;
    right: -4px;
    font-size: 0.7rem;
    padding: 3px 6px;
  }
`;

const WtsaLogo = styled.img`
  height: 16px;
  width: auto;
  object-fit: contain;

  @media (max-width: 768px) {
    height: 14px;
  }
`;

const ProjectTimeline = () => {
  const projects = [

    {
      id: 8,
      title: "Project AzotoColumn: A Smart Eco-Engineered Solution for Agricultural Nitrogen Runoff Management",
      date: "July 2025",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc sit amet ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.",
      award: "4th place",
      level: "Washington"
    },
    {
      id: 7,
      title: "Fault Lines and Front Lines: A Comprehensive Geospatial Analysis of Earthquake Hazards in Seattle's Urban Environment",
      date: "June 2025",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc sit amet ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.",
      award: "1st place",
      level: "Washington"
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
          <ProjectDate>{project.date}</ProjectDate>
          <TimelineContent>
            {project.award && (
              <AwardBanner>
                {project.level}
                <WtsaLogo src="/wtsa.png" alt="WTSA Logo" />
                {project.award}
              </AwardBanner>
            )}
            <ProjectTitle>{project.title}</ProjectTitle>
            <ProjectDescription>{project.description}</ProjectDescription>
          </TimelineContent>
        </TimelineItem>
      ))}
    </TimelineContainer>
  );
};

export default ProjectTimeline;