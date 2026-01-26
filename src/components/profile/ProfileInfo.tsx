import { useRouter } from "next/navigation";
import ProfileImage from "./ProfileImage";
import { ChevronRight } from "lucide-react";

interface ProfileInfoProps {
  img: string | undefined;
  name: string;
}

export default function ProfileInfo({ img, name }: ProfileInfoProps) {
  const router = useRouter();
  return (
    <div className="flex justify-between">
      <div className="flex gap-4">
        <ProfileImage src={img} />
        <div className="flex flex-col font-medium">
          <span>{name || "사용자"}</span>

          {/* 구독 정보 */}
          <span className="text-gray-500">Free Plan</span>
        </div>
      </div>
      <button
        onClick={() => router.push("/profile/edit")}
        className="cursor-pointer"
      >
        <ChevronRight />
      </button>
    </div>
  );
}
