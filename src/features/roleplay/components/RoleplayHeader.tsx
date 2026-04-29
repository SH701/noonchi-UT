"use client";

import { useTabStore } from "@/store/useTabStore";
import Tab from "../../tab/Tab";
import Header from "../../../components/common/Header";
import ModeToggle from "../../../components/common/ModeToggle";
import { BoardIcon, HamburgerIcon } from "@/assets/svgr";
import { usePathname, useRouter } from "next/navigation";

export default function RoleplayHeader() {
  const { toggleTab } = useTabStore();
  const router = useRouter();
  const pathname = usePathname();
  return (
    <>
      <Header
        leftIcon={<HamburgerIcon onClick={toggleTab} />}
        center={<ModeToggle />}
        rightIcon={
          pathname.includes("/chatroom") ? null : (
            <BoardIcon onClick={() => router.push("/posts")} />
          )
        }
      />
      <Tab />
    </>
  );
}