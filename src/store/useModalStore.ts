import { create } from "zustand";

interface ModalState {
  isOpen: boolean;
  content: React.ReactNode | null;
  onDimClose: (() => void) | null;
  actions: {
    openModal: (content: React.ReactNode, onDimClose?: () => void) => void;
    closeModal: () => void;
    setOnDimClose: (onDimClose: (() => void) | null) => void;
  };
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  content: null,
  onDimClose: null,
  actions: {
    openModal: (content, onDimClose) => set({ isOpen: true, content, onDimClose: onDimClose ?? null }),
    closeModal: () => set({ isOpen: false, content: null, onDimClose: null }),
    setOnDimClose: (onDimClose) => set({ onDimClose }),
  },
}));

export const useModalActions = () => useModalStore((state) => state.actions);
