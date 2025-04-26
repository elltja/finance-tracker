import { useEffect, useState, Dispatch, SetStateAction } from "react";

export default function usePersistentState<T>(
  initialState: T,
  storageKey: string
): [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState<T>(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored !== null) {
      return JSON.parse(stored) as T;
    }

    return initialState;
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(state));
  }, [state, storageKey]);

  return [state, setState];
}
