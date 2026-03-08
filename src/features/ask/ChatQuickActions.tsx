'use client'

import { Button } from "@/components/ui/button/button";
import { useRouter } from "next/navigation";

export default function ChatQuickActions(){
    const router = useRouter();
    const handleRoleplay = ()=>{
        router.push('/main')
    }
    return (
       <div className="mb-4 flex gap-2 overflow-x-auto">
          <Button variant="ghost" className="w-30 shrink-0 p-3 text-[#1F2937]" onClick={handleRoleplay}>
            Start Role-play
          </Button>
          <Button variant="ghost" className="w-30 shrink-0 p-3 text-[#1F2937]">
            Make it softer
          </Button>
          <Button variant="ghost" className="w-30 shrink-0 p-3 text-[#1F2937]">
            More formal
          </Button>
          <Button variant="ghost" className="w-30 shrink-0 p-3 text-[#1F2937]">
            Add an apology
          </Button>
        </div>
    )
}