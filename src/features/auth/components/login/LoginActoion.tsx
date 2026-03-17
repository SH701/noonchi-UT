import { Button } from "@/components/ui/button/button";
import { useModalActions } from "@/store/useModalStore";
import SignupContent from "../signup/SignupContent";
import { Spinner } from "@/components/ui/spinner/spinner";

interface Props {
  loading: boolean;
  handleLogin: () => void;
  isValid: boolean;
}

export default function LoginAction({ loading, handleLogin, isValid }: Props) {
  const { openModal } = useModalActions();
  return (
    <>
      <div className="flex items-center justify-center">
        <Button
          variant="primary"
          onClick={handleLogin}
          disabled={!isValid || loading}
          size="lg"
        >
          {loading ? <Spinner /> : <p>Log in</p>}
        </Button>
      </div>

      <div className="text-center text-sm text-gray-500">
        First time here?{" "}
        <button
          className="cursor-pointer font-medium text-blue-500 hover:underline"
          onClick={() => openModal(<SignupContent />)}
        >
          Create an account
        </button>
      </div>
    </>
  );
}
