import { ModalProps } from "@/types/etc";
import Modal from "./Modal";
import { Button } from "../ui/button/button";
import { useTranslation } from "react-i18next";

export default function ExitChatting({ isOpen, onClose }: ModalProps) {
  const { t } = useTranslation();
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t("exitChattingModal.title")}
      description={t("exitChattingModal.description")}
      image={{ src: "/etc/eyes.png", alt: "eyes", width: 100, height: 100 }}
    >
      <div className="flex w-full flex-col items-center justify-center gap-3">
        <Button variant="primary" size="md" onClick={onClose}>
          {t("exitChattingModal.closeButton")}
        </Button>
        <Button variant="secondary" size="md" onClick={onClose}>
          {t("exitChattingModal.continueButton")}
        </Button>
      </div>
    </Modal>
  );
}
