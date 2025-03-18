import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import ColorPicker from '../ColorPicker';

export default {
  title: 'Components/ColorPicker',
  component: ColorPicker,
} as Meta;

const Template: StoryFn<{
  label: string;
  color: string;
  onColorChange: (value: string) => void;
}> = (args) => <ColorPicker {...args} />;

export const FontColor = Template.bind({});
FontColor.args = {
  label: 'Font Color',
  color: '#000000',
  onColorChange: (value) => console.log('Selected Color:', value),
};

export const BackgroundColor = Template.bind({});
BackgroundColor.args = {
  label: 'Background Color',
  color: '#ffffff',
  onColorChange: (value) => console.log('Selected Color:', value),
};
