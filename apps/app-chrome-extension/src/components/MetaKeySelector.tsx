import React from 'react';
import styled from 'styled-components';

interface MetaKeySelectorProps {
  selectedKey: string;
  onKeyChange: (key: string) => void;
}

const MetaKeySelector: React.FC<MetaKeySelectorProps> = ({
  selectedKey,
  onKeyChange,
}) => (
  <StyledSelectContainer>
    <label htmlFor="metaKeySelect">Select Meta Key: </label>
    <select
      id="metaKeySelect"
      value={selectedKey}
      onChange={(e) => onKeyChange(e.target.value)}
    >
      <option value="Ctrl">Ctrl</option>
      <option value="Alt">Alt</option>
    </select>
  </StyledSelectContainer>
);

export default MetaKeySelector;

const StyledSelectContainer = styled.div`
  margin-bottom: 10px;
`;
