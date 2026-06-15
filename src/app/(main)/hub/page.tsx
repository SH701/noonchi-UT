import TopicHeader from "@/features/hub/components/TopicHeader";
import TopicList from "@/features/hub/components/TopicList";
import { Suspense } from "react";
import TopicListSkeleton from "@/components/skeleton/TopicListSkeleton";
import HubCoachMark from "@/features/hub/components/HubCoachmark";
import AiConsentModal from "@/components/modal/AiConsentModal";

export default function HubPage() {
  return (
    <main>
      <AiConsentModal />
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
