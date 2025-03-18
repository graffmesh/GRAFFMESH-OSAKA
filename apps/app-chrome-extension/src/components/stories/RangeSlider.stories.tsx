import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import RangeSlider from '../RangeSlider';

export default {
  title: 'Components/RangeSlider',
  component: RangeSlider,
} as Meta;

const Template: StoryFn<{
  label: string;
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
}> = (args) => <RangeSlider {...args} />;

export const Rotation = Template.bind({});
Rotation.args = {
  label: 'Rotation',
  min: -45,
  max: 45,
  step: 1,
  value: 0,
  onChange: (value) => console.log('Rotation:', value),
};

export const Opacity = Template.bind({});
Opacity.args = {
  label: 'Opacity',
  min: 0,
  max: 1,
  step: 0.1,
  value: 1,
  onChange: (value) => console.log('Opacity:', value),
};
