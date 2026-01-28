// import * as React from "react";
import type { Meta, StoryObj } from "@storybook/nextjs";
import { Alert } from "@/components/ui/alert";

const meta: Meta<typeof Alert> = {
  title: "UI/Alert",
  component: Alert,
  tags: ["autodocs"],
  args: {
    variant: "default",
    title: "Alert Title",
    description: "This is an alert description.",
    dismissible: true,
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "success", "warning", "info", "danger"],
    },
    dismissible: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {};

export const Success: Story = {
  args: {
    variant: "success",
    title: "Success!",
    description: "Operation completed successfully.",
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    title: "Warning",
    description: "Please review the information carefully.",
  },
};

export const Info: Story = {
  args: {
    variant: "info",
    title: "Information",
    description: "Here's some useful information.",
  },
};

export const Danger: Story = {
  args: {
    variant: "danger",
    title: "Danger",
    description: "This action cannot be undone.",
  },
};

export const WithFooter: Story = {
  args: {
    variant: "info",
    title: "Update Available",
    description: "A new version is ready to install.",
    footerText: "Install Now",
  },
};

export const NonDismissible: Story = {
  args: {
    variant: "warning",
    title: "Important Notice",
    description: "This alert cannot be dismissed.",
    dismissible: false,
  },
};

export const TitleOnly: Story = {
  args: {
    title: "Just a Title",
    description: undefined,
  },
};

export const DescriptionOnly: Story = {
  args: {
    title: undefined,
    description: "This alert has only a description.",
  },
};
