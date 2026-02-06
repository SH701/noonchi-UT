"use client";

import { useState } from "react";
import PreviewEnd from "./PreviewEnd";
import { Header } from "../common";
import { Menu, SquarePen } from "lucide-react";

export default function PreviewChat() {
  const [count, setCount] = useState(3);

  const handle = () => {
    setCount(count - 1);
  };

  if (count <= 0) {
    return <PreviewEnd />;
  }

  // Todo: 프리뷰 카운트가 없으면 openModal
  return (
    <div className="min-h-screen  px-5">
      <Header leftIcon={<Menu />} center="RolePlay" rightIcon={<SquarePen />} />

      <button onClick={handle}>
        Todo: 프리뷰 카운트가 없으면 openModal {count}
      </button>
    </div>
  );
}
