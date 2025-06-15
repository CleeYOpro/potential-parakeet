import styled from 'styled-components';

const OverlayContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2; /* Increased z-index to ensure visibility */
  pointer-events: none; /* Allow clicks to pass through */
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.7) 0%,
    rgba(0, 0, 0, 0.5) 20%,
    rgba(0, 0, 0, 0.3) 40%,
    rgba(0, 0, 0, 0.1) 70%,
    rgba(0, 0, 0, 0) 100%
  );
`;

const GradientOverlay = () => {
    return <OverlayContainer />;
};

export default GradientOverlay;