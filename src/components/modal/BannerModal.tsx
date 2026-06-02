"use client";

import { useEffect, useState } from "react";
import Modal from "./Modal";
import { ONE_DAY_MS } from "@/constants";

const STORAGE_KEY = "install_modal_dismissed_at";


interface Props {
  forceOpen?: boolean; // 스토리북/테스트용
}

export default function BannerModal({forceOpen}:Props) {
  const [isOpen, setIsOpen] = useState(false);


  useEffect(() => {
    if(forceOpen){
      setIsOpen(true)  
      return ;
    } 
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const isStandalone = (window.navigator as any).standalone === true;
    if (!isIOS || isStandalone) return;
    const dismissedAt = localStorage.getItem(STORAGE_KEY);
    const shouldShow =
      !dismissedAt || Date.now() - Number(dismissedAt) >= ONE_DAY_MS;
    if (shouldShow) setIsOpen(true);
  }, [forceOpen]);


  const handleClose = () => {
    localStorage.setItem(STORAGE_KEY, String(Date.now()));
    setIsOpen(false);
  };
  return (
  <Modal
    isOpen={isOpen}
    onClose={handleClose}
    title="Get the App"
    description={"Enjoy a smoother experience\non our mobile app."}
    image={{ src: "/etc/logo.png", alt: "Noonchi", width: 200, height: 200 }}
  >
    <a
      href="https://apps.apple.com/kr/app/noonchi/id6769224194"
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClose}
      className="w-full rounded-full bg-gray-800 py-4 text-center font-medium text-white"
    >
      Install the App
    </a>
    <button
      onClick={handleClose}
      className="mt-3 text-sm text-gray-500 underline"
    >
       No thanks, I&apos;ll stay on the web
    </button>
  </Modal>
);

}
