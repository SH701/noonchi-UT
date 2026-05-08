import { ModalProps } from "@/types/etc";
import Modal from "./Modal";
import { Button } from "../ui/button/button";
import { useTranslation } from "react-i18next";

interface EndChattingProps extends ModalProps {
  onConfirm: () => void;
}

export default function EndChatting({
  isOpen,
  onClose,
  onConfirm,
}: EndChattingProps) {
  const { t } = useTranslation();
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t("endChattingModal.title")}
      description={t("endChattingModal.description")}
      image={{ src: "/etc/eyes.png", alt: "eyes", width: 100, height: 100 }}
    >
      <div className="flex w-full gap-3">
        <Button variant="secondary" size="fluid" onClick={onClose}>
          {t("endChattingModal.cancelButton")}
        </Button>
        <Button variant="primary" size="fluid" onClick={onConfirm}>
          {t("endChattingModal.confirmButton")}
        </Button>
      </div>
    </Modal>
  );
}