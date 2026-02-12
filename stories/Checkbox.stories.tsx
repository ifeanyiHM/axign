import { CheckboxField } from "@/components/primitives/form/CheckboxField";
import type { Meta, StoryObj } from "@storybook/nextjs";
import { useState } from "react";

const meta: Meta<typeof CheckboxField> = {
  title: "Components/CheckboxField",
  component: CheckboxField,
  tags: ["autodocs"],
  argTypes: {
    onCheckedChange: { action: "changed" },
  },
};

export default meta;

type Story = StoryObj<typeof CheckboxField>;

export const Default: Story = {
  args: {
    id: "default-checkbox",
    label: "Accept terms",
    checked: false,
  },
};

export const Checked: Story = {
  args: {
    id: "checked-checkbox",
    label: "Subscribed",
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    id: "disabled-checkbox",
    label: "Disabled option",
    disabled: true,
  },
};

export const Controlled: Story = {
  render: () => {
    const Wrapper = () => {
      const [checked, setChecked] = useState(false);

      return (
        <CheckboxField
          id="controlled-checkbox"
          label="Controlled Checkbox"
          checked={checked}
          onCheckedChange={setChecked}
        />
      );
    };

    return <Wrapper />;
  },
};
