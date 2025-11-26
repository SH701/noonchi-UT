"use client";

import BackButton from "@/components/ui/button/Backbutton";

export default function SignupHeader({ title }: { title: string }) {
  return (
    <div className="px-6 pt-4 pb-10 bg-white flex items-center justify-between relative mt-10">
      <BackButton />
      <h1 className="absolute left-1/2 transform -translate-x-1/2 text-xl font-semibold text-gray-800">
        {title}
      </h1>
    </div>
  );
}
