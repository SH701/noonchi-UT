import { Button } from "@/components/ui/button/button";

import { Spinner } from "@/components/ui/spinner/spinner";

interface Props {
  loading: boolean;
  handleLogin: () => void;
  isValid: boolean;
}

export default function LoginAction({ loading, handleLogin, isValid }: Props) {
  
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
    </>
  );
}
