import React, { useState } from 'react';
import { Col, Row } from 'antd';
import styled from 'styled-components';
import InputBox from './InputBox';

const StyledContainer = styled.div`
  margin: auto;
  margin-top: 10em;
  width: 60%;
  border: 0.1px solid black;
  border-radius: 10px;
  background-color: white;
`;

const StyledCol = styled(Col)`
  border-radius: 10px;
  background-color: #039be5;
`;

const StyledForm = styled(Col)`
  padding: 25px;
`;

const FormContainer = () => {
  // These are our state variables
  // They will be used later on to submit to the API
  const [loan, setLoan] = useState(0);
  const [income, setIncome] = useState(0);
  const [years, setYears] = useState(0);
  const [debt, setDebt] = useState(0);

  return (
    <StyledContainer>
      <Row>
        {/* This one should be the thing displaying credit score */}
        <StyledCol span={8}>col-6</StyledCol>

        {/* This should be displaying the form inputs */}
        <StyledForm span={12} offset={1}>
          <Row>
            <InputBox title='Current Loan Amount' change={setLoan} offset={0} />
            <InputBox title='Annual Income' change={setIncome} offset={8} />
          </Row>
          <br />

          <Row>
            <InputBox title='Years in Current Job' change={setYears} offset={0} />
            <InputBox title='Monthly Debt' change={setDebt} offset={8} />
          </Row>
        </StyledForm>
      </Row>
    </StyledContainer>
  );
};

export default FormContainer;
