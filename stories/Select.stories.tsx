// import * as React from "react";
import type { Meta, StoryObj } from "@storybook/nextjs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const meta: Meta<typeof Select> = {
  title: "UI/Select",
  component: Select,
  tags: ["autodocs"],
  args: {
    disabled: false,
  },
  argTypes: {
    disabled: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

const SelectExample = ({ disabled }: { disabled?: boolean }) => (
  <Select disabled={disabled}>
    <SelectTrigger className="w-45">
      <SelectValue placeholder="Select an option" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="option1">Option 1</SelectItem>
      <SelectItem value="option2">Option 2</SelectItem>
      <SelectItem value="option3">Option 3</SelectItem>
      <SelectItem value="option4">Option 4</SelectItem>
    </SelectContent>
  </Select>
);

export const Default: Story = {
  render: (args) => <SelectExample {...args} />,
};

export const Disabled: Story = {
  render: (args) => <SelectExample disabled={true} {...args} />,
};

export const WithGroups: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-50">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="orange">Orange</SelectItem>
        <SelectItem value="grape">Grape</SelectItem>
      </SelectContent>
    </Select>
  ),
};
