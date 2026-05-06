import { TopicHeader, TopicList } from "@/features/roleplay";
import { Suspense } from "react";
import { TopicListSkeleton } from "@/components/skeleton";

export default function Main() {
  return (
    <main>
      <TopicHeader />
      <section>
        <Suspense fallback={<TopicListSkeleton />}>
          <TopicList />
        </Suspense>
      </section>
    </main>
  );
}
