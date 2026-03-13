import { Meta, StoryObj } from "@storybook/nextjs-vite";
import DeleteModal from "./DeleteModal";

const meta: Meta<typeof DeleteModal> = {
  title: "UI/DeleteModal",
  component: DeleteModal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof DeleteModal>;

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => console.log("Modal closed"),
  },
};

