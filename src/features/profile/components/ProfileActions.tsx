"use client";

import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/toast/toast";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button/button";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner/spinner";
import { CominSoonModal } from "@/components/modal";
import { authMutations } from "@/features/auth/api/mutations";

export default function ProfileActions() {
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      setLoading(true);
      await authMutations.Logout();
      await signOut({ redirect: false });
      gtag("event", "logout");
      router.push("/");
      setLoading(false);
    } catch {
      toast.error("Logout failed");
    }
  };
  return (
    <footer className="mt-auto flex flex-col items-center gap-2 pb-5">
      <Button onClick={handleLogout} size="lg" disabled={loading}>
        {loading ? <Spinner /> : <span>Log out</span>}
      </Button>
      <Button size="lg" variant="secondary" onClick={() => setModalOpen(true)}>
        Delete Account
      </Button>
      {modalOpen && (
        <CominSoonModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
        />
      )}
    </footer>
  );
}
