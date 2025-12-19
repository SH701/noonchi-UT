import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

export default function InterviewHeader() {
  const router = useRouter();
  return (
    <>
      <div className="flex items-center w-full px-4">
        <button
          onClick={() => router.push("/main")}
          className="text-black cursor-pointer"
        >
          <ChevronLeftIcon className="size-6" />
        </button>
        <h1 className="flex-1 text-center font-semibold text-black text-lg">
          Create Interview
        </h1>
      </div>

      <h2 className="text-left text-xl font-bold mb-12 pl-5 mt-6">
        Interview Preparation
      </h2>
    </>
  );
}
