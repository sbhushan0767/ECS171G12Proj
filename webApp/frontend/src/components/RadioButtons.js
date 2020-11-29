import React from 'react';
import { Col, Radio, Row } from 'antd';
import styled from 'styled-components';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const RadioButtons = props => {
  return (
    <div>
      <h3>Term</h3>
      <Row>
        <Col span={8} offset={props.offset}>
          <Radio.Group onChange={e => props.setTerm(e.target.value)}>
            <StyledContainer>
              <Radio value={0}>Short Term</Radio>
              <Radio value={1}>Long Term</Radio>
            </StyledContainer>
          </Radio.Group>
        </Col>
      </Row>
      <br />

      <h3>Do you have credit problems?</h3>
      <Row>
        <Col span={8} offset={props.offset}>
          <Radio.Group onChange={e => props.setCreditProblems(e.target.value)}>
            <StyledContainer>
              <Radio value={1}>True</Radio>
              <Radio value={0}>False</Radio>
            </StyledContainer>
          </Radio.Group>
        </Col>
      </Row>
      <br />

      <h3>Do you have any bankruptcies?</h3>
      <Row>
        <Col span={8} offset={props.offset}>
          <Radio.Group onChange={e => props.setBankruptcies(e.target.value)}>
            <StyledContainer>
              <Radio value={1}>True</Radio>
              <Radio value={0}>False</Radio>
            </StyledContainer>
          </Radio.Group>
        </Col>
      </Row>
      <br />

      <h3>Do you have any Tax Liens?</h3>
      <Row>
        <Col span={8} offset={props.offset}>
          <Radio.Group onChange={e => props.setLiens(e.target.value)}>
            <StyledContainer>
              <Radio value={1}>True</Radio>
              <Radio value={0}>False</Radio>
            </StyledContainer>
          </Radio.Group>
        </Col>
      </Row>
      <br />
    </div>
  );
};

export default RadioButtons;
