/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";

import type { Persona } from "@/lib/types";
import Loading from "./chatroom/[id]/loading";
import InterviewForm from "@/components/forms/InterviewForm";
import { useAuthStore } from "@/store/auth";

const situationOptions = {
  BOSS: [
    { value: "BOSS1", label: "Friendly" },
    { value: "BOSS2", label: "Standard" },
    { value: "BOSS3", label: "Strict" },
  ],
  GF_PARENTS: [
    { value: "GF_PARENTS1", label: "Meeting for the first time" },
    { value: "GF_PARENTS2", label: "Conversation over dinner" },
    { value: "GF_PARENTS3", label: "Apologizing for breaking a picture frame" },
  ],
  CLERK: [
    { value: "CLERK1", label: "Negotiate prices" },
    { value: "CLERK2", label: "Ask about the origin of the product" },
    { value: "CLERK3", label: "Complaining about incorrect food orders" },
  ],
} as const;

type Role = keyof typeof situationOptions;
type SituationValue = (typeof situationOptions)[Role][number]["value"];

export default function PersonaAndRoom() {
  const accessToken = useAuthStore((s) => s.accessToken);
  const router = useRouter();

  const [company, setCompany] = useState("");
  const [position, setPosition] = useState<"MALE" | "FEMALE" | "NONE">("NONE");
  const DEFAULT_AVATAR = "/characters/character2.png";
  const [relationship, setRelationship] = useState<Role>("BOSS");
  const [description, setDescription] = useState<SituationValue>(
    situationOptions.BOSS[0].value
  );
  useEffect(() => {
    const first = situationOptions[relationship][0].value;
    setDescription(first);
  }, [relationship]);

  const [profileImageUrl, setProfileImageUrl] = useState(DEFAULT_AVATAR);
  const [avatarModalOpen, setAvatarModalOpen] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const ext = file.name.split(".").pop() || "";

    try {
      const res = await fetch(`/api/files/presigned-url`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          fileType: file.type,
          fileExtension: ext,
        }),
      });

      if (!res.ok) throw new Error("Presigned URL 요청 실패");
      const { url } = await res.json();

      await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
      });

      const publicUrl = url.split("?")[0];
      setProfileImageUrl(publicUrl);
      setAvatarModalOpen(false);
    } catch (err) {
      console.error("업로드 실패:", err);
      alert("이미지 업로드 실패");
    } finally {
      e.target.value = ""; // 같은 파일 다시 선택 가능하도록 초기화
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowLoading(true);
    try {
      const safeProfileImage =
        profileImageUrl && profileImageUrl.trim() !== ""
          ? profileImageUrl
          : DEFAULT_AVATAR;

      const personaRes = await fetch("/api/personas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          company,
          position,
          relationship,
          description,
          profileImageUrl: safeProfileImage,
        }),
      });
      if (!personaRes.ok) throw new Error("Persona 생성 실패");
      const persona: Persona = await personaRes.json();
      const convoRes = await fetch("/api/conversations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          personaId: persona.personaId,
          situation: description,
        }),
      });
      if (!convoRes.ok) throw new Error("방 생성 실패");
      const convo = await convoRes.json();
      setTimeout(() => {
        router.push(`/main/custom/chatroom/${convo.conversationId}`);
      }, 1500);
    } catch (e: any) {
      alert("생성 실패: " + (e?.message ?? e));
      setShowLoading(false);
    }
  };
  if (showLoading) {
    return <Loading />;
  }
  return (
    <div className="flex flex-col pt-14 relative bg-white  w-full overflow-x-hidden">
      <div className="flex items-center w-full px-4">
        <button
          onClick={() => router.back()}
          className="text-black cursor-pointer"
        >
          <ChevronLeftIcon className="size-6" />
        </button>
        <h1 className="flex-1 text-center font-semibold text-black text-lg">
          Create
        </h1>
      </div>
      <h2 className=" text-left text-xl font-bold mb-12 pl-5 mt-6">
        Interview Preparation
      </h2>

      <div className="w-full flex justify-center">
        <div className="w-full max-w-[375px] px-5">
          <InterviewForm
            situationOptions={situationOptions}
            relationship={relationship}
          />
        </div>
      </div>
    </div>
  );
}
