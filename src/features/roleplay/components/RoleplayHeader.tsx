"use client";

import { useTabStore } from "@/store/useTabStore";
import Tab from "../../tab/Tab";
import Header from "../../../components/common/Header";
import ModeToggle from "../../../components/common/ModeToggle";
import { HamburgerIcon } from "@/assets/svgr";

export default function RoleplayHeader() {
  const { toggleTab } = useTabStore();

  return (
    <>
      <Header
        leftIcon={<HamburgerIcon onClick={toggleTab} />}
        center={<ModeToggle />}
      />
      <Tab />
    </>
  );
}