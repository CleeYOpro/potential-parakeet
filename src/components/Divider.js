import React from 'react';
import styled from 'styled-components';

const DividerLine = styled.div`
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, transparent,rgb(77, 208, 255), transparent);
  margin: 2rem 0;
`;

const Divider = () => {
  return <DividerLine />;
};

export default Divider; 