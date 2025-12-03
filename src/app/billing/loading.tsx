import Bubble from "@/components/ui/bubble/bubbule";
import Image from "next/image";

export default function Loading() {
  return (
    <div className="min-h-screen items-center justify-center">
      <div className="space-y-3">
        <p className="text-gray-900 text-3xl font-semibold leading-9">
          Complete!
        </p>
        <p className="text-gray-900 text-xl font-semibold leading-7">
          Now we`ll proceed <br />
          to the payment window
        </p>
        <Bubble />
        <Image
          src="/credits/payment.png"
          alt="character"
          width={185}
          height={144}
        />
      </div>
    </div>
  );
}
