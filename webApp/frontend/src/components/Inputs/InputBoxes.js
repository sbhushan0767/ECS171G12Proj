import React from 'react';
import { Row } from 'antd';
import InputBox from './InputBox';

const InputBoxes = props => {
  return (
    <div>
      {/* Row 1 */}
      <Row>
        <InputBox
          title='Current Loan Amount'
          change={props.setLoan}
          offset={0}
          min={0}
        />
        <InputBox
          title='Annual Income'
          change={props.setIncome}
          offset={8}
          min={0}
        />
      </Row>
      <br />

      {/* Row 2 */}
      <Row>
        <InputBox
          title='Years in Current Job'
          change={props.setYears}
          offset={0}
          min={0}
        />
        <InputBox
          title='Monthly Debt'
          change={props.setDebt}
          offset={8}
          min={0}
        />
      </Row>
      <br />

      {/* Row 3 */}
      <Row>
        <InputBox
          title='Years of Credit History'
          change={props.setCreditHistory}
          offset={0}
          min={0}
        />
        <InputBox
          title='Last delinquent'
          change={props.setLastDelinquent}
          offset={8}
          min={0}
        />
      </Row>
      <br />

      {/* Row 4 */}
      <Row>
        <InputBox
          title='# Open Accounts'
          change={props.setOpenAccounts}
          offset={0}
          min={0}
        />
        <InputBox
          title='Current Credit Balance'
          change={props.setCreditBalance}
          offset={8}
          min={0}
        />
      </Row>
      <br />

      {/* Row 5 */}
      <Row>
        <InputBox
          title='Maximum Open Credit'
          change={props.setMaxCredit}
          offset={0}
          min={0}
        />
      </Row>
      <br />
    </div>
  );
};

export default InputBoxes;
