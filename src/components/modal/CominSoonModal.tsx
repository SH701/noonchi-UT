import { ModalProps } from "@/types/etc";
import Modal from "./Modal";
import { Button } from "../ui/button/button";
import { useTranslation } from "react-i18next";

export default function CominSoonModal({ isOpen, onClose }: ModalProps) {
  const { t } = useTranslation();
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t("comingSoonModal.title")}
      description={t("comingSoonModal.description")}
      image={{ src: "/etc/eyes.png", alt: "eyes", width: 100, height: 100 }}
    >
      <div className="flex w-full gap-3">
        <Button variant="primary" size="fluid" onClick={onClose}>
          {t("comingSoonModal.closeButton")}
        </Button>
      </div>
    </Modal>
  );
}
