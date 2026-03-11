"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Eye, MessageCircle, User } from "lucide-react";

interface InfoProps {
  isOpen: boolean;
  onClose: () => void;
  topic: string;
  aiRole: string;
  userRole: string;
  detail: string;
};

export default function ChatRoomInfo({
  isOpen,
  onClose,
  topic,
  aiRole,
  userRole,
  detail,
}: InfoProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-black/60"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="max-w-125 fixed bottom-0 left-0 right-0 z-50 mx-auto rounded-t-[50px] bg-gray-800 p-6 shadow-xl"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{
              type: "spring",
              damping: 25,
            }}
          >
            <div className="mb-4 flex w-full flex-col items-center justify-center gap-12">
              <div className="h-1.5 w-12 rounded-full bg-gray-300" />
              <div className="flex flex-col items-center gap-3">
                <div className="size-12 rounded-full bg-gray-300" />
                <p className="text-base font-medium text-white">{topic}</p>
              </div>
            </div>

            <div className="space-y-3 text-gray-700">
              <div className="flex gap-2">
                <User className="text-gray-600" />
                <div className="flex flex-col gap-1">
                  <p className="text-sm text-gray-500">My Role</p>
                  <p className="text-base font-medium text-white">{userRole}</p>
                </div>
              </div>
              <div>
                <div className="flex gap-2">
                  <Eye className="text-gray-600" />
                  <div className="flex flex-col gap-1">
                    <p className="text-sm text-gray-500">AI Role</p>
                    <p className="text-base font-medium text-white">{aiRole}</p>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex gap-2">
                  <MessageCircle className="shrink-0 text-gray-600" />
                  <div className="flex flex-col gap-1">
                    <p className="text-sm text-gray-500">Detail</p>
                    <p className="text-base font-medium text-white">{detail}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
