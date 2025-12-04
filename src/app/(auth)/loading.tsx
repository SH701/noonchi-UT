import LoginLottie from "@/components/onboard/loginlottie";

export default function Page() {
  return (
    <div className="flex flex-col gap-5 items-center justify-center w-screen min-h-screen bg-blue-600">
      <LoginLottie />
      <span className="text-white  font-medium leading-5">
        Sound natural, connect deeply
      </span>
    </div>
  );
}
