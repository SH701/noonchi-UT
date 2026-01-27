import Link from "next/link";

export default function ProfileMenuList() {
  return (
    <div>
      <p className="text-sm text-gray-400 pb-2 pl-1">Account</p>
      <div className="bg-white rounded-2xl p-4 flex flex-col gap-4 text-sm cursor-pointer">
        <div>
          <Link href="/profile">구독설정</Link>
        </div>
        <div>
          <Link href="/profile">언어설정</Link>
        </div>
        <div>
          <Link href="/profile">계정연동</Link>
        </div>
        <div>
          <Link href="/profile">언어설정</Link>
        </div>
      </div>
    </div>
  );
}
