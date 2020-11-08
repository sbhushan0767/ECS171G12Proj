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
  { value: 'other1', label: 'other' },
  { value: 'other2', label: 'Other' },
  { value: 'business', labe: 'Business Loan' }
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
    </Row>
  );
};

export default SelectBoxes;
