import React from 'react';
import { Row } from 'antd';
import SelectBox from './SelectBox';

const homeOwnOptions = [
  { value: 'homeMortgage', label: 'Home Mortgage' },
  { value: 'rent', label: 'Rent' },
  { value: 'own', label: 'Own Home' },
  { value: 'haveMortgage', label: 'Have Mortgage' }
];

const purposeOptions = [
  { value: 'debtConsolidation', label: 'Debt Consolidation' },
  { value: 'homeImprovements', label: 'Home Improvements' },
  { value: 'other', label: 'other' },
  { value: 'business', labe: 'Business Loan' }
];

const loanStatusOptions = [
  { value: 'fullyPaid', label: 'Fully Paid'},
  { value: 'chargedOff', label: 'Charged Off'}
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
