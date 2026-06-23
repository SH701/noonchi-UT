import { useEffect, useRef } from "react";
import { useVoiceChat } from "./useVoiceChat";
import { useWebVoice } from "./useWebVoice";
import { isIOS } from "@/lib/isIOS";

export function useChatVoice(onSttResult: (text: string) => void) {
  const useNative = isIOS();

  const native = useVoiceChat(undefined, undefined, onSttResult);
  const web = useWebVoice();

  const lastWebSttRef = useRef("");
  useEffect(() => {
    if (useNative) return;
    if (
      (web.micState === "recording" || web.micState === "recorded") &&
      web.sttText !== lastWebSttRef.current
    ) {
      lastWebSttRef.current = web.sttText;
      onSttResult(web.sttText);
    }
  }, [useNative, web.sttText, web.micState, onSttResult]);

  if (useNative) {
    return {
      micState: native.micState,
      handleMicClick: native.handleMicClick,
      handleSendAudio: native.handleResetAudio,
    };
  }

  return {
    micState: web.micState,
    handleMicClick: web.handleMicClick,
    handleSendAudio: web.handleSendAudio,
  };
}
