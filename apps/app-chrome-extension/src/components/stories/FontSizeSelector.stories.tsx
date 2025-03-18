import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import FontSizeSelector from '../FontSizeSelector';

export default {
  title: 'Components/FontSizeSelector',
  component: FontSizeSelector,
} as Meta;

const Template: StoryFn<{
  fontSize: string;
  onFontSizeChange: (value: string) => void;
}> = (args) => <FontSizeSelector {...args} />;

export const Default = Template.bind({});
Default.args = {
  fontSize: '14px',
  onFontSizeChange: (value) => console.log('Selected Font Size:', value),
};
