import { ChevronLeft } from "lucide-react";

export default function ProfileHeader() {
  return (
    <div className="w-full py-8   flex justify-between cursor-pointer">
      <ChevronLeft />
      <span className="text-xl font-semibold">My Page</span>
      <span></span>
    </div>
  );
}
