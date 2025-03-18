import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import AnnotationEditor from '../AnnotationEditor';

export default {
  title: 'Components/AnnotationEditor',
  component: AnnotationEditor,
} as Meta;

const Template: StoryFn<{
  style: any;
  onStyleChange: (key: string, value: any) => void;
  onClose: () => void;
}> = (args) => {
  const [style, setStyle] = useState(args.style);

  const handleStyleChange = (key: string, value: any) => {
    setStyle({ ...style, [key]: value });
    args.onStyleChange(key, value);
  };

  return (
    <AnnotationEditor
      {...args}
      style={style}
      onStyleChange={handleStyleChange}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  style: {
    font: 'Arial',
    fontSize: '14px',
    color: '#000000',
    backgroundColor: '#ffffff',
    rotation: 0,
    backgroundOpacity: 1,
    border: true,
    borderColor: '#000000',
    borderWidth: '2px',
    borderRadius: '4px',
    borderOpacity: 0.8,
  },
  onStyleChange: (key, value) => console.log(`${key}: ${value}`),
  onClose: () => console.log('Editor Closed'),
};
