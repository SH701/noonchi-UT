"use client";

import { useRouter } from "next/navigation";
import Modal from "../ui/modal/Modal";

import { ModalButton } from "../ui/button";
interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const router = useRouter();
  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Log in to save your interview and view your feedback"
      description=""
    >
      <div className="flex items-center justify-center">
        <ModalButton
          label="Login / Sign up"
          onClick={() => router.push("/login")}
        ></ModalButton>
      </div>
    </Modal>
  );
}
