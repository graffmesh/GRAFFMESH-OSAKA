import React from 'react';
import styled from 'styled-components';

interface FontSizeSelectorProps {
  fontSize: string;
  onFontSizeChange: (value: string) => void;
}

const FontSizeSelector: React.FC<FontSizeSelectorProps> = ({
  fontSize,
  onFontSizeChange,
}) => (
  <StyledSelect
    value={fontSize}
    onChange={(e) => onFontSizeChange(e.target.value)}
  >
    <option value="12px">Small (12px)</option>
    <option value="14px">Medium (14px)</option>
    <option value="16px">Large (16px)</option>
  </StyledSelect>
);

export default FontSizeSelector;

// Styled Components
const StyledSelect = styled.select`
  margin-bottom: 10px;
  width: 100%;
`;
