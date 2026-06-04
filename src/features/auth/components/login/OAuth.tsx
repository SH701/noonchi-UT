import SignupContent from "../signup/SignupContent";
import { AppleIcon, GoogleIcon } from "@/assets/svgr";
import { useTranslation } from "react-i18next";

type OAuthProvider = "google" | "apple" | null;

interface OAuthProps {
  GoogleLogin: () => void;
  AppleLogin: () => void;
  openModal: (content: React.ReactNode) => void;
  loadingProvider: OAuthProvider;
}

export default function OAuth({
  GoogleLogin,
  AppleLogin,
  openModal,
  loadingProvider,
}: OAuthProps) {
  const { t } = useTranslation();
  const isLoading = loadingProvider !== null;

  return (
    <div>
      <div className="my-6 flex w-full items-center">
        <div className="h-px flex-1 bg-gray-300" />
        <span className="px-4 text-sm text-gray-400">
          {t("login.socialDivider")}
        </span>
        <div className="h-px flex-1 bg-gray-300" />
      </div>
      <div className="flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={GoogleLogin}
          disabled={isLoading}
          className="cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
          aria-label="Sign in with Google"
        >
          <GoogleIcon />
        </button>
        <button
          type="button"
          onClick={AppleLogin}
          disabled={isLoading}
          className="cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
          aria-label="Sign in with Apple"
        >
          <AppleIcon />
        </button>
      </div>
      <div className="pt-6 text-center text-sm text-gray-500">
        {t("login.signupPrompt")}{" "}
        <button
          className="cursor-pointer font-medium text-blue-500 hover:underline"
          onClick={() => openModal(<SignupContent />)}
        >
          {t("login.signupLink")}
        </button>
      </div>
    </div>
  );
}
