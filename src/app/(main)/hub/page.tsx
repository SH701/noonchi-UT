import TopicHeader from "@/features/hub/components/TopicHeader";
import TopicList from "@/features/hub/components/TopicList";
import { Suspense } from "react";
import TopicListSkeleton from "@/components/skeleton/TopicListSkeleton";
import HubCoachMark from "@/features/hub/components/HubCoachmark";

export default function HubPage() {
  return (
    <main>
      <HubCoachMark />
      <TopicHeader />
      <section>
        <Suspense fallback={<TopicListSkeleton />}>
          <TopicList />
        </Suspense>
      </section>
    </main>
  );
}
