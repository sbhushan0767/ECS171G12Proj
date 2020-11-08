import React, { useState } from 'react';
import { Col, Row } from 'antd';
import styled from 'styled-components';
import InputBox from './InputBox';
import CreditColumn from './CreditColumn';
import SelectBox from './SelectBox';

const homeOwnOptions = [
  { value: 'homeMortgage', label: 'Home Mortgage' },
  { value: 'rent', label: 'Rent' },
  { value: 'own', label: 'Own Home' },
  { value: 'haveMortgage', label: 'Have Mortgage'}
]

const purposeOptions = [
  { value: 'debtConsolidation', label: 'Debt Consolidation' },
  { value: 'homeImprovements', label: 'Home Improvements' },
  { value: 'other1', label: 'other' },
  { value: 'other2', label: 'Other'},
  { value: 'business', labe: 'Business Loan'}
]

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

const FormContainer = () => {
  // These are our state variables
  // They will be used later on to submit to the API
  const [loan, setLoan] = useState(0);
  const [income, setIncome] = useState(0);
  const [years, setYears] = useState(0);
  const [debt, setDebt] = useState(0);
  const [homeOwnership, sethomeOwnership] = useState('');
  const [purpose, setPurpose] = useState('');

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

          {/* To display select boxes */}
          <Row>
            <SelectBox 
              title='Home Ownership' 
              change={sethomeOwnership} 
              offset={0}
              options = {homeOwnOptions}
            />
            <SelectBox 
              title='Purpose' 
              change={setPurpose} 
              offset={8}
              options = {purposeOptions}
            />
          </Row>
        </StyledForm>
      </Row>
    </StyledContainer>
  );
};

export default FormContainer;
