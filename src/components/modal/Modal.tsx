"use client";

import { ModalProps } from "@/types/etc";
import Image from "next/image";

export default function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  image,
  className = "",
}: ModalProps & {
  image?: { src: string; alt: string; width: number; height: number };
}) {
  if (!isOpen) return null;

  const defaultClassName =
    "w-[85%] max-w-125 bg-white rounded-xl flex flex-col justify-center items-center px-4 py-12 gap-2";

  const finalClassName = className || defaultClassName;

  return (
    <div
      className="z-9999 fixed inset-0 flex items-center justify-center bg-black/60"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`max-h-[90dvh] overflow-y-auto ${finalClassName}`}
      >
        {image && (
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
          />
        )}

        {title && (
          <h3 className="whitespace-pre-line text-center text-xl font-semibold text-gray-900">
            {title}
          </h3>
        )}

        {description && (
          <p className="whitespace-pre-line pb-8 text-center text-sm text-gray-700">
            {description}
          </p>
        )}

        {children}
      </div>
    </div>
  );
}
