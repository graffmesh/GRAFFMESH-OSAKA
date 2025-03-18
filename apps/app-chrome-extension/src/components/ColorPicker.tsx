import React from 'react';
import styled from 'styled-components';

interface ColorPickerProps {
  label: string;
  color: string;
  onColorChange: (value: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  label,
  color,
  onColorChange,
}) => (
  <Container>
    <Label>{label}</Label>
    <StyledInput
      type="color"
      value={color}
      onChange={(e) => onColorChange(e.target.value)}
    />
  </Container>
);

export default ColorPicker;

// Styled Components
const Container = styled.div`
  margin-bottom: 10px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const StyledInput = styled.input`
  width: 100%;
`;
