import React from 'react';
import styled from 'styled-components';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  padding: 2rem;
  margin-top: 2rem;
`;

const MediaBox = styled.div`
  aspect-ratio: 16/9;
  background-color: #111;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const MediaGrid = () => {
    return (
        <GridContainer>
            <MediaBox>
                {/* Placeholder for windsurfing video/image */}
                <img
                    src="https://via.placeholder.com/800x450/111111/666666?text=Windsurfing+Content"
                    alt="Windsurfing content"
                />
            </MediaBox>
            <MediaBox>
                {/* Placeholder for personal brand video/image */}
                <img
                    src="https://via.placeholder.com/800x450/111111/666666?text=Personal+Brand"
                    alt="Personal brand content"
                />
            </MediaBox>
            <MediaBox>
                {/* Placeholder for code editor video/image */}
                <img
                    src="https://via.placeholder.com/800x450/111111/666666?text=Code+Editor"
                    alt="Code editor content"
                />
            </MediaBox>
        </GridContainer>
    );
};

export default MediaGrid; 