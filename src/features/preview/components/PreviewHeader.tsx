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
        className="pointer-events-none absolute -right-1 flex items-center justify-center rounded-b-xl rounded-tl-xl bg-gray-800 p-3 z-9999"
        style={{ top: "clamp(52px, 14vw, 60px)", width: "clamp(120px, 32vw, 144px)", minHeight: "clamp(52px, 14vw, 64px)" }}
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 4 }}
      >
        <span className="text-xs text-white">
          Skip and go directly to Login or Sign-up
        </span>
      </motion.div>
    </>
  );
}
