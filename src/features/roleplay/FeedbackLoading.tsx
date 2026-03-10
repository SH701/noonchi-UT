import { SpinnerLoading } from "@/components/common";

export default function FeedbackLoading() {
  return (
    <div className="fixed inset-0 z-50">
      <SpinnerLoading title="Loading your Report setup" />
    </div>
  );
}
