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
        <div className="relative inline-block bg-[#F3F8FF] text-gray-700 text-center px-6 py-4 rounded-2xl shadow">
          Your guest interviews and missions <br /> have been saved to your
          account
          <div
            className="absolute left-1/2 -bottom-2 -translate-x-1/2 w-0 h-0 
                      border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-[#F3F8FF]"
          />
        </div>
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
