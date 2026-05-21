"use client";

import Modal from "./Modal";
import { Spinner } from "@/components/ui/spinner/spinner";
import { useTranslation } from "react-i18next";

interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
}

export default function DeleteAccountModal({
  isOpen,
  onClose,
  onConfirm,
  loading = false,
}: DeleteAccountModalProps) {
  const { t } = useTranslation();
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t("deleteAccountModal.title")}
      description={t("deleteAccountModal.description")}
    >
      <div className="mt-2 flex w-full gap-3">
        <button
          onClick={onClose}
          disabled={loading}
          className="flex-1 rounded-xl bg-gray-100 py-3 font-medium text-gray-600 transition-colors active:bg-gray-200 disabled:opacity-60"
        >
          {t("deleteAccountModal.cancelButton")}
        </button>

        <button
          onClick={onConfirm}
          disabled={loading}
          className="flex flex-1 items-center justify-center rounded-xl bg-rose-500 py-3 font-medium text-white transition-colors active:bg-rose-600 disabled:opacity-60"
        >
          {loading ? <Spinner /> : t("deleteAccountModal.deleteButton")}
        </button>
      </div>
    </Modal>
  );
}
