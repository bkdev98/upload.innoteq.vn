import React from 'react';
import styled from 'styled-components';

const Outer = styled.div`
  width: 100%;
  padding: 0 20px;
`;

const Inner = styled.div`
  max-width: 1024px;
  margin: 0 auto;
`;

const Wrapper = ({ outerStyle, innerStyle, children }) => (
  <Outer style={outerStyle}>
    <Inner style={innerStyle}>
      {children}
    </Inner>
  </Outer>
);

export default Wrapper;
