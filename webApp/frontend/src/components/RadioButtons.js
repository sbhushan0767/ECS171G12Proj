import React from 'react';
import { Col, Radio } from 'antd';
import styled from 'styled-components';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const RadioButtons = props => {
  return (
    <Col span={8} offset={props.offset}>
      <Radio.Group onChange={e => props.change(e.target.value)}>
        <StyledContainer>
          <Radio value={'Short Term'}>Short Term</Radio>
          <Radio value={'Long Term'}>Long Term</Radio>
        </StyledContainer>
      </Radio.Group>
    </Col>
  );
};

export default RadioButtons;
