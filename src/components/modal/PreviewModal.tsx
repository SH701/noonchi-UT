import { ModalProps } from "@/types/etc";
import Modal from "./Modal";
import { Button } from "../ui/button/button";
import { useModalActions } from "@/store/useModalStore";
import LoginContent from "@/features/auth/components/login/LoginContent";
import SignupContent from "@/features/auth/components/signup/SignupContent";
import { useTranslation } from "react-i18next";


export default function PreviewModal({ isOpen, onClose }: ModalProps) {
  const { t } = useTranslation();
  const { openModal } = useModalActions();
  const loginOpen = () => {
    onClose();
    openModal(<LoginContent />);
  };
  const signupOpen = () => {
    onClose();
    openModal(<SignupContent />);
  };
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={t("previewModal.title")}
        description={t("previewModal.description")}
        image={{ src: "/etc/eyes.png", alt: "eyes", width: 100, height: 100 }}
      >
        <div className="flex w-full gap-3">
          <Button variant="secondary" size="fluid" onClick={loginOpen}>
            {t("previewModal.loginButton")}
          </Button>
          <Button variant="primary" size="fluid" onClick={signupOpen}>
            {t("previewModal.signupButton")}
          </Button>
        </div>
      </Modal>
    </>
  );
}
