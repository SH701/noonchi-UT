"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { AnimatePresence, motion } from "framer-motion";
import { useTabStore } from "@/store/useTabStore";
import { DefaultIcon, PeopleIcon } from "@/assets/svgr";
import SearchBar from "./SearchBar";
import { AskHistoryTab, RoleplayHistoryTab } from "../bothistory";
import { fadeVariants, slideVariants } from "@/constants";
import { useState } from "react";
import { useDeleteConversation } from "@/hooks/mutations";
import { useHistorySearch } from "@/hooks/custom";

export default function Tab() {
  const router = useRouter();
  const { data: session } = useSession();
  const { isOpen, closeTab: _closeTab } = useTabStore();
  const [edit, setEdit] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const closeTab = () => {
    setEdit(false);
    setSelectedIds([]);
    _closeTab();
  };
  const { conversations } = useHistorySearch("ASK");
  const allIds = conversations.map((c) => c.conversationId);

  const handleProfileClick = () => {
    router.push("/profile");
    closeTab();
  };
  const handleCoach = () => {
    router.push("/coach");
    closeTab();
  };
  const { mutate: handleDelete } = useDeleteConversation();

  const handleToggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const handleSelectAll = () => {
    setSelectedIds((prev) => (prev.length === allIds.length ? [] : allIds));
  };

  const handleDeleteSelected = () => {
    selectedIds.forEach((id) => handleDelete(id));
    setSelectedIds([]);
    setEdit(false);
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
            className="z-9999 bg-gradient-primary md:max-w-137.25 fixed left-0 top-0 h-full w-[75vw] max-w-[85%] origin-left pt-10 md:left-[calc(50%-300px)]"
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
                  <AskHistoryTab
                    edit={edit}
                    setEdit={() => {
                      setEdit(!edit);
                      setSelectedIds([]);
                    }}
                    selectedIds={selectedIds}
                    onToggleSelect={handleToggleSelect}
                  />
                </div>
              </div>
              <div className="z-10 flex h-20 w-full items-center bg-white p-4">
                {edit ? (
                  <div className="flex w-full justify-between text-sm">
                    <button className="text-gray-500" onClick={handleSelectAll}>
                      Select All
                    </button>
                    <button
                      onClick={handleDeleteSelected}
                      disabled={selectedIds.length === 0}
                      className={
                        selectedIds.length > 0
                          ? "rounded-lg bg-gray-800 px-2.5 py-2 text-white"
                          : "text-gray-400"
                      }
                    >
                      Delete
                      {selectedIds.length > 0 && ` (${selectedIds.length})`}
                    </button>
                  </div>
                ) : (
                  <button onClick={handleProfileClick} className="flex gap-4">
                    {session?.user.profileImageUrl ? (
                      <Image
                        src={session?.user.profileImageUrl ?? ""}
                        alt="profile"
                        width={48}
                        height={48}
                        className="shrink-0 rounded-full"
                        sizes="48px"
                      />
                    ) : (
                      <DefaultIcon className="shrink-0" />
                    )}
                    <span className="pt-3">{session?.user.name}</span>
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
