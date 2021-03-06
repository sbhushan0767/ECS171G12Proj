import React from 'react';
import { Col, Input } from 'antd';
import styled from 'styled-components';

const StyledLabel = styled.h6`
  font-size: 10px;
  margin-bottom: 0;
`;

const StyledInput = styled(Input)`
  padding-left: 0;
  padding-bottom: 0;
`;

const InputBox = props => {
  return (
    <Col span={8} offset={props.offset}>
      <StyledLabel>{props.title}</StyledLabel>
      <StyledInput
        type='number'
        onChange={e => props.change(parseFloat(e.target.value))}
        bordered={false}
        min={props.min}
        max={props?.max}
      />
      <hr />
    </Col>
  );
};

export default InputBox;
