
import SignupContent from "../signup/SignupContent";
import { Google } from "@/assets/svgr";

interface OAuthProps {
  GoogleLogin: () => void;
  openModal: (content: React.ReactNode) => void;
}


export default function OAuth({GoogleLogin,openModal}:OAuthProps) {
  
  
  return (
    <div>
      <div className="my-6 flex w-full items-center">
        <div className="h-px flex-1 bg-gray-300" />
        <span className="px-4 text-sm text-gray-400">Sign in with</span>
        <div className="h-px flex-1 bg-gray-300" />
      </div>
      <div className="flex items-center justify-center">
        <button
          type="button"
          onClick={GoogleLogin}
          className="cursor-pointer"
          aria-label="Sign in with Google"
        >
          <Google />
        </button>
      </div>
      <div className="pt-6 text-center text-sm text-gray-500">
        First time here?{" "}
        <button
          className="cursor-pointer font-medium text-blue-500 hover:underline"
          onClick={() => openModal(<SignupContent />)}
        >
          Create an account
        </button>
      </div>
    </div>
  );
}
