import type { Metadata } from "next";
import { AboutUs } from "@/features/profile";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Noonchi — our mission to help Korean learners speak naturally and understand cultural context.",
};

export default function AboutPage(){
    return (
       <main className="flex flex-1 flex-col">
            <AboutUs/>
        </main>
    )
}