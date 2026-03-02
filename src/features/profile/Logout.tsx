"use client";

import { useRouter } from "next/navigation";
import { apiMutations } from "@/api/mutations";
import { toast } from "@/components/ui/toast/toast";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button/button";

export default function Logout() {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await apiMutations.auth.logout();
      await signOut({ redirect: false });
      router.push("/");
      toast.success("You are logged out");
    } catch {
      toast.error("Logout failed");
    }
  };
  return (
    <div className="flex flex-col items-center gap-2">
      <Button onClick={handleLogout} size="lg">
        Log out
      </Button>
      <Button size="lg" variant="secondary">
        Delete Account
      </Button>
    </div>
  );
}
