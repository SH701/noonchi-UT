import { create } from "zustand";

interface ChatState{
    showHintPanel:boolean
    showSituation:boolean
    showNotice:boolean
    toggleHint:()=>void
    toggleSituation:()=>void
    toggleNotice:()=>void
}

export const useChatStore = create<ChatState>((set)=>({
    showHintPanel:false,
    showSituation:false,
    showNotice:true,
    toggleHint: () => set((state) => ({ showHintPanel: !state.showHintPanel })),
    toggleSituation:()=>set((state)=>({showSituation:!state.showSituation})),
    toggleNotice:()=>set((state)=>({showNotice:!state.showNotice}))
}))