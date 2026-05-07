import Image from "next/image";

export default function OnboardLoading() {
  return (
    <div className="flex w-full flex-col gap-5 items-center justify-start min-h-screen" style={{ paddingTop: "clamp(120px, 30vw, 160px)" }}>
      <Image
        src="/etc/logo.png"
        alt="logo"
        width={217}
        height={52}
        priority
        style={{ width: "clamp(180px, 45vw, 217px)", height: "auto" }}
      />
    </div>
  );
}
