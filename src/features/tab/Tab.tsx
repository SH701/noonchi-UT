"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { AnimatePresence, motion } from "framer-motion";

import { useTabStore } from "@/store/useTabStore";
import { SearchBar } from "../../components/common";
import RoleplayHistoryTab from "./RoleplayHistoryTab";
import AskHistoryTab from "./AskHistoryTab";
import { DefaultIcon, PeopleIcon } from "@/assets/svgr";

const slideVariants = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1 },
};

const fadeVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export default function Tab() {
  const router = useRouter();
  const { data: session } = useSession();
  const { isOpen, closeTab } = useTabStore();

  const handleProfileClick = () => {
    router.push("/profile");
    closeTab();
  };
  const handleCoach = () => {
    router.push("/coach");
    closeTab();
  };
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div
            className="z-9998 fixed inset-0 flex items-center justify-center bg-black/60"
            onClick={closeTab}
          />
          <motion.div
            key="tab"
            className="z-9999 w-70 bg-gradient-primary fixed left-1/2 top-0 h-full origin-left -translate-x-2/3 pt-10"
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="flex h-full flex-col"
              variants={fadeVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.15 }}
            >
              <div className="flex min-h-0 flex-1 flex-col px-5">
                <div className="mb-5 flex shrink-0 flex-col gap-5">
                  {" "}
                  <SearchBar />
                  <button
                    className="flex cursor-pointer gap-2"
                    onClick={handleCoach}
                  >
                    <PeopleIcon />
                    <span className="pt-1 text-sm">Live 1:1 Coaching</span>
                  </button>
                </div>

                <div className="custom-scrollbar min-h-0 flex-1">
                  <RoleplayHistoryTab />
                  <AskHistoryTab />
                </div>
              </div>

              <button
                onClick={handleProfileClick}
                className="w-70 z-9999 flex gap-4 bg-white p-4"
              >
                {session?.user.profileImageUrl ? (
                  <Image
                    src={session?.user.profileImageUrl ?? ""}
                    alt="profile"
                    width={48}
                    height={48}
                    className="shrink-0 rounded-full"
                  />
                ) : (
                  <DefaultIcon className="shrink-0" />
                )}
                <span className="pt-3">{session?.user.name}</span>
              </button>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
