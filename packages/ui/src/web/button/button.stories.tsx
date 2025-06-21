import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from './button';

const meta = {
  title: 'web/button',
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default',
        'primary',
        'filled'
      ],
    },
    color: {
      control: 'select',
      options: [
        'default',
        'color-1',
        'color-2',
        'color-3',
        'color-4',
        'color-5'
      ]
    },
    size: {
      control: 'select',
      options: [
        'default',
        'icon'
      ]
    }
  },
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'primary',
    color: 'default',
    children: 'Click me'
  }
};

export const Button1: Story = {
  args: {
    variant: "primary",
    color: "color-1",
    children: "Color 1"
  }
};

export const Button2: Story = {
  args: {
    variant: "primary",
    color: "color-2",
    children: "Color 2"
  }
};

export const Button3: Story = {
  args: {
    variant: "primary",
    color: "color-3",
    children: "Color 3"
  }
};

export const Button4: Story = {
  args: {
    variant: "primary",
    color: "color-4",
    children: "Color 4"
  }
};

export const Button5: Story = {
  args: {
    variant: "primary",
    color: "color-5",
    children: "Color 5"
  }
};