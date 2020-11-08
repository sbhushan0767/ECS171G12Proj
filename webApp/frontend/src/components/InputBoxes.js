import React from 'react';
import { Row } from 'antd';
import InputBox from './InputBox';

const InputBoxes = props => {
  return (
    <div>
      <Row>
        <InputBox
          title='Current Loan Amount'
          change={props.setLoan}
          offset={0}
        />
        <InputBox title='Annual Income' change={props.setIncome} offset={8} />
      </Row>
      <br />

      <Row>
        <InputBox
          title='Years in Current Job'
          change={props.setYears}
          offset={0}
        />
        <InputBox title='Monthly Debt' change={props.setDebt} offset={8} />
      </Row>
      <br />
    </div>
  );
};

export default InputBoxes;
