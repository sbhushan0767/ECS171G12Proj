import React, { useState } from 'react';
import { Button, Col, Row } from 'antd';
import styled from 'styled-components';
import CreditColumn from './CreditColumn';
import RadioButtons from './RadioButtons';
import SelectBoxes from './SelectBoxes';
import InputBoxes from './InputBoxes';

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
  margin-top: 5em;
  border-radius: 5px;
  background-color: ABDBF8;
`;

const FormContainer = () => {
  // These are our state variables
  // They will be used later on to submit to the API
  const [loan, setLoan] = useState(0);
  const [income, setIncome] = useState(0);
  const [years, setYears] = useState(0);
  const [debt, setDebt] = useState(0);
  const [homeOwnership, sethomeOwnership] = useState('');
  const [purpose, setPurpose] = useState('');
  const [term, setTerm] = useState('');

  return (
    <StyledContainer>
      <Row>
        {/* This one should be the thing displaying credit score */}
        <StyledCol span={9}>
          <CreditColumn score={679} />
        </StyledCol>

        {/* This should be displaying the form inputs */}
        <StyledForm span={12} offset={1}>
          <InputBoxes
            setLoan={setLoan}
            setIncome={setIncome}
            setYears={setYears}
            setDebt={setDebt}
          />

          {/* This displays the radio buttons */}
          <h2>Term</h2>
          <Row>
            <RadioButtons change={setTerm} offset={0} />
          </Row>
          <br />

          {/* To display select boxes */}
          <SelectBoxes
            sethomeOwnership={sethomeOwnership}
            setPurpose={setPurpose}
          />

          <Row>
            <ButtonStyle type='primary'>Calculate Score</ButtonStyle>
          </Row>
        </StyledForm>
      </Row>
    </StyledContainer>
  );
};

export default FormContainer;
