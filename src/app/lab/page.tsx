import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lab",
  description: "Experimental Korean learning features by Noonchi.",
};

export default function LabPage() {
  return (
    <iframe
      src="https://warrior-diplomat.vercel.app/"
      className="h-screen w-full border-0"
    />
  );
}
