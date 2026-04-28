import { TopicRes } from "@/features/roleplay/types/topics";
import Image from "next/image";

export default function InterviewSection({
  imageUrl,
  name,
  track,
  description,
}: TopicRes) {
  return (
    <div className="relative mx-auto aspect-square w-[89%]">
      <Image
        src={imageUrl || "/default-image.jpg"}
        alt="topic's photo"
        fill
        className="rounded-3xl object-cover"
        sizes="(max-width: 600px) 89vw, 540px"
        priority
      />
      <div className="" />
      <div className="absolute left-4 top-4">
        <span className="rounded-3xl border border-gray-200 bg-white/50 px-3 py-2 text-sm text-gray-600">
          {name}
        </span>
      </div>
      <div className="bg-gray absolute inset-x-0 bottom-0 flex h-auto flex-col rounded-b-3xl p-4 text-white backdrop-blur-sm">
        <span className="text-3xl font-semibold">{track}</span>
        <span className="text-sm font-medium">{description}</span>
      </div>
    </div>
  );
}
