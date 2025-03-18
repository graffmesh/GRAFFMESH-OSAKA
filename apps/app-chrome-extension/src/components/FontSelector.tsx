import React from 'react';
import styled from 'styled-components';

interface FontSelectorProps {
  font: string;
  onFontChange: (value: string) => void;
}

const FontSelector: React.FC<FontSelectorProps> = ({ font, onFontChange }) => (
  <StyledSelect value={font} onChange={(e) => onFontChange(e.target.value)}>
    <option value="Arial">Arial</option>
    <option value="Roboto">Roboto</option>
    <option value="Courier New">Courier New</option>
  </StyledSelect>
);

export default FontSelector;

// Styled Components
const StyledSelect = styled.select`
  margin-bottom: 10px;
  width: 100%;
`;
