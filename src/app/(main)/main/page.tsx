"use client";

import { useState } from "react";

import ComingSoonModal from "@/components/modal/Comingsoon";
import { CategoryType } from "@/types/topics/topics.type";
import { Interviewsection, TopicList } from "@/components/mainpage";
import Header from "@/components/mainpage/Header";

export default function Main() {
  const [category, setCategory] = useState<CategoryType>("Career");
  const [showComingSoon, setShowComingSoon] = useState(false);

  return (
    <>
      <Header />
      <div className=" bg-[#F2F7FF] min-h-screen pb-40">
        <Interviewsection />
        <TopicList
          category={category}
          setCategory={setCategory}
          setShowComingSoon={setShowComingSoon}
        />
        <ComingSoonModal
          isOpen={showComingSoon}
          onClose={() => setShowComingSoon(false)}
        />
      </div>
    </>
  );
}
