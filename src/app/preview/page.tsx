"use client";

import { PreviewEnd } from "@/components/auth";
import { useModalActions } from "@/store/modal/useModalStore";

export default function Preview() {
  const { openModal } = useModalActions();

  const handle = () => {
    openModal(<PreviewEnd />);
  };
  // Todo: 프리뷰 카운트가 없으면 openModal
  return (
    <div className="min-h-screen">
      <button onClick={handle}>Todo: 프리뷰 카운트가 없으면 openModal</button>
    </div>
  );
}
