import React from 'react';
import styled from 'styled-components';
import FontSelector from './FontSelector';
import FontSizeSelector from './FontSizeSelector';
import ColorPicker from './ColorPicker';
import RangeSlider from './RangeSlider';
import BorderOptions from './BorderOptions';

interface AnnotationEditorProps {
  style: {
    font: string;
    fontSize: string;
    color: string;
    backgroundColor: string;
    rotation: number;
    backgroundOpacity: number;
    border: boolean;
    borderColor: string;
    borderWidth: string;
    borderRadius: string;
    borderOpacity: number;
  };
  onStyleChange: (key: string, value: string | number | boolean) => void;
  onClose: () => void;
}

const AnnotationEditor: React.FC<AnnotationEditorProps> = ({
  style,
  onStyleChange,
  onClose,
}) => {
  return (
    <EditorContainer>
      <h4>Style Editor</h4>
      <FontSelector
        font={style.font}
        onFontChange={(value) => onStyleChange('font', value)}
      />
      <FontSizeSelector
        fontSize={style.fontSize}
        onFontSizeChange={(value) => onStyleChange('fontSize', value)}
      />
      <ColorPicker
        label="Font Color"
        color={style.color}
        onColorChange={(value) => onStyleChange('color', value)}
      />
      <ColorPicker
        label="Background Color"
        color={style.backgroundColor}
        onColorChange={(value) => onStyleChange('backgroundColor', value)}
      />
      <RangeSlider
        label="Rotation"
        min={-45}
        max={45}
        value={style.rotation}
        onChange={(value) => onStyleChange('rotation', value)}
      />
      <RangeSlider
        label="Background Opacity"
        min={0}
        max={1}
        step={0.1}
        value={style.backgroundOpacity}
        onChange={(value) => onStyleChange('backgroundOpacity', value)}
      />
      <BorderOptions
        border={style.border}
        borderColor={style.borderColor}
        borderWidth={style.borderWidth}
        borderRadius={style.borderRadius}
        borderOpacity={style.borderOpacity}
        onBorderChange={onStyleChange}
      />
      <CloseButton onClick={onClose}>Close</CloseButton>
    </EditorContainer>
  );
};

export default AnnotationEditor;

// Styled Components
const EditorContainer = styled.div`
  position: absolute;
  z-index: 1000;
  background-color: #f1f1f1;
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
`;

const CloseButton = styled.button`
  margin-top: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 4px;
  &:hover {
    background-color: #45a049;
  }
`;
