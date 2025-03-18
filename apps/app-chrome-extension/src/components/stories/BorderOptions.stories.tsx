import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import BorderOptions from '../BorderOptions';

export default {
  title: 'Components/BorderOptions',
  component: BorderOptions,
} as Meta;

const Template: StoryFn<{
  border: boolean;
  borderColor: string;
  borderWidth: string;
  borderRadius: string;
  borderOpacity: number;
  onBorderChange: (key: string, value: any) => void;
}> = (args) => <BorderOptions {...args} />;

export const Default = Template.bind({});
Default.args = {
  border: true,
  borderColor: '#000000',
  borderWidth: '2px',
  borderRadius: '4px',
  borderOpacity: 0.8,
  onBorderChange: (key, value) => console.log(`${key}: ${value}`),
};
