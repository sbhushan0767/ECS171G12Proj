import React from 'react';
import { Progress } from 'antd';
import styled from 'styled-components';

const StyledContainer = styled.div`
  margin: auto;
  width: 60%;
  padding: 10px;
`;

const StyledProgress = styled(Progress)`
  margin: auto;
  padding: 0 15px 1em 15px;
`;

const StyledTitle = styled.h3`
  padding: 0.5em 0 0.5em 0;
  color: white;
`;

// Max credit score = 850, min credit score = 300
const FormContainer = props => {
  const percentage = (props.score / 850) * 100;

  return (
    <StyledContainer>
      <StyledTitle>{props.title}</StyledTitle>
      <StyledProgress
        percent={percentage}
        strokeColor={{
          '0%': '#40ff5e',
          '80%': '#ffe775',
          '100%': '#ff3b3d'
        }}
        format={() => `${props.score}`}
        type='dashboard'
      />
    </StyledContainer>
  );
};

export default FormContainer;
