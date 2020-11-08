import React from 'react';
import { Col, Select } from 'antd';
import styled from 'styled-components';

const StyledLabel = styled.h6`
  padding-top: 10px;
  padding-bottom: 10px;
`;

const SelectBox = props => {
  return (
    <Col span={8} offset={props.offset}>
      <StyledLabel>{props.title}</StyledLabel>
      <Select
        options={props.options}
        style={{ width: 160 }}
        onChange={props.change}
      />
    </Col>
  );
};

export default SelectBox;
