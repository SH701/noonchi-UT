import { ModalProps } from "@/types/etc";
import Modal from "./Modal";
import { Button } from "../ui/button/button";

export default function ProfileModal({ isOpen, onClose }: ModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Coming Soon!`}
      description={`This feature will be available\nin a future update.`}
      image={{ src: "/etc/eyes.png", alt: "eyes", width: 100, height: 100 }}
    >
      <div className="flex flex-col items-center justify-center gap-3">
        <Button variant="primary" size="md" onClick={onClose}>
          Close
        </Button>
      </div>
    </Modal>
  );
}
