import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import FontSelector from '../FontSelector';

export default {
  title: 'Components/FontSelector',
  component: FontSelector,
} as Meta;

const Template: StoryFn<{
  font: string;
  onFontChange: (value: string) => void;
}> = (args) => <FontSelector {...args} />;

export const Default = Template.bind({});
Default.args = {
  font: 'Arial',
  onFontChange: (value) => console.log('Selected Font:', value),
};
