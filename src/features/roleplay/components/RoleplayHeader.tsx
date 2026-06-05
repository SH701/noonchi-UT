"use client";

import { useTabStore } from "@/store/useTabStore";

import Header from "../../../components/common/Header";
import ModeToggle from "../../../components/common/ModeToggle";
import { BoardIcon, HamburgerIcon } from "@/assets/svgr";
import { usePathname, useRouter } from "next/navigation";
import Tab from "@/features/tab/components/Tab";

export default function RoleplayHeader() {
  const { toggleTab } = useTabStore();
  const router = useRouter();
  const pathname = usePathname();
  return (
    <>
      <Header
        leftIcon={
          <div id="hub-menu">
            <HamburgerIcon onClick={toggleTab} />
          </div>
        }
        center={
          <div id="hub-mode-toggle">
            <ModeToggle />
          </div>
        }
        rightIcon={
          pathname.includes("/chatroom") ? null : (
            <div id="hub-community">
              <BoardIcon onClick={() => router.push("/posts")} />
            </div>
          )
        }
      />
      <Tab />
    </>
  );
}