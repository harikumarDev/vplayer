import { useEffect, useState } from "react";

const initBeforeUnLoad = (showExitPrompt) => {
  window.onbeforeunload = (event) => {
    if (showExitPrompt) {
      const e = event || window.event;
      e.preventDefault();

      if (e) {
        e.returnValue = "";
      }
      return "";
    }
  };
};

function useExistPrompt(bool) {
  const [showExitPromt, setShowExitPrompt] = useState(bool);

  window.onload = function () {
    initBeforeUnLoad(showExitPromt);
  };

  useEffect(() => {
    initBeforeUnLoad(showExitPromt);
  }, [showExitPromt]);

  return [showExitPromt, setShowExitPrompt];
}

export default useExistPrompt;
