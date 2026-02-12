import type { Meta, StoryObj } from "@storybook/nextjs";
import TextareaField from "@/components/primitives/form/TextareaField";

const meta: Meta<typeof TextareaField> = {
  title: "UI/TextareaField",
  component: TextareaField,
  tags: ["autodocs"],
  args: {
    label: "Your Message",
    placeholder: "Type something...",
    error: "",
  },
};

export default meta;
type Story = StoryObj<typeof TextareaField>;

export const Default: Story = {};

export const WithError: Story = {
  args: {
    error: "This field is required",
  },
};

export const CustomSize: Story = {
  args: {
    textareaClassName: "h-32",
  },
};
