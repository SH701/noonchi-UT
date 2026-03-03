import { useState } from "react";

export function useChatUI() {
  const [showHintPanel, setShowHintPanel] = useState(false);
  const [showSituation, setShowSituation] = useState(false);
  const [showNotice, setShowNotice] = useState(true);

  const toggleHint = () => setShowHintPanel((prev) => !prev);
  const toggleSituation = () => setShowSituation((prev) => !prev);
  const toggleNotice = () => setShowNotice((prev) => !prev);

  return {
    showHintPanel,
    showSituation,
    showNotice,
    toggleHint,
    toggleSituation,
    toggleNotice,
  };
}
