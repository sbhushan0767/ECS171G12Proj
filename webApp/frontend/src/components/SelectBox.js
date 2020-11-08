import { Select } from 'antd';
import { Col } from 'antd';
import styled from 'styled-components';


const StyledLabel = styled.h6`
  margin-bottom: 0;
`;

/*const StyledInput = styled(Input)`
  padding-left: 0;
  padding-bottom: 0;
`;

const { Option } = Select;
*/

function handleChange(value) {
    console.log(`selected ${value}`);
}

const SelectBox = props => {
    return (
      <Col span={8} offset={props.offset}>
        <StyledLabel>{props.title}</StyledLabel>
        <Select options = {props.options} 
            style={{ width: 160 }} 
            onChange={handleChange}
        />
        <hr />
      </Col>
    );
};

export default SelectBox;
