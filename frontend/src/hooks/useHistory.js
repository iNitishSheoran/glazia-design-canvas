import { useState } from 'react';

export const useHistory = (initialState = []) => {
  const [history, setHistory] = useState([initialState]);
  const [historyStep, setHistoryStep] = useState(0);
  const [elements, setElements] = useState(initialState);

  const updateElementsAndHistory = (newElements) => {
    const newHistory = history.slice(0, historyStep + 1);
    newHistory.push(newElements);
    setHistory(newHistory);
    setHistoryStep(newHistory.length - 1);
    setElements(newElements);
  };

  const handleUndo = () => {
    if (historyStep === 0) return;
    const prevStep = historyStep - 1;
    setElements(history[prevStep]);
    setHistoryStep(prevStep);
  };

  const handleRedo = () => {
    if (historyStep === history.length - 1) return;
    const nextStep = historyStep + 1;
    setElements(history[nextStep]);
    setHistoryStep(nextStep);
  };

  return {
    elements,
    setElements,
    history,
    setHistory,
    historyStep,
    setHistoryStep,
    updateElementsAndHistory,
    handleUndo,
    handleRedo
  };
};