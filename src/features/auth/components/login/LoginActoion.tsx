import { Button } from "@/components/ui/button/button";
import { Spinner } from "@/components/ui/spinner/spinner";
import { useTranslation } from "react-i18next";

interface Props {
  loading: boolean;
  handleLogin: () => void;
  isValid: boolean;
}

export default function LoginAction({ loading, handleLogin, isValid }: Props) {
  const { t } = useTranslation();
  return (
    <>
      <div className="flex items-center justify-center">
        <Button
          variant="primary"
          onClick={handleLogin}
          disabled={!isValid || loading}
          size="lg"
        >
          {loading ? <Spinner /> : <p>{t("login.loginButton")}</p>}
        </Button>
      </div>
    </>
  );
}
