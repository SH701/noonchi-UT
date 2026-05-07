import { Button } from "@/components/ui/button/button";

export default function PostWebzine(){
    return(
        <div className="p-4 bg-blue-50 rounded-2xl my-4 flex flex-col gap-2">
            <span className="text-sm text-indigo-400 font-semibold">DAILY PROMPT</span>
            <span className="font-bold">What`s the smallest Korean Habit you`ve quietly picked up?</span>
            <Button size='sm' className="px-4 py-2 bg-gradient-secondary rounded-full text-white w-30">Share Yours </Button>
        </div>
    )
}