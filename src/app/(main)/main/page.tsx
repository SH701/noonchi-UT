import { TopicList } from "@/features/roleplay";

export default function Main() {
  return (
    <>
      <div>
        <div className="flex flex-col gap-3 pb-10">
          <span className="text-3xl font-medium">
            Do you want to sound more natural in Korean?
          </span>
          <span className="text-gray-500">
            Let`s practice role-playing with me.
          </span>
        </div>
        <TopicList />
      </div>
    </>
  );
}
