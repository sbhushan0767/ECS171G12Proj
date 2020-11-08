import React, { useState } from 'react';
import { Col, Row } from 'antd';
import styled from 'styled-components';
import InputBox from './InputBox';
import CreditColumn from './CreditColumn';
import RadioButtons from './RadioButtons';
import SelectBox from './SelectBox';
import { Button } from 'antd';



const StyledContainer = styled.div`
  margin: auto;
  margin-top: 10em;
  width: 60%;
  border: 0.1px solid #f2f3f4;
  border-radius: 10px;
  background-color: white;
`;

const StyledCol = styled(Col)`
  border-radius: 10px;
  background-color: #abdbf8;
`;

const StyledForm = styled(Col)`
  padding: 3em 25px 25px 25px;
`;

const ButtonStyle = styled(Button)`

border-radius: 5px;
background: ABDBF8;
`;

const FormContainer = () => {
  // These are our state variables
  // They will be used later on to submit to the API
  const [loan, setLoan] = useState(0);
  const [income, setIncome] = useState(0);
  const [years, setYears] = useState(0);
  const [debt, setDebt] = useState(0);
  const [term, setTerm] = useState(0);
  
  console.log(term); 
  return (
    <StyledContainer>
      <Row>
        {/* This one should be the thing displaying credit score */}
        <StyledCol span={9}>
          <CreditColumn score={679} />
        </StyledCol>

        {/* This should be displaying the form inputs */}
        <StyledForm span={12} offset={1}>
          <Row>
            <InputBox title='Current Loan Amount' change={setLoan} offset={0} />
            <InputBox title='Annual Income' change={setIncome} offset={8} />
          </Row>
          <br />

          <Row>
            <InputBox
              title='Years in Current Job'
              change={setYears}
              offset={0}
            />
            <InputBox title='Monthly Debt' change={setDebt} offset={8} />
          </Row>
          <br/>
          <h2>Term</h2>
          <Row>
          <RadioButtons change = {setTerm} offset={0} />
          </Row>
          <br/>
          //Displays Calculate score btn  
          <Row>
        <ButtonStyle type="primary">Calculate Score</ButtonStyle>
        </Row>
    
        </StyledForm>
      </Row>
    </StyledContainer>
  );
};

export default FormContainer;
