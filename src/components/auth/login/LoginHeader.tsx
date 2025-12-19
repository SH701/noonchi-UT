import Image from "next/image";

export default function LoginHeader() {
  return (
    <div className="flex justify-center items-center mt-32">
      <Image
        src="/etc/logo_login.svg"
        alt="Logo"
        width={200}
        height={42}
        priority
      />
    </div>
  );
}
