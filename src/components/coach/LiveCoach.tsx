import { coach } from "@/data/coach";
import Image from "next/image";
import CoachBackButton from "./CoachBackButton";

export default function LiveCoach() {
  return (
    <div className="min-h-screen">
      <CoachBackButton />
      <div className="mb-5 flex flex-col gap-2 rounded-xl border border-white bg-white/50 p-4">
        <span className="font-semibold">Risk Management Coaching</span>
        <span className="text-sm text-gray-700">
          Decode the hiddden context. Connect with top experts to prevent
          critical relationship failures in Korea.
        </span>
      </div>
      <span className="font-medium">Available Coach</span>
      {coach.map((c) => (
        <div key={c.id} className="border-b border-gray-400 py-5">
          <div className="flex gap-3">
            <Image
              src={c.img}
              alt="profile"
              width={56}
              height={56}
              className="h-14 w-14 shrink-0"
            />
            <div className="flex flex-col">
              <a
                href={c.link}
                className="pb-1 font-medium leading-6"
                target="_blank"
              >
                {c.name}
              </a>
              <span className="pb-3 text-sm text-gray-600">{c.position}</span>
              <div className="flex gap-2">
                {c.career.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-sm bg-blue-100 p-1 text-xs text-blue-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
