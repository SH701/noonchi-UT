import { TopicList } from "@/features/roleplay";
import { Suspense } from "react";
import { TopicListSkeleton } from "@/components/skeleton";

export default function Main() {
  return (
    <main>
      <header className="flex flex-col gap-3 pb-7">
        <h1 className="text-3xl font-medium">
          Do you want to sound more natural in Korean?
        </h1>
        <p className="text-gray-500">
          Let&apos;s practice role-playing with me.
        </p>
      </header>
      <section>
        <Suspense fallback={<TopicListSkeleton />}>
          <TopicList />
        </Suspense>
      </section>
    </main>
  );
}
