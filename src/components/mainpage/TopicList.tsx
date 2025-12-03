import Image from "next/image";
import Link from "next/link";
import TopicSlider from "@/components/mainpage/TopicSlider";
import { CategoryType, Topics } from "@/types/topic";
import { topicsByCategory } from "@/data/topics";
import { useRouter } from "next/navigation";

type TopicListProps = {
  category: CategoryType;
  setCategory: (c: CategoryType) => void;
  setShowComingSoon: (state: boolean) => void;
};

export default function TopicList({
  category,
  setCategory,
  setShowComingSoon,
}: TopicListProps) {
  const topics = topicsByCategory[category];
  const router = useRouter();

  return (
    <div className="px-5">
      <div className="flex justify-between">
        <p className="text-xl text-gray-800 font-semibold pb-3">Topic</p>
        <Link href="/main/topicall">
          <p className="text-[13px] font-medium text-gray-400">View all</p>
        </Link>
      </div>

      <TopicSlider
        topics={[
          { id: 1, label: "Career" },
          { id: 2, label: "Family" },
          { id: 3, label: "Romance" },
          { id: 4, label: "Belonging" },
          { id: 5, label: "K-POP" },
        ]}
        active={category}
        onSelect={(c) => setCategory(c)}
      />

      <div className="grid grid-cols-2 gap-4 w-full py-4">
        <div
          className="flex items-center justify-center bg-white rounded-xl cursor-pointer hover:shadow-md transition-colors min-h-40"
          onClick={() => setShowComingSoon(true)}
        >
          <span className="text-blue-600 font-semibold">+ Create Chat</span>
        </div>

        {topics.map((topic: Topics) => {
          return (
            <div
              key={topic.id}
              className="flex flex-col bg-white border border-gray-200 rounded-xl p-3 cursor-pointer hover:shadow-md transition-shadow min-h-40 justify-between"
              onClick={() => {
                router.push(
                  `/main/create/roleplay?mode=topic&category=${category}&topicId=${topic.id}`
                );
              }}
            >
              <div className="flex flex-col gap-2 mb-4">
                <h4 className="text-base font-semibold text-gray-900 mb-1.5">
                  {topic.title}
                </h4>
                <p className="text-[11px] text-gray-900 leading-4">
                  {topic.description}
                </p>
              </div>

              <div className="w-9 h-4 bg-blue-100 px-1 rounded-md flex items-center gap-0.5">
                <Image
                  src="/credits/crediticon.png"
                  alt=""
                  width={10}
                  height={10}
                />
                <p className="text-[10px] text-blue-600"> 30</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
