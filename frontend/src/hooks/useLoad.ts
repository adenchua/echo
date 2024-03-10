import { useState, useCallback } from "react";

type LoadingState = "DEFAULT" | "LOADING" | "ERROR" | "SUCCESS";

const useLoad = (initialState?: LoadingState) => {
  const [currentLoadState, setCurrentLoadState] = useState<LoadingState>(initialState ?? "DEFAULT");

  const handleSetLoadingState = useCallback((newState: LoadingState): void => {
    setCurrentLoadState(newState);
  }, []);

  return { currentLoadState, handleSetLoadingState };
};

export default useLoad;
