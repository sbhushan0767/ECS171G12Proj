import React, { useState } from 'react';
import { Button, Col, Row } from 'antd';
import styled from 'styled-components';
import CreditColumn from './CreditColumn';
import RadioButtons from './RadioButtons';
import SelectBoxes from './SelectBoxes/SelectBoxes';
import InputBoxes from './Inputs/InputBoxes';

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
  margin-top: 3em;
  margin-bottom: 3em;
  border: none;
  border-radius: 5px;
  color: white;
  background-color: #abdbf8;
`;

const FormContainer = () => {
  // These are our state variables
  // They will be used later on to submit to the API
  const [linearScore, setLinearScore] = useState(0);
  const [svrScore, setSvrScore] = useState(0);
  const [logisticScore, setLogisticScore] = useState(0);
  const [forestScore, setForestScore] = useState(0);
  const [loan, setLoan] = useState(0);
  const [income, setIncome] = useState(0);
  const [years, setYears] = useState(0);
  const [debt, setDebt] = useState(0);
  const [creditHistory, setCreditHistory] = useState(0);
  const [lastDelinquent, setLastDelinquent] = useState(0);
  const [openAccounts, setOpenAccounts] = useState(0);
  const [creditProblems, setCreditProblems] = useState(0);
  const [creditBalance, setCreditBalance] = useState(0);
  const [maxCredit, setMaxCredit] = useState(0);
  const [bankruptcies, setBankruptcies] = useState(0);
  const [liens, setLiens] = useState(0);
  const [homeOwnership, sethomeOwnership] = useState('');
  const [purpose, setPurpose] = useState('');
  const [loanStatus, setLoanStatus] = useState('');
  const [term, setTerm] = useState('');

  // Note this function is used to call the API when the user inputs their credit information
  // We NEED to change the url when in production
  const fetchCreditScore = async () => {
    const data = {
      loan: loan,
      income: income,
      years: years,
      debt: debt,
      creditHistory: creditHistory,
      lastDelinquent: lastDelinquent,
      openAccounts: openAccounts,
      creditProblems: creditProblems,
      creditBalance: creditBalance,
      maxCredit: maxCredit,
      bankruptcies: bankruptcies,
      liens: liens,
      homeOwnership: homeOwnership,
      purpose: purpose,
      loanStatus: loanStatus,
      term: term
    };

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };

    const result = await fetch(`http://127.0.0.1:5000/predict`, requestOptions);
    const json = await result.json();
    setLinearScore(json.linearCreditScore);
    setSvrScore(json.svrCreditScore);
    setLogisticScore(json.logisticCreditScore);
    setForestScore(json.randomForestCreditScore);
  };

  return (
    <StyledContainer>
      <Row>
        {/* This one should be the thing displaying credit score */}
        <StyledCol span={9}>
          <CreditColumn
            score={linearScore}
            title={'Linear Regression Credit Score'}
          />
          <CreditColumn score={svrScore} title={'SVR Credit Score'} />
          <CreditColumn
            score={logisticScore}
            title={'Logistic Regression Credit Score'}
            format={logisticScore}
          />
          <CreditColumn
            score={forestScore}
            title={'Random Forest Credit Score'}
          />
        </StyledCol>

        {/* This should be displaying the form inputs */}
        <StyledForm span={12} offset={1}>
          <InputBoxes
            setLoan={setLoan}
            setIncome={setIncome}
            setYears={setYears}
            setDebt={setDebt}
            setCreditHistory={setCreditHistory}
            setLastDelinquent={setLastDelinquent}
            setOpenAccounts={setOpenAccounts}
            setCreditProblems={setCreditProblems}
            setCreditBalance={setCreditBalance}
            setMaxCredit={setMaxCredit}
            setBankruptcies={setBankruptcies}
            setLiens={setLiens}
          />

          {/* This displays the radio buttons */}
          <RadioButtons
            setTerm={setTerm}
            setCreditProblems={setCreditProblems}
            setBankruptcies={setBankruptcies}
            setLiens={setLiens}
            offset={0}
          />
          <br />

          {/* To display select boxes */}
          <SelectBoxes
            sethomeOwnership={sethomeOwnership}
            setPurpose={setPurpose}
            setLoanStatus={setLoanStatus}
          />

          <Row>
            <ButtonStyle onClick={fetchCreditScore}>
              Calculate Score
            </ButtonStyle>
          </Row>
        </StyledForm>
      </Row>
    </StyledContainer>
  );
};

export default FormContainer;
