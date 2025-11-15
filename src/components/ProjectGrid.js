import React from 'react';
import styled from 'styled-components';
import MagicBento from './MagicBento';

const ProjectsContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 2rem 1rem;
  background: transparent;
  position: relative;
`;



const projects = [
  {
    title: 'Price it Right Market Simulator',
    description: 'This project shows how price affects demand, profit, and revenue using interactive charts and sliders. It includes market events and teaches key business ideas like supply & demand, pricing strategy, and profit optimization in a fun, visual way.',
    image: '/priceitright.png',
    label: 'Pricing, Microeconomics, TypeScript, Business',
    link: 'https://priceprofit.cleof.us/',
    github: 'https://github.com/CleeYOpro/demandprice_pro',
  },
  {
    title: 'Project AzotoColumn',
    description: 'Filters runoff through layered bioretention media, reducing harmful chemicals while supporting diverse farm conditions and improving long-term soil and water quality.',
    image: '/azoto.png',
    label: 'Eco Engineering, Data Analysis, Research',
    portfolio: 'https://drive.google.com/file/d/1aRteul6QmGu1CgswCCBV31lTWn1scPMY/view?usp=sharing',
    poster: 'https://drive.google.com/file/d/18zKy_aYVhCDZIGRtivxBvt7vb7SfQ0Q3/view?usp=sharing',
  },
  {
    title: 'Fault Lines and Front Lines',
    description: 'GIS and Python map Seattle\'s seismic risks, predict quakes, assess infrastructure, and optimize evacuation and emergency planning.',
    image: '/urm.png',
    label: 'Data Analysis, Python, Disaster Response, GIS',
    pdf: 'https://drive.google.com/file/d/1gLBq9b4jJ90F_pYGyh_cpTNpMdKyHJj-/view?usp=sharing',
    github: 'https://github.com/CleeYOpro/seattle_fault_project',
  },
  {
    title: 'Cleof.us Portfolio',
    description: 'A modern React portfolio with a dynamic hero, project highlights, interactive UI, and responsive design—showcasing front-end skills and creative flair.',
    image: '/cleof.png',
    label: 'Personal Site',
    link: 'https://cleof.us/',
    github: 'https://github.com/CleeYOpro/potential-parakeet.git',
  },
  {
    title: 'CMC Palliative Website',
    description: 'A responsive site for CMC Palliative Care showcasing services, team, and contact—built for clarity, accessibility, and thoughtful design.',
    image: '/palli.png',
    label: 'Medical Web, HTML5, CSS3',
    link: 'https://palliativecmc.vercel.app/',
    github: 'https://github.com/CleeYOpro/CMC-project',
  },
  {
    title: 'Wordle Whiz',
    description: 'An interactive Wordle-solving tool built using the python library CMU CS academy that filters words based on clues using input logic, visuals, and clean UI.',
    image: '/cs-academy-canvas.png',
    label: 'Game, Web, Python',
    link: '/wordle.html',
  },
  {
    title: 'Rocket for TARC',
    description: 'Our rocketry team built a working model rocket to qualify for TARC nationals after overcoming major launch setbacks, refining our design, and achieving near-perfect flight scores.',
    image: '/WhatsApp Image 2024-04-07 at 11.00.16 AM.jpeg',
    label: 'Rocketry, Rocket Engineering',
    launch: 'https://youtube.com/shorts/ijfCUH0ua78?si=FOFAJj5UrJFGQmuk',
    readMore: 'https://medium.com/@cleobala/launching-dreams-my-rocketry-journey-cacee0deb780',
  },
];

const ProjectGrid = () => {
  return (
    <ProjectsContainer>
      <MagicBento
        cardData={projects}
        textAutoHide={false}
        enableStars={true}
        enableSpotlight={true}
        enableBorderGlow={true}
        enableTilt={true}
        enableMagnetism={false}
        clickEffect={false}
        spotlightRadius={500}
        particleCount={12}
        glowColor={'132, 0, 255'}
      />
    </ProjectsContainer>
  );
};

export default ProjectGrid;
