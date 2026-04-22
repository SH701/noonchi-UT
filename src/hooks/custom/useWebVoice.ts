import { useRef, useState } from "react";
import { useWebSpeech } from "./useWebSpeech";
import { toast } from "@/components/ui/toast/toast";

export type MicState = "idle" | "recording" | "recorded";

export function useWebVoice() {
  const { startRecording, stopRecording } = useWebSpeech();
  const [micState, setMicState] = useState<MicState>("idle");
  const [sttText, setSttText] = useState("");
  const finalTextRef = useRef("");

  const handleMicClick = () => {
    if (micState === "idle") {
      finalTextRef.current = "";
      setSttText("");
      setMicState("recording");
      startRecording(
        (interim) => setSttText(finalTextRef.current + interim),
        (final) => {
          finalTextRef.current += final;
          setSttText(finalTextRef.current);
        },
        () => {
          setMicState("idle");
          toast.error("Couldn't recognize your voice. Please try again");
        },
      );
    } else if (micState === "recording") {
      stopRecording();
      if (!finalTextRef.current) {
        setMicState("idle");
        toast.error("Couldn't recognize your voice. Please try again");
        return;
      }
      setMicState("recorded");
    }
  };

  const handleSendAudio = () => {
    setSttText("");
    setMicState("idle");
    finalTextRef.current = "";
  };

  return { micState, sttText, handleMicClick, handleSendAudio };
}
