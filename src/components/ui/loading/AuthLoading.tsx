import LoginLottie from "@/components/onboard/loginlottie";

export default function AuthLoading() {
  return (
    <div className=" md:w-max-[375px] w-full flex flex-col gap-5 items-center justify-center  min-h-screen bg-blue-600">
      <LoginLottie />
      <span className="text-white  font-medium leading-5">
        Sound natural, connect deeply
      </span>
    </div>
  );
}
