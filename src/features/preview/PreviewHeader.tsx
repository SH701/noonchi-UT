"use client";

import { HamburgerIcon } from "@/assets/svgr";
import { Header } from "@/components/common";
import { motion } from "framer-motion";
interface PreviewHeaderProps {
  handleMoveAuth: () => void;
}
export default function PreviewHeader({ handleMoveAuth }: PreviewHeaderProps) {
  return (
    <>
      <Header
        leftIcon={<HamburgerIcon />}
        center="RolePlay Preview"
        rightIcon="Skip"
        className="font-medium"
        onRightClick={handleMoveAuth}
      />
      <motion.div
        className="top-15 absolute -right-1 flex h-16 w-36 items-center justify-center rounded-b-xl rounded-tl-xl bg-gray-800 p-3"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 4 }}
      >
        <span className="text-[13px] text-white">
          Skip and go directly to Login or Sign-up
        </span>
      </motion.div>
    </>
  );
}
