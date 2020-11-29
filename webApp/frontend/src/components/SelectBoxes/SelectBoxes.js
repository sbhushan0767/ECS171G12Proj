import React from 'react';
import { Row } from 'antd';
import SelectBox from './SelectBox';

const homeOwnOptions = [
  { value: 'Home Mortgage', label: 'Home Mortgage' },
  { value: 'Own Home', label: 'Own Home' },
  { value: 'Rent', label: 'Rent' }
];

const purposeOptions = [
  { value: 'Home Improvements', label: 'Home Improvements' },
  { value: 'Debt Consolidation', label: 'Debt Consolidation' },
  { value: 'Buy House', label: 'Buy House' },
  { value: 'Business Loan', label: 'Business Loan' },
  { value: 'Other', label: 'Other' },
  { value: 'marjor_purhcase', label: 'marjor_purhcase' },
  { value: 'vacation', label: 'vacation' },
  { value: 'Medical Bills', label: 'Medical Bills' },
  { value: 'wedding', labe: 'wedding' },
  { value: 'Educational Expenses', labe: 'Educational Expenses' },
  { value: 'moving', labe: 'moving' },
  { value: 'renewable_energer', labe: 'renewable_energer' }
];

const loanStatusOptions = [
  { value: 'Fully Paid', label: 'Fully Paid' },
  { value: 'Charged Off', label: 'Charged Off' }
];

const SelectBoxes = props => {
  return (
    <Row>
      <SelectBox
        title='Home Ownership'
        change={props.sethomeOwnership}
        offset={0}
        options={homeOwnOptions}
      />
      <SelectBox
        title='Purpose'
        change={props.setPurpose}
        offset={8}
        options={purposeOptions}
      />
      <SelectBox
        title='Loan Status'
        change={props.setLoanStatus}
        offset={0}
        options={loanStatusOptions}
      />
    </Row>
  );
};

export default SelectBoxes;
