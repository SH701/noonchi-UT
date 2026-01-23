"use client";

import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { toast, Toaster } from "./toast";

const meta: Meta = {
  title: "System/Toast",
};

export default meta;

type Story = StoryObj;

export const Playground: Story = {
  render: () => (
    <>
      <Toaster />
      <div className="flex gap-3">
        <button onClick={() => toast.success("성공 토스트입니다")}>
          Success
        </button>

        <button onClick={() => toast.error("에러 토스트입니다")}>Error</button>
      </div>
    </>
  ),
};
