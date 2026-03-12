"use client";

import { useRouter } from "next/navigation";
import { apiMutations } from "@/api/mutations";
import { toast } from "@/components/ui/toast/toast";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button/button";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner/spinner";
import { CominSoonModal } from "@/components/modal";

export default function ProfileActions() {
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      setLoading(true);
      await apiMutations.auth.Logout();
      await signOut({ redirect: false });
      gtag("event", "logout");
      router.push("/");
      setLoading(false);
    } catch {
      toast.error("Logout failed");
    }
  };
  return (
    <div className="flex  flex-col items-center gap-2 mt-auto pb-5">
      <Button onClick={handleLogout} size="lg" disabled={loading}>
        {loading ? <Spinner /> : <p>Log out</p>}
      </Button>
      <Button size="lg" variant="secondary" onClick={()=>setModalOpen(true)}>
        Delete Account
      </Button>
      {modalOpen && <CominSoonModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />}
    </div>
  );
}
