import { useState, useCallback } from "react";

type LoadingState = "DEFAULT" | "LOADING" | "ERROR" | "SUCCESS";

interface HookResponse {
  currentLoadState: LoadingState;
  handleSetLoadingState: (newState: LoadingState) => void;
}

const useLoad = (initialState?: LoadingState): HookResponse => {
  const [currentLoadState, setCurrentLoadState] = useState<LoadingState>(initialState ?? "DEFAULT");

  const handleSetLoadingState = useCallback((newState: LoadingState): void => {
    setCurrentLoadState(newState);
  }, []);

  return { currentLoadState, handleSetLoadingState };
};

export default useLoad;
