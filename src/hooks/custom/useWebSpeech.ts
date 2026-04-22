import { useRef, useState } from "react";

interface ISpeechRecognition extends EventTarget {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onresult: ((e: any) => void) | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onerror: ((e: any) => void) | null;
  onend: (() => void) | null;
  start(): void;
  stop(): void;
}

declare global {
  interface Window {
    SpeechRecognition: new () => ISpeechRecognition;
    webkitSpeechRecognition: new () => ISpeechRecognition;
  }
}

export function useWebSpeech() {
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef<ISpeechRecognition | null>(null);

  const startRecording = (
    onInterim: (text: string) => void,
    onFinal: (text: string) => void,
    onError: (error: string) => void,
  ) => {
    const SpeechRecognitionAPI =
      typeof window !== "undefined"
        ? window.SpeechRecognition ?? window.webkitSpeechRecognition
        : null;

    if (!SpeechRecognitionAPI) {
      onError("Speech Recognition Not Available");
      return;
    }

    const recognition = new SpeechRecognitionAPI();
    recognition.lang = "ko-KR";
    recognition.interimResults = true;
    recognition.continuous = true;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onresult = (e: any) => {
      let interim = "";
      let final = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const result = e.results[i];
        if (result.isFinal) {
          final += result[0].transcript;
        } else {
          interim += result[0].transcript;
        }
      }
      if (interim) onInterim(interim);
      if (final) onFinal(final);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onerror = (e: any) => {
      onError(e.error);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    recognitionRef.current?.stop();
    setIsRecording(false);
  };

  return { isRecording, startRecording, stopRecording };
}
