"use client";

import Image from "next/image";

import CustomForm from "./CustomForm";

export default function CustomSection() {
  return (
    <div className="flex flex-col relative w-full overflow-x-hidden">
      <div className="w-full flex justify-center">
        <div className="w-full max-w-93.75 ">
          <div className="relative w-full aspect-square max-w-83.75 mx-auto">
            <Image
              src="/etc/custom.png"
              alt="custom's photo"
              fill
              className="object-cover rounded-3xl"
            />
          </div>
          <div>
            <p className="font-semibold pb-5">Conversation Context</p>
            <CustomForm
              AiRole=""
              myRole=""
              onSubmit={() => {}}
              mode={"custom"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
