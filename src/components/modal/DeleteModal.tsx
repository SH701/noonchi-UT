"use client";

import Modal from "./Modal"; 

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
}

export default function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Delete Chat",
}: DeleteConfirmModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      description={"Are you sure you want to delete this room?\nThis action cannot be undone."}
    >
      <div className="flex w-full gap-3 mt-2">
        <button
          onClick={onClose}
          className="flex-1 py-3 rounded-xl bg-gray-100 text-gray-600 font-medium active:bg-gray-200 transition-colors"
        >
          Cancel
        </button>
        
      
        <button
          onClick={() => {
            onConfirm();
            onClose();
          }}
          className="flex-1 py-3 rounded-xl bg-rose-500 text-white font-medium active:bg-rose-600 transition-colors"
        >
          Delete
        </button>
      </div>
    </Modal>
  );
}