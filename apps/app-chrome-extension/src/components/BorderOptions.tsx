import React from 'react';
import styled from 'styled-components';

interface BorderOptionsProps {
  border: boolean;
  borderColor: string;
  borderWidth: string;
  borderRadius: string;
  borderOpacity: number;
  onBorderChange: (key: string, value: string | boolean | number) => void;
}

const BorderOptions: React.FC<BorderOptionsProps> = ({
  border,
  borderColor,
  borderWidth,
  borderRadius,
  borderOpacity,
  onBorderChange,
}) => (
  <Container>
    <label>
      Border:
      <Checkbox
        type="checkbox"
        checked={border}
        onChange={(e) => onBorderChange('border', e.target.checked)}
      />
    </label>
    {border && (
      <>
        <ColorPicker
          label="Border Color"
          color={borderColor}
          onColorChange={(value) => onBorderChange('borderColor', value)}
        />
        <StyledSelect
          value={borderWidth}
          onChange={(e) => onBorderChange('borderWidth', e.target.value)}
        >
          <option value="1px">Thin (1px)</option>
          <option value="2px">Medium (2px)</option>
          <option value="4px">Thick (4px)</option>
        </StyledSelect>
        <StyledSelect
          value={borderRadius}
          onChange={(e) => onBorderChange('borderRadius', e.target.value)}
        >
          <option value="0px">Sharp (0px)</option>
          <option value="4px">Rounded (4px)</option>
          <option value="8px">Very Rounded (8px)</option>
        </StyledSelect>
        <RangeSlider
          label="Border Opacity"
          min={0}
          max={1}
          step={0.1}
          value={borderOpacity}
          onChange={(value) => onBorderChange('borderOpacity', value)}
        />
      </>
    )}
  </Container>
);

export default BorderOptions;

// Reused Components
import ColorPicker from './ColorPicker';
import RangeSlider from './RangeSlider';

// Styled Components
const Container = styled.div`
  margin-bottom: 10px;
`;

const StyledSelect = styled.select`
  margin-bottom: 10px;
  width: 100%;
`;

const Checkbox = styled.input`
  margin-left: 5px;
`;
