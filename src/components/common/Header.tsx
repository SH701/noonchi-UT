"use client";

import { ReactNode } from "react";

interface HeaderProps {
  leftIcon?: ReactNode;
  center: string | ReactNode;
  rightIcon?: ReactNode;
  onLeftClick?: () => void;
  onRightClick?: () => void;
  className?: string;
}

export default function Header({
  leftIcon,
  center,
  rightIcon,
  onLeftClick,
  onRightClick,
  className,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 -mx-5 flex items-center justify-between p-6 backdrop-blur-md">
      <div className="w-6 cursor-pointer" onClick={onLeftClick}>
        {leftIcon}
      </div>
      <h1 className="cursor-pointer text-xl font-semibold">{center}</h1>
      <div
        className={`w-6 cursor-pointer ${className ?? ""}`}
        onClick={onRightClick}
      >
        {rightIcon}
      </div>
    </header>
  );
}
