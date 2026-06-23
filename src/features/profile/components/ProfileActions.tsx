"use client";

import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/toast/toast";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button/button";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner/spinner";
import DeleteAccountModal from "@/components/modal/DeleteAccountModal";

import { useTranslation } from "react-i18next";
import { useDeleteAccount } from "../hooks/useProfile";
import { authMutations } from "@/features/auth/api/mutations";

interface ProfileActionsProps {
  isLoggedIn: boolean;
}

export default function ProfileActions({ isLoggedIn }: ProfileActionsProps) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();
  const { mutate: deleteAccount, isPending: isDeleting } = useDeleteAccount();

  const handleLogout = async () => {
    try {
      setLoading(true);
      await authMutations.Logout();
      await signOut({ redirect: false });
      gtag("event", "logout");
      router.push("/");
    } catch {
      setLoading(false);
      toast.error(t("toastMessage.logoutFailed"));
    }
  };

  const handleDeleteAccount = () => {
    deleteAccount(undefined, {
      onSuccess: async () => {
        await signOut({ redirect: false });
        gtag("event", "delete_account");
        setModalOpen(false);
        router.push("/");
      },
      onError: () => {
        toast.error(t("toastMessage.deleteAccountFailed"));
      },
    });
  };

  return (
    <footer className="mt-auto flex flex-col items-center gap-2 pb-5">
      {isLoggedIn ? (
        <>
          <Button onClick={handleLogout} size="lg" disabled={loading}>
            {loading ? <Spinner /> : <span>{t("profile.logoutButton")}</span>}
          </Button>
          <Button
            size="lg"
            variant="secondary"
            onClick={() => setModalOpen(true)}
          >
            {t("profile.deleteAccountButton")}
          </Button>
        </>
      ) : (
        <Button onClick={() => router.push("/")} size="lg">
          {t("profile.goToLoginButton")}
        </Button>
      )}

      {modalOpen && (
        <DeleteAccountModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onConfirm={handleDeleteAccount}
          loading={isDeleting}
        />
      )}
    </footer>
  );
}
