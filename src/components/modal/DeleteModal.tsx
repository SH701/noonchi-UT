"use client";

import Modal from "./Modal"; 

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
}

export default function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Delete Chat",
  description = "Are you sure you want to delete this?\nThis action cannot be undone.",
}: DeleteConfirmModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      description={description}
    >
      <div className="mt-2 flex w-full gap-3">
        <button
          onClick={onClose}
          className="flex-1 rounded-xl bg-gray-100 py-3 font-medium text-gray-600 transition-colors active:bg-gray-200"
        >
          Cancel
        </button>

        <button
          onClick={() => {
            onConfirm();
            onClose();
          }}
          className="w-full flex-1 rounded-xl bg-rose-500 py-3 font-medium text-white transition-colors active:bg-rose-600"
        >
          Delete
        </button>
      </div>
    </Modal>
  );
}